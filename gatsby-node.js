/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 *
 * NOTE: Hygraph rate-limit throttling (300 ms between requests + 429 retry)
 * is patched directly into gatsby-v5-source-hygraph/gatsby-node.js via the
 * `postinstall` script (scripts/patch-hygraph.js). That patch runs after every
 * `npm install` — including on Netlify — so it is active in all worker processes.
 */

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
