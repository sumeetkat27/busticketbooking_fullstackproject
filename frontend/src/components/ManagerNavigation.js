import { Link } from "react-router-dom";


const ManagerNavigation = (props) => {

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("onBoard");
    localStorage.removeItem("offBoard");
    localStorage.removeItem("price");
    localStorage.removeItem("bus");
    localStorage.removeItem("booking");
    localStorage.removeItem("bookedTicket")
    localStorage.removeItem("busList");

  }

  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="row " style={{ width: "100vw", color: "white" }}>
            <div className="col-md-12 ">
              <ul className="navbar-nav mb-auto d-flex justify-content-between text-center" style={{ fontSize: "22px" }}>
                <li className="nav-item" >
                  <Link to="/manager">
                    <span className="nav-link me-5">Home</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/add-route">
                    <span className="nav-link me-5">Add Route</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/add-bus">
                    <span className="nav-link me-5">Add Bus</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/add-hault">
                    <span className="nav-link me-5">Add Hault</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/bus-schedule">
                    <span className="nav-link me-5">Schedule Bus</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/view-bookings">
                    <span className="nav-link me-5">View Bookings</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/view-profile-manager">
                    <span className="nav-link me-5">View My Profile</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/edit-profile-manager">
                    <span className="nav-link me-5">Edit Profile</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signin">
                    <button className="btn btn-outline-warning mt-2" onClick={logout}>
                      <span className="nav-link fs-6">Logout</span>
                    </button>
                  </Link>

                </li>
              </ul>
            </div>
          </div>
        </div>

      </nav>
    </div>
  );
};

export default ManagerNavigation;
