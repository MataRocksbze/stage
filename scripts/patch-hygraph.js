/**
 * patch-hygraph.js
 *
 * Patches gatsby-v5-source-hygraph/gatsby-node.js to add:
 *  1. A per-process 300 ms minimum interval between Hygraph HTTP requests
 *  2. Automatic retry with exponential back-off on 429 Too Many Requests
 *
 * Run automatically by "postinstall" in package.json so it survives every
 * `npm install` on both local and Netlify.
 */

const fs = require("fs")
const path = require("path")

const PLUGIN_FILE = path.join(
  __dirname,
  "..",
  "node_modules",
  "gatsby-v5-source-hygraph",
  "gatsby-node.js"
)


// Original: single fetch with no retry
const ORIGINAL = `  const execute = async ({
    operationName,
    query,
    variables = {}
  }) => {
    const {
      reporter
    } = gatsbyApi;
    return await (0, _nodeFetch.default)(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        query,
        variables,
        operationName
      }),
      headers: {
        'Content-Type': 'application/json',
        ...(token && {
          Authorization: \`Bearer \${token}\`
        })
      }
    }).then(response => {
      if (!response.ok) {
        return (0, _reportPanic.reportPanic)(1, 'Problem building Hygraph nodes', response.statusText, reporter);
      }
      return response.json();
    }).then(response => {
      if (response.errors) {
        return (0, _reportPanic.reportPanic)(2, 'Problem building Hygraph nodes', JSON.stringify(response.errors, null, 2), reporter);
      }
      return response;
    }).catch(error => {
      return (0, _reportPanic.reportPanic)(3, 'Problem building Hygraph nodes', JSON.stringify(error, null, 2), reporter);
    });
  };`

// Patched: throttle + retry on 429
const PATCHED = `  // --- Hygraph rate-limit patch (postinstall) ---
  // Hard-coded per-process throttle: min 300 ms between requests = max ~3.3 req/s
  // Even if Gatsby spawns multiple worker processes, each one stays well below
  // the free-tier limit of 5 req/s.
  let _lastHygraphRequest = 0;
  const _hygraphSlot = () => {
    const now = Date.now();
    const wait = 300 - (now - _lastHygraphRequest);
    _lastHygraphRequest = Math.max(now, _lastHygraphRequest + 300);
    return wait > 0 ? new Promise(r => setTimeout(r, wait)) : Promise.resolve();
  };

  const execute = async ({
    operationName,
    query,
    variables = {}
  }, _attempt = 1) => {
    const {
      reporter
    } = gatsbyApi;
    await _hygraphSlot();
    return await (0, _nodeFetch.default)(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        query,
        variables,
        operationName
      }),
      headers: {
        'Content-Type': 'application/json',
        ...(token && {
          Authorization: \`Bearer \${token}\`
        })
      }
    }).then(async response => {
      if (response.status === 429) {
        if (_attempt > 6) {
          reporter.warn('[Hygraph-Throttler] Max retries reached, giving up.');
          return (0, _reportPanic.reportPanic)(1, 'Problem building Hygraph nodes', 'Too Many Requests (max retries exceeded)', reporter);
        }
        const backoff = Math.min(1500 * _attempt, 15000);
        reporter.info(\`[Hygraph-Throttler] 429 Too Many Requests. Retry \${_attempt}/6 in \${backoff}ms...\`);
        await new Promise(r => setTimeout(r, backoff));
        return execute({operationName, query, variables}, _attempt + 1);
      }
      if (!response.ok) {
        return (0, _reportPanic.reportPanic)(1, 'Problem building Hygraph nodes', response.statusText, reporter);
      }
      return response.json();
    }).then(response => {
      if (!response) return response;
      if (response.errors) {
        return (0, _reportPanic.reportPanic)(2, 'Problem building Hygraph nodes', JSON.stringify(response.errors, null, 2), reporter);
      }
      return response;
    }).catch(error => {
      return (0, _reportPanic.reportPanic)(3, 'Problem building Hygraph nodes', JSON.stringify(error, null, 2), reporter);
    });
  };`

// ─── Main ─────────────────────────────────────────────────────────────────────

if (!fs.existsSync(PLUGIN_FILE)) {
  console.warn(
    "[patch-hygraph] Plugin file not found – skipping patch.\n",
    PLUGIN_FILE
  )
  process.exit(0)
}

let content = fs.readFileSync(PLUGIN_FILE, "utf8")

if (content.includes("_hygraphSlot")) {
  console.log("[patch-hygraph] Patch already applied – skipping.")
  process.exit(0)
}

if (!content.includes(ORIGINAL.trim().slice(0, 60))) {
  console.warn(
    "[patch-hygraph] Could not find expected code block – plugin may have changed. Skipping patch."
  )
  process.exit(0)
}

content = content.replace(ORIGINAL, PATCHED)
fs.writeFileSync(PLUGIN_FILE, content, "utf8")
console.log(
  "[patch-hygraph] ✅ Successfully patched gatsby-v5-source-hygraph with retry + throttle logic."
)
