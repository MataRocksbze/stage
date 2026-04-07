const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

if (!process.env.HYGRAPH_ENDPOINT) {
  require("dotenv").config({ path: ".env" })
}

/**
 * @type {import('gatsby').GatsbyConfig}
 */
const plugins = [
  `gatsby-plugin-image`,
  {
    resolve: `gatsby-plugin-sass`,
    options: {
      implementation: require("sass"),
      sassOptions: {
        api: "modern",
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
  `gatsby-plugin-sitemap`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  {
    resolve: "gatsby-v5-source-hygraph",
    options: {
      endpoint: process.env.HYGRAPH_ENDPOINT,
      token: process.env.HYGRAPH_TOKEN,
      typePrefix: "GraphCms",
      queryConcurrency: 1, // serial requests
      fragmentsPath: "graphcms-fragments",
      downloadLocalImages: false,
      buildMarkdownNodes: false,
      models: [
        // 👈 add this
        "AllDaySailingCayeCaulker",
        "BacalarChicoReserve",
        "CaveTubing",
        "CoralGardensManatee",
        "Fishingtrip",
        "HolChanSharkRay",
        "HomePickleball",
        "HomeRestaurant",
        "HomeSlideShow",
        "HomeVideo",
        "HomeWelcome",
        "LamanaiMayanRuin",
        "MexicoRocksSail",
        "PageContactUs",
        "PageDineIn",
        "Rooms",
        "Blog",
        "SailingTour",
        "Tour",
      ],
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Mata Rocks Resort`,
      short_name: `MataRocks`,
      start_url: `/`,
      background_color: `#663399`,
      display: `minimal-ui`,
      icon: `src/images/android-chrome-512x512.png`,
    },
  },
]

// Conditionally add Google GTag if the ID is provided
if (process.env.GTAG_TRACKING_ID) {
  plugins.push({
    resolve: `gatsby-plugin-google-gtag`,
    options: {
      trackingIds: [process.env.GTAG_TRACKING_ID],
      pluginConfig: {
        head: true,
      },
    },
  })
} else {
  console.warn(
    "GTAG_TRACKING_ID not found in environment variables. Google Analytics will be disabled."
  )
}

// Ensure Hygraph endpoint is provided
if (!process.env.HYGRAPH_ENDPOINT) {
  console.error(
    "HYGRAPH_ENDPOINT is missing! Build will likely fail or return empty data."
  )
}

module.exports = {
  siteMetadata: {
    title: `Mata Rocks Resort`,
    description: `Mata Rocks is a boutique beachfront resort located on Ambergris Caye in San Pedro, Belize.`,
    author: `Jose Urbina`,
    siteUrl: `https://matarock.com`,
  },
  plugins: plugins,
}
