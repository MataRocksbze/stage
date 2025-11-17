import React, { useState } from 'react';
import { StaticImage } from "gatsby-plugin-image"
import tours1 from "../../../images/snorkel.jpg";
import tours2 from "../../../images/fishing.png";
import tours3 from "../../../images/diving.jpg";
import tours4 from "../../../images/tubing-new.jpg";
import "../../../less/animations.scss";
import { Container } from 'react-bootstrap';
import { graphql, Link, StaticQuery } from "gatsby"

const Tours = () => {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    setIsZooming(true);

    setTimeout(() => {
      setIsZooming(false);
    }, 13000);
  };

  const images = [tours1, tours2, tours3, tours4];

  return (
    <StaticQuery 
    query={graphql`
    query Video{
        allGraphCmsHomeVideo {    
            edges {
              node {
                youTubeVideoId
                title2White
                title2Gold
                title1
                  content{
                      html
                      markdown
                      raw
                      text
                    }
              }
            }
          }
      }
    `}


render={data => ( 
    <div className="tours-main">
      {data.allGraphCmsHomeVideo.edges.map(({ node: welcome }) => (
        <>
     <iframe
        className="youtube-iframe"
        src={"https://www.youtube.com/embed/" + welcome.youTubeVideoId + "?autoplay=1&mute=1&loop=1&playlist=" + welcome.youTubeVideoId + "&controls=0"} 
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <span>
       <StaticImage src="../../../images/mata-rocks-bg.jpg" />
       </span>
      <div className="overlay"></div>
      <div className="absolute-content">
        <h2>{welcome.title1}</h2>
        <h1>
        {welcome.title2White} <br />
          <span>{welcome.title2Gold}</span>
        </h1>
        
    
                 
                  {data.allGraphCmsHomeVideo.edges.map(({ node: welcome }) => (
                  <div dangerouslySetInnerHTML={{ __html: welcome.content.html }} /> 
                  ))}
        <a className="all-button" href="">View Tours</a>

       
      </div>
      </>
    ))}
      <div className='tours-header'>
           <span>
            <h1>Our Top Adventure Picks for you!</h1>
            <h2>Discover Belize 
            <i class="fa fa-long-arrow-right"></i>
            </h2>
            </span>
      </div>
      <div className="homeMain">
    
          <div className="row two">
            {images.map((imgSrc, index) => (
              <a
                
                className="column"
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <div className="absolute-content">
                  <h2>View Tour</h2>
                 
                  <h1>
                      {index === 0
                      ? "Snorkeling"
                      : index === 1
                      ? "Fishing"
                      : index === 2
                      ? "Diving Blue Hole"
                      : "View All Tours"}
                  </h1>
                  <a href="/tours" className='book-button' >
                      Book Today
                  </a>
                </div>
              </a>
            ))}
          </div>

          {/* Expanded Image Section */}
          <div className="expanded-container">
            {images.map((imgSrc, index) => (
              <div
                key={index}
                className={`background-image ${
                  index === hoveredIndex ? "active zoom-animation" : ""
                }`}
                style={{
                  backgroundImage: `url(${imgSrc})`,
                }}
              ></div>
            ))}
          </div>
        </div>
    </div>
    )}
    />
  );
}
export default Tours;