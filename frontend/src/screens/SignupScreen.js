/* eslint-disable no-lone-blocks */
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import HomeNavigation from "../components/HomeNavigation";
import UserApiService from "../Service/UserApiService";
import addUser from "../Service/UserApiService"
import signup from "../assets/signup.jpg";
import swal from "sweetalert";
import { useEffect } from "react";
import axios from "axios";

const SignupScreen = (props) => {

  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userDob, setUserDob] = useState(new Date());
  const [userMobile, setUserMobile] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userRole, setUserRole] = useState("ROLE_CUSTOMER");
  const [userZip, setUserZip] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userState, setUserState] = useState("");
  const [statesList, setStatesList] = useState([]);
  const [cityList, setCityList] = useState("");
  const [stateId, setStateId] = useState(1);


  useEffect(() => {
    async function CallStatesAPI() {
      await axios.get('http://cdn-api.co-vin.in/api/v2/admin/location/states')
        .then(response => {

          setStatesList(response.data.states);
        })
        .catch(error => {
          console.log(error);
        })
    }
    CallStatesAPI();
  }, [])

  useEffect(() => {
    console.log(stateId);

    async function CallCityAPI() {
      await axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/districts/' + stateId)
        .then(response => {
          setCityList(response.data.districts);


        })
        .catch(error => {
          console.log(error);
        })
    }
    CallCityAPI();

  }, [userState])




  const onSignup = (e) => {
    //e.preventDefault();
    /* if (userPassword !== userConfirmPassword) {
      setStatus(true);
    } else */

    {
      const user = {
        firstName: userFirstName,
        lastName: userLastName,
        dob: userDob,
        mobile: userMobile,
        email: userEmail,
        password: userPassword,
        gender: userGender,
        role: userRole,
        city: userCity,
        state: userState.state_name,
        zip: userZip

      };

      var addedUser = UserApiService.signup(user)
        .then((response) => {
          swal("Sign up Success", "Sign Up successfull", "success");
          console.log(`message : ${response.data}`);
          props.history.push("/signin");
        })
        .catch((error) => {
          swal("OOPS!!", "Somethins went wrong", "error");
          console.log(`message : ${error}`);
          props.history.push("/signup");
        });

      console.log(addedUser);


    }
  };

  const validate = () => {
    var regEx = /^[a-zA-Z\s]+$/;
    var pattern = /^[6-9]\d{9}$/gi;
    if (userFirstName === "") {
      swal("Error", "Please enter Name", "error");
      return false;
      // } else if (!isNaN(Name)) {
      //   sweetalert("Error", "Please enter valid Name", "error");
      //   return false;
    } else if (!regEx.test(userFirstName)) {
      swal("Error", "Please enter characters and space only", "error");
      return false;
    } else if (userMobile === "") {
      swal("Error", "Please enter Mobile number", "error");
      return false;
    } else if (
      !pattern.test(userMobile) ||
      isNaN(userMobile) ||
      userMobile.length <= 9 ||
      userMobile.length >= 11
    ) {
      swal("Error", "Please enter valid Mobile number", "error");
      return false;
    } else if (userEmail === "") {
      swal("Error", "Please enter email", "error");
      return false;
    } else if (userEmail.indexOf("@") <= 0) {
      swal("Error", "Please enter valid email", "error");
      return false;
    } else if (
      userEmail.charAt(userEmail.length - 4) !== "." &&
      userEmail.charAt(userEmail.length - 3) !== "."
    ) {
      swal("Error", "Please enter valid email", "error");
      return false;
    } else if (userPassword === "") {
      swal("Error", "Please enter password", "error");
      return false;
    } else if (userPassword.length <= 5) {
      // sweetalert("Error", "Please enter Strong password", "error");
      swal("Error", "Password must be atleast 6 character", "error");

      return false;
    } /* else if (City === "") {
      sweetalert("Error", "Please enter city", "error");
      return false;
    } else if (!isNaN(City)) {
      sweetalert("Error", "Please enter valid city", "error");
      return false;
    } else if (Role === "") {
      sweetalert("Error", "Please select role", "error");
      return false;
    }*/
    onSignup();
  };

  return (
    <div
      className="bg-light"
      style={{
        background: `url(${signup})`,
        backgroundSize: "cover",
        height: "250vh",
      }}
    >
      <HomeNavigation />
      <div>
        <div
          className="text-center"
          style={{
            fontFamily: "cursive",
            fontSize: "50px",
            marginTop: "10px",
            color: "white",
          }}
        >
          Sign Up
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="form-group col-md-6">
            <div
              className="form form-control mt-3 bg-dark"
              style={{
                boxShadow: "2px 2px 10px black",
                opacity: "0.8",
                color: "white",
              }}
            >

              <div className="mb-2">
                <label className="form-label">First Name</label>
                <input
                  onChange={(e) => {
                    setUserFirstName(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Last Name</label>
                <input
                  onChange={(e) => {
                    setUserLastName(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Date Of Birth</label>&nbsp;&nbsp;&nbsp;
                <input
                  className="form-control"
                  style={{ width: "200px" }}
                  onChange={(e) => {
                    setUserDob(e.target.value);
                  }}
                  type="date"
                />
              </div>


              <label className="form-label mb-2">Gender</label>
              <div className="">
                <select
                  className="custom-select custom-select-lg mb-2 p-2"
                  style={{ width: "100px", borderRadius: "5px", color: "black" }}
                  onChange={(e) => {
                    setUserGender(e.target.value);
                  }}
                >
                  <option selected>None</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label" >Mobile</label>
                <input
                  onChange={(e) => {
                    setUserMobile(e.target.value);
                  }}
                  type="number"
                  className="form-control"
                />

              </div>

              <div></div>
              <div className="mb-2">
                <label className="form-label">Email</label>
                <input
                  onChange={(e) => {
                    setUserEmail(e.target.value);
                  }}
                  type="email"
                  className="form-control"
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Password</label>
                <input
                  onChange={(e) => {
                    setUserPassword(e.target.value);
                  }}
                  type="password"
                  className="form-control"
                ></input>
              </div>

              <div className="mb-2">
                <label className="form-label">Confirm Password</label>
                <input
                  onChange={(e) => {
                    setUserConfirmPassword(e.target.value);
                  }}
                  onBlur={(e) => {
                    if (userPassword !== userConfirmPassword) {
                      setStatus("Password Does Not Match")
                      console.log(status)
                    } else
                      setStatus("");
                  }}
                  type="password"
                  className="form-control"
                ></input>
              </div>
              <div style={{ color: "red" }}>
                {status}
              </div>

              <div class="form-group col-md-8">
                <label for="inputState">Select State</label>
                <select id="inputState" class="form-control"
                  defaultValue={statesList[0]} onChange={(e) => { setUserState(statesList[e.target.value]); setStateId(e.target.value) }}>
                  {statesList && statesList.map((x, index) => <option key={index} value={x.state_id}>{x.state_name}</option>)}
                </select>
              </div>

              <div class="form-group col-md-8">
                <label for="inputState">Select City</label>
                <select className="form-control"
                  defaultValue={cityList[0]}
                  onChange={(e) => {
                    setUserCity(e.target.value);
                  }}>
                  {cityList && cityList.map((x, index) => <option key={index} value={x.district_name}>{x.district_name}</option>)}
                </select>
              </div>
              <div class="form-group col-md-8">
                <label className="form-label">Enter Postal Code (PIN)</label>
                <input
                  onChange={(e) => {
                    setUserZip(e.target.value);
                  }}
                  type="text"
                  className="form-control d-inline"
                />
              </div>

              <label className="form-label mb-2">Select Role</label>
              <div className="">
                <select
                  className="custom-select custom-select-lg mb-2 p-2"
                  style={{ width: "125px", color: "black" }}
                  onChange={(e) => {
                    setUserRole(e.target.value); console.log(e.target.value)
                  }}
                  defaultValue="ROLE_CUSTOMER"
                >
                  <option value="ROLE_CUSTOMER">Passenger</option>
                  <option value="ROLE_MANAGER">Manager</option>
                </select>
              </div>

              <div className="mb-2">
                <button onClick={validate} className="btn btn-success">
                  Sign Up
                </button>
                <div className="float-end">
                  Old User? <Link to="/signin">SignIn Here</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default SignupScreen;
