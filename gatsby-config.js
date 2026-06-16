const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

if (!process.env.HYGRAPH_ENDPOINT) {
  require("dotenv").config({ path: ".env" })
}

// -------------------------------
// Google Tag Manager / GA4 setup
// -------------------------------
const trackingIds = ["G-B66RMFVKFW"]   // always include this new tag

if (process.env.GTAG_TRACKING_ID) {
  trackingIds.push(process.env.GTAG_TRACKING_ID)
} else {
  console.warn(
    "GTAG_TRACKING_ID not found in environment variables. Only the new tag G-B66RMFVKFW will be used."
  )
}

// -------------------------------
// Plugins
// -------------------------------
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
      queryConcurrency: 1,
      fragmentsPath: "graphcms-fragments",
      downloadLocalImages: false,
      buildMarkdownNodes: false,
      models: [
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

// Google gtag plugin (always added, trackingIds already set)
plugins.push({
  resolve: `gatsby-plugin-google-gtag`,
  options: {
    trackingIds,
    pluginConfig: {
      head: true,
    },
  },
})

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