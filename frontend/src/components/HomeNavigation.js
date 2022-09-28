import { Link } from "react-router-dom";
import {Button, Form, Alert, Nav, Navbar, Container, NavDropdown} from 'react-bootstrap';

const HomeNavigation = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd"}}>
      <div className="container-fluid fs-5">
        <Link to="/royal-travels">
          <span className="navbar-brand fs-3">Royal Travels</span>
        </Link>

        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/home">
              <span className="nav-link">Home</span>
            </Link>
          </li>


          <li className="nav-item">
            <Link to="/about">
              <span className="nav-link">About Us</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/contact">
              <span className="nav-link">Contact Us</span>
            </Link>
          </li>
          </ul>

          <ul className="navbar-nav me-2 mb-2 mb-lg-0">

          <li className="nav-item mx-3">
            <Link to="/signin">
              <span className="nav-link btn btn-outline-info">Sign In</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/signup">
              <span className="nav-link btn btn-outline-info">Sign Up</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HomeNavigation;
