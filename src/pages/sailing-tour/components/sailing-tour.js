import React from 'react'
import { graphql, StaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

function SailingTour({ data }) {
  return (
    <StaticQuery 
      query={graphql`
        query SailingTourPage {
          allGraphCmsSailingTour {    
            edges {
              node {
                remoteId: id
                pageTitle
                headerImage {
                  id
                  imageAltText
                  imageTitle
                  image {
                    gatsbyImageData(quality: 60)
                    url
                  }
                }
                pageCont {
                  html
                  markdown
                  raw
                  text
                }
                publishedAt
                updatedAt
              }
            }
          }
        }
      `}
      render={data => (  
        <div className='sailing-tour-main'>
          {data.allGraphCmsSailingTour.edges.map(({ node: sailingTour }) => (
            <div key={sailingTour.remoteId}>
              {/* Header Section with Image */}
              <div className="content-header">
                <div className="header-overlay"></div>
                {sailingTour.headerImage?.image?.gatsbyImageData ? (
                  <img
                src={sailingTour.headerImage.image.url}
                alt={sailingTour.headerImage.imageAltText || sailingTour.pageTitle}
                title={sailingTour.headerImage.imageTitle}
                className="header-image"
                />
                ) : sailingTour.headerImage?.image?.url ? (
                  <img 
                    src={sailingTour.headerImage.image.url}
                    alt={sailingTour.headerImage.imageAltText || sailingTour.pageTitle}
                    title={sailingTour.headerImage.imageTitle}
                    className="header-image"
                  />
                ) : null}
                <div className="header-cont">
                  <h1>{sailingTour.pageTitle}</h1>
                </div>
              </div>
                <div className="conetent-wrapper">
                <div className="container">
                <div className="row">
                <div className="col-12">
              {/* Page Content */}
              <div className='sailing-tour-cont'>
                {sailingTour.pageCont?.html ? (
                  <div dangerouslySetInnerHTML={{ __html: sailingTour.pageCont.html }} />
                ) : sailingTour.pageCont?.text ? (
                  <div>{sailingTour.pageCont.text}</div>
                ) : null}
              </div>
              </div>
              </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      )}
    />
  );
}

export default SailingTour