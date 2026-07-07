/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 */

const React = require("react")

exports.onRenderBody = ({
  setHtmlAttributes,
  setHeadComponents,
  setPreBodyComponents,
}) => {
  setHtmlAttributes({ lang: `en` })

  setHeadComponents([
    React.createElement("script", {
      key: "google-tag-manager",
      dangerouslySetInnerHTML: {
        __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MNV8ZGVH');
        `,
      },
    }),
  ])

  setPreBodyComponents([
    React.createElement("noscript", {
      key: "google-tag-manager-noscript",
      dangerouslySetInnerHTML: {
        __html: `
<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MNV8ZGVH"
height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `,
      },
    }),
  ])
}
