import React from "react";
import { Link } from "react-router-dom";
import HomeNavigation from "../components/HomeNavigation";
import image1 from "../assets/image-1.jpg";
import image2 from "../assets/image-2.jpg";
import image3 from "../assets/image-3.jpg";
import Home from "../assets/Home.jpeg";

const RoyalTravelsScreen = () => {
  return (
    <div>
      <HomeNavigation />
      <div className="" style={{backgroundColor: "#d9e4f5",
backgroundImage: "linear-gradient(315deg, #d9e4f5 0%, #f5e3e6 74%)"}}>
      <header className="header" style={{opacity:"1"}}>
        <section className="destinations">
          <h3>Travel With Us All Over India</h3>
          <div className="grid">
            <div style={{boxShadow:"2px 2px 5px gray"}}>
              <img src={image1} alt="destination-1" />
              <h3>BUSES</h3>
              <p>1000+</p>
              <p>Ac/Non-Ac</p>
              <p>Seater/Sleeper</p>
            </div>

            <div style={{boxShadow:"2px 2px 5px gray"}}>
              <img src={image2} alt="destination-2" />
              <h3>ROUTES</h3>
              <p>400+</p>
              <p>From Various City To City</p>
              <p>From Various States To States</p>
            </div>

            <div style={{boxShadow:"2px 2px 5px gray"}}>
              <img src={image3} alt="destination-3" />
              <h3>USERS</h3>
              <p>50000+</p>
              <p>Happy Passengers</p>
              <p>Number Is Still Increasing</p>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="text text-dark">
            <b>
              <h2>Your Comfort Is Our First Priority</h2>
            </b>
          </div>
        </section>
      </header>
      </div>
    </div>
  );
};

export default RoyalTravelsScreen;
