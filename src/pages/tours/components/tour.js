import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Container } from "react-bootstrap"
import { StaticImage } from "gatsby-plugin-image";

function Tours() {
  const data = useStaticQuery(graphql`
    query ToursListings {
      allGraphCmsTour(sort: {tourOrder: ASC}) {
        edges {
          node {
            id
            tourOrder
            touritle
            price
            tourPageLink
            slug
            description {
              html
              text
              raw
            }
            features {
              html
              text
              raw
            }
            services {
              html
              text
              raw
            }
            tourImage {
              id
              imageAltText
              imageTitle
              image {
                url
              }
            }
          }
        }
      }
    }
  `);
// Or log just the tourPageLinks
data.allGraphCmsTour.edges.forEach((edge, index) => {
  console.log(`Tour ${index + 1} page link:`, edge.node.tourPageLink);
});

  return (
    <div className="all-rooms">
      <div className="content-header">
        <div className="header-overlay"></div>
        <StaticImage
          src="../../../images/roomsHeader.png"
          quality={60}
          formats={["auto", "webp", "avif"]}
        />
        <div className="header-cont">
          <h1>All Tours</h1>
        </div>
      </div>
      <div className="rooms-main">
        <div className="rooms-grid">
          <div className="data-wrapper">
            <div className="gallery">
              <div className="image-gallery">
                <div className="photos">
                  {data.allGraphCmsTour.edges.map(({ node: tour }) => (
                    <div key={tour.id}>
                      <div className="main-content">
                        <div className="data-wrapper">
                          <div className="estate-type">
                            <div className="image-field">
                              <img 
                                src={tour.tourImage.image.url}
                                quality={60}
                                formats={["auto", "webp", "avif", "png", "jpg"]}
                                alt={tour.tourImage.imageAltText}
                              />

                              <div className="overlay">
                                <div className="content">
                                  <Container>
                                    <div className="block">
                                      <div className="desc">
                                        <div className="desc-main">
                                          <h2>{tour.touritle}</h2>
                                          <div className="price">${tour.price}</div>
                                        </div>
                                        <div className="secondary-cont">
                                          <div className="blurb" dangerouslySetInnerHTML={{ __html: tour.description.html }} />
                                          <div className="details">
                                            {/* Features Section */}
                                            {tour.features?.html && (
                                              <div className="features">
                                                <h4>Features:</h4>
                                                <div dangerouslySetInnerHTML={{ __html: tour.features.html }} />
                                              </div>
                                            )}
                                            {/* Services Section */}
                                            {tour.services?.html && (
                                              <div className="services">
                                                <h4>Services Included:</h4>
                                                <div dangerouslySetInnerHTML={{ __html: tour.services.html }} />
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <div className="book-now-block">
                                          {tour.tourPageLink ? (
                                            <a 
                                              href={tour.tourPageLink} 
                                              target="_blank" 
                                              rel="noopener noreferrer" 
                                              className="book-button"
                                            >
                                              Book Now
                                            </a>
                                          ) : (
                                            <a 
                                              href={`/tours/${tour.slug}`} 
                                              className="book-button"
                                            >
                                              Learn More
                                            </a>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </Container>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a className="all-button" href="/tours">View All Tours</a>
    </div>
  );
}

export default Tours;