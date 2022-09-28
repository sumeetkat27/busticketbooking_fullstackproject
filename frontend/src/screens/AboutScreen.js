import React from "react";
import HomeNavigation from "./../components/HomeNavigation";
import Contact from '../assets/contact.jpg'
import Prasad from '../assets/Prasad Gawade.jpg'

import "./AboutUs.css";

const AboutScreen = (props) => {
  return (
    <div>
      <HomeNavigation />

      <div class="container1 aboutus">
        <div class="row">
          <div class="col-md-12">
            <div
              id="carouselExampleIndicators"
              class="carousel slide"
              data-ride="carousel"
            >
              <ol class="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  class="active"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                ></li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="single-box">
                        <div className="img-area">
                          <img src={Prasad} alt="Prasad Gawade" />
                        </div>
                        <div className="img-text">
                          <h2>Prasad Gawade</h2>
                          <p>
                            Hi I'm Prasad Gawade and Team lead of this
                            project. I'm currently pursuing Diploma in CDAC
                            Pune, and I have worked as full stack developer in this project.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="single-box">
                        <div className="img-area">
                          <img src={Contact} alt="Aditya" />
                        </div>
                        <div className="img-text">
                          <h2>Sumeet Katkade</h2>
                          <p>
                            Hi I'm Sumeet Katkade. I'm currently pursuing
                            Diploma in CDAC Mumbai, and my role in the project
                            is databse developer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutScreen