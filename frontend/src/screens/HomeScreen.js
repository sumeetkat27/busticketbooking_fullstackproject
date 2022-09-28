import HomeNavigation from "./../components/HomeNavigation";
import { Link } from "react-router-dom";
import HomeBackground from "../assets/HomeBackground.jpg";
const HomeScreen = (props) => {
  return (
    <div>
      <HomeNavigation />
      <div style={{background:`linear-gradient(180deg, #2F4F4F 0%, rgba(0, 0, 0, 0.1)40%), url(${HomeBackground})`, backgroundSize:"cover",height:"100vh", backgroundRepeat:"no-repeat"}}>  
      <div className="d-flex align-items-center justify-content-center flex-column mb-5" style={{height:"auto"}}>
      <h1 style={{marginTop:"200px", color:"white"}} >Welcome to Royal Bus Booking Service</h1> 
      <Link to="/signup">
              <span className="btn btn-secondary btn-lg btn-block mt-5">Sign Up</span>
      </Link>
      </div>
      </div>
    </div>
  );
};

export default HomeScreen;
