/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const toolkit = require("gatsby-graphql-source-toolkit")
const PQueue = require("p-queue").default || require("p-queue")

const globalHygraphQueue = new PQueue({
  concurrency: 1,
  interval: 1000,
  intervalCap: 4,
})

toolkit.wrapQueryExecutorWithQueue = (executor, options) => {
  console.log(
    `[Hygraph-Global-Throttler] Intercepting request queue for a model. Redirecting to singleton queue.`
  )
  return async (args) => {
    return globalHygraphQueue.add(() => executor(args))
  }
}

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
