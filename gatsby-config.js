/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Mata Rocks Resort`,
    description: `Mata Rocks is a boutique beachfront resort located on Ambergris Caye in San Pedro, Belize. The resort is situated south of the main town, approximately a 15 minute golf cart ride from the airport.`,
    author: `Jose Urbina`,
    siteUrl: `https://matarock.com`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {                             
      resolve: `gatsby-plugin-google-gtag`,
      options: {
          trackingIds: ['G-ED7SSS28RC'],
          pluginConfig: {
            head: true
          },
        },
      },
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        endpoint: "https://api-us-west-2.hygraph.com/v2/cmdm3g6k90ymm06n051yp7g8x/master",
        token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3NTM2NDU5MjksImF1ZCI6WyJodHRwczovL2FwaS11cy13ZXN0LTIuaHlncmFwaC5jb20vdjIvY21kbTNnNms5MHltbTA2bjA1MXlwN2c4eC9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC11cy13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiODQ4ZTA1ZmItNjExNS00MjhkLWFkZWMtN2JlZjc1MzIzOWM0IiwianRpIjoiY202bzIzd2F4MWRnMzA3bXk5NmFwYXhvZyJ9.wiXNP3IuFXx1R81UWEFSYlWsPZY7lzV3YyWNljVoxYlI5XSoMypMNs9fTtnaz-fZA-WWLBetxLX-zSBpEIDUb6THHFMFCHWSL2Z8wA9NIIAaAt1B2A2r8dTiQR0UeRG4hhFoMCtozCkzhA6Q07a9CTus7vKF3GLZRsd3wm39eSdOhfqvPiamO741Ym53d5BG1E8XGDrE26474t2_Chx6OoW-jrnxMkd0a2ajHTJcxlkC0NVJq2iWn8a6Vf1XTboQl-taEkiNvztRavwIN-gZANDP-5Gs_lo_Q4sFD2WUyDSZGwRp1UjsMxd-2wGv7FsWFcklDDAg3I4QA-kg10tXTLZkjDkGXeCdEKQa-lfYKcAbUHqma9Nh4S5GaOSojXz2DT2z6AXymqmTcfKw45GRZcPHp09oqHWGeoHKA2g5CqkvRD2srnskO_PCijxWDgtBVPKC5wL-UhIvDu1WzYnzGLk2mTjg6rLwE6KtYwtOrgypAQdb_BGYIXmy1gNaXZ8hh8Po8oUCy9glng0E65V3hAlL3w7kXeyi09w1ssMnXcMGW7FSOTnB8wtkn7qoXepHVUnIP59FGUE6vp5NBVVpBe3QxzrDauVvBp9KNLMLGYm7ft2oMIdykXd1S6hGNRhXtz2FGWPJ590INyFWRD8SVMQ_aHENmYUH9Pvgjuc2eX0",
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/android-chrome-512x512.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
