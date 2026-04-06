/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */


const nodeFetchModule = require("node-fetch")
const originalFetch = nodeFetchModule.default || nodeFetchModule

const HYGRAPH_HOSTS = ["hygraph.com", "graphassets.com", "graphcms.com"]
const MIN_INTERVAL_MS = 250 // 250 ms between requests = max 4 req/sec
let lastRequestTime = 0

const throttledFetch = async (url, options) => {
  const isHygraph =
    typeof url === "string" && HYGRAPH_HOSTS.some(h => url.includes(h))

  if (isHygraph) {
    const now = Date.now()
    const wait = MIN_INTERVAL_MS - (now - lastRequestTime)
    if (wait > 0) {
      console.log(
        `[Hygraph-Throttler] Waiting ${wait}ms before next request to stay under rate limit...`
      )
      await new Promise(r => setTimeout(r, wait))
    }
    lastRequestTime = Date.now()
  }

  return originalFetch(url, options)
}

const cacheKey = require.resolve("node-fetch")
require.cache[cacheKey].exports = throttledFetch
require.cache[cacheKey].exports.default = throttledFetch

// ---------------------------------------------------------------------------
// GATSBY NODE APIs
// ---------------------------------------------------------------------------

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}
