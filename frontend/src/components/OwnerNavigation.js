import { Link } from "react-router-dom";

const OwnerNavigation = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="row" style={{ width: "100vw" }}>
          <div className="col-md-1 mt-2">
            <Link to="/royal-travels">
              <span className="navbar-brand fs-3">Royal Travels</span>
            </Link>
          </div>
          <div className="col-md-11 ">
            <ul
              className="navbar-nav me-auto  mb-auto d-flex justify-content-around text-center mx-2 mt-2"
              style={{ fontSize: "20px" }}
            >
              <li className="nav-item">
                <Link to="/owner">
                  <span className="nav-link">Home</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/add-manager">
                  <span className="nav-link">Appoint Manager</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/view-bookings-owner">
                  <span className="nav-link me-5">View Bookings</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/view-profile-owner">
                  <span className="nav-link">View My Profile</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/edit-profile-owner">
                  <span className="nav-link">Edit Profile</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/signin">
                  <button className="btn btn-outline-warning ">
                    <span
                      className="nav-link fs-6
              "
                    >
                      Logout
                    </span>
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default OwnerNavigation;
