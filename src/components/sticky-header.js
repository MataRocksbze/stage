import React, { useState, useRef, useEffect } from 'react';
import { Link } from "gatsby";
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

      <nav className="navbar navbar-expand-lg navbar-light">
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
              <Link title="" className="nav-link" to="/" activeClassName="active">Home <span className="sr-only">(current)</span></Link>
            </li>

            <li className="nav-item">
              <Link title="" className="nav-link" to="/rooms" activeClassName="active">Our Rooms</Link>
            </li>
            <li className="nav-item">
              <Link title="" className="nav-link" to="/packages/" activeClassName="active">Services</Link>
            </li>
            <li className="nav-item">
              <Link title="" className="nav-link" to="/restaurant-and-bar/" activeClassName="active">Dine In</Link>
            </li>
            <li className="nav-item">
              <Link title="" className="nav-link" to="/tours/" activeClassName="active">Activities</Link>
            </li>
            <li className="nav-item">
              <Link title="" className="nav-link" to="/blog/" activeClassName="active">Blog</Link>
            </li>
            <li className="nav-item">
              <Link title="" className="nav-link" to="/contact-us/" activeClassName="active">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="book-button mr-3">
          <a href="https://us2.cloudbeds.com/en/reservation/Ii3x4t?currency=usd" target="_blank">
            Book Now
          </a>
        </div>
      </nav>


    </div>
  );
}

export default App;