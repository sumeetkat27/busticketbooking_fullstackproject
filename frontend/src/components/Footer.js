import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

const Footer = (props) => {
  return (
    <div className="container-fluid pb-0 mb-0 justify-content-center text-light bg-light">
      <footer>
        <div className="row my-5 justify-content-center py-5">
          <div className="col-11">
            <div className="row ">
              <div className="col-xl-8 col-md-4 col-sm-4 col-12 my-auto mx-auto a">
                <h3 className="text-muted mb-md-0 mb-5 bold-text">ROYAL BUSES</h3>
              </div>
              <div className="col-xl-2 col-md-4 col-sm-4 col-12">
                <h6 className="mb-3 mb-lg-4 bold-text ">
                  <b>Info</b>
                </h6>
                <ul className="list-unstyled">
                  <li>FAQ</li>
                  <li>Blog</li>
                  <li>Offers</li>
                  <li>Privacy Policy</li>
                  <li>Terms And Condtions</li>
                </ul>
              </div>
              <div className="col-xl-2 col-md-4 col-sm-4 col-12">
                <h6 className="mb-3 mb-lg-4 text-muted bold-text mt-sm-0 mt-5">
                  <b>Top Cities</b>
                </h6>
                <li>Hyderabad</li>
                <li>Pune</li>
                <li>Aurangabad</li>
                <li>Kolhapur</li>
              </div>
            </div>
            <div className="row ">
              <div className="col-xl-8 col-md-4 col-sm-4 col-auto my-md-0 mt-5 order-sm-1 order-3 align-self-end">
                <p className="social text-muted mb-0 pb-0 bold-text mx-2">
                  {"   "}

                  <a href="https://www.youtube.com/c/jamesqquick"
                    className="youtube social m-2" style={{ color: "#eb3223" }}>
                    <FontAwesomeIcon icon={faYoutube} size="2x" />
                  </a>
                  <a href="https://www.facebook.com/learnbuildteach/"
                    className="facebook social m-2" style={{ color: "#4968ad" }}>
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                  </a>
                  <a href="https://www.twitter.com/jamesqquick" className="twitter social m-2" style={{ color: "#49a1eb" }}>
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                  </a>
                  <a href="https://www.instagram.com/learnbuildteach"
                    className="instagram social m-2" style={{ color: "black" }}>
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                  </a>
                </p>
                <small className="rights">
                  <span>&#174;</span> Royal Buses All Rights Reserved.
                </small>
              </div>

            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
