import React, { useState, useRef, useEffect } from 'react';
import Logo from "../images/logo";
import "./../less/header.scss";

function App() {
    const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
    const [isOpen, setIsOpen] = useState(false);
    const headerRef = useRef(null);
  
    // handle scroll event
    const handleScroll = (elTopOffset, elHeight) => {
      if (window.pageYOffset > (elTopOffset + elHeight)) {
        setSticky({ isSticky: true, offset: elHeight });
      } else {
        setSticky({ isSticky: false, offset: 0 });
      }
    };
  
    // add/remove scroll event listener
    useEffect(() => {
      var header = headerRef.current.getBoundingClientRect();
      const handleScrollEvent = () => {
        handleScroll(header.top, header.height)
      }
  
      window.addEventListener('scroll', handleScrollEvent);
  
      return () => {
        window.removeEventListener('scroll', handleScrollEvent);
      };
    }, []);
  
    return (
      <div id="sticky-header" className={`header${sticky.isSticky ? ' sticky' : ''}`} ref={headerRef} >
      
        <nav  className="navbar navbar-expand-lg navbar-light">
            <a className="brand" title="" href="/">  
                        <Logo />
                    </a>
            <div className="contact-block">

            <a title="" href="tel:+5012262336">
            <i className="fa fa-phone" aria-hidden="true"></i>
            <span> TEL: +(501) 226 2336</span>
            </a>
            </div>


            <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)} aria-controls="navbarSupportedContent" aria-expanded={isOpen} aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a title="" className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                </li>
                
                <li className="nav-item">
                    <a title="" className="nav-link" href="/rooms">Our Rooms</a>
                </li>
                <li className="nav-item">
                    <a title="" className="nav-link" href="/coming-soon/">Services</a>
                </li>
                <li className="nav-item">
                    <a title="" className="nav-link" href="/restaurant-and-bar/">Dine In</a>
                </li>
                <li className="nav-item">
                    <a title="" className="nav-link" href="/coming-soon/">Activities</a>
                </li>
                <li className="nav-item">
                    <a title="" className="nav-link" href="/blog/">Blog</a>
                </li>
                <li className="nav-item">
                    <a title="" className="nav-link" href="/contact-us/">Contact Us</a>
                </li>
                </ul>
            
            </div>
            <div className="book-button">
                <a href="https://us2.cloudbeds.com/en/reservation/Ii3x4t?currency=usd" target="_blank">
                Book Now
                </a>
            </div>
        </nav>

        
      </div>
    );
  }
  
  export default App;