import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import UserApiService from "../Service/UserApiService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeNavigation from "../components/HomeNavigation";
import Signin from "../assets/Signin.jpg";
import swal from "sweetalert";
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { Input } from "antd";
import seat2 from '../assets/seat2.jpg'


const SignInScreen = (props) => {
  localStorage.removeItem('user');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, serRole] = useState("");

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const onSignin = (e) => {

    let user_captcha = document.getElementById('user_captcha_input').value;

    if (validateCaptcha(user_captcha) === true) {
      //e.preventDefault();
      console.log(`email : ${email}`);
      console.log(`password : ${password}`);
      UserApiService.signin(email, password)
        .then((response) => {
          toast.info("Logged in Successfully!!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
          console.log(`data : ${response.data.jwt}`);
          console.log(`data : ${response.data.user.id}`);
          console.log(`data : ${response.data.user.authStatus}`);
          console.log(`data : ${response.data.user.role}`);
          localStorage.setItem("token", response.data.jwt);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("userId", response.data.user.id);
          console.log(response.data);
          UserApiService.jwtService(response.data.jwt);
          localStorage.removeItem("busList");
          localStorage.removeItem("bookedTicket");
          //localStorage.setItem("user", JSON.stringify(response.data));


          if (
            response.data.role === "ROLE_CUSTOMER"
          ) {
            props.history.push("/buses");
          } else if (response.data.role === "ROLE_MANAGER") {

            props.history.push("/manager");
          } else if (response.data.role === "ROLE_OWNER") {
            props.history.push("/owner");
          }
        })
        .catch((error) => {
          swal("Log in Failed", "Please Enter valid Email and Password", "error")
          console.log(`error : ${error}`);
        });
    } else {
      swal("Error", 'Captcha Does Not Match', "error");
      document.getElementById('user_captcha_input').value = "";
    }
  };

  const validate = () => {
    var regEx = /^[a-zA-Z\s]+$/;
    var pattern = /^[6-9]\d{9}$/gi;
    if (email === "") {
      swal("Error", "Please enter email", "error");
      return false;
    } else if (email.indexOf("@") <= 0) {
      swal("Error", "Please enter valid email", "error");
      return false;
    } else if (
      email.charAt(email.length - 4) !== "." &&
      email.charAt(email.length - 3) !== "."
    ) {
      swal("Error", "Please enter valid email", "error");
      return false;
    } else if (password === "") {
      swal("Error", "Please enter password", "error");
      return false;
    } else if (password.length <= 5) {
      // sweetalert("Error", "Please enter Strong password", "error");
      swal("Error", "Password must be atleast 6 character", "error");

      return false;
    }
    onSignin();
  };

  const forgotPassword = (e) => {
    if (email === "") {
      swal("Error", "Please enter email", "error");
      return false;
    } else if (email.indexOf("@") <= 0) {
      swal("Error", "Please enter valid email", "error");
      return false;
    } else if (
      email.charAt(email.length - 4) !== "." &&
      email.charAt(email.length - 3) !== "."
    ) {
      swal("Error", "Please enter valid email", "error");
      return false;
    } else {

    }
  }



  return (
    <div>
      <HomeNavigation />

      <ToastContainer />
      <div className="row bg-light">
        <div className="col-md-7">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <img style={{ height: "100vh", marginTop: "50px", marginBottom: "50px", boxShadow: "2px 2px 10px black", borderRadius: "10px" }} src={seat2} />
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="text-center" style={{ fontFamily: "cursive", fontSize: "40px", marginTop: "20px" }}>Sign In</div>
          <div className="form form-control fs-5" style={{ height: "80vh", marginBottom: "20px", marginTop: "30px", boxShadow: "2px 2px 10px black" }}>
            <div className="mb-3">
              <label className="form-label p-2">Email</label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="form-control p-2 me-2"
                placeholder="test@test.com"
              />
            </div>
            <div className="mb-3">
              <label className="form-label p-2 me-2">Password</label>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="form-control p-2"
                placeholder="*****"
              ></input>
            </div>
            <div >
              <LoadCanvasTemplate />
            </div>
            <div className="form-group col-md-6">
              <Input placeholder="Enter Captcha Value" id="user_captcha_input" name="user_captcha_input" type="text"></Input></div>
            <div className="mb-3 p-2 mt-1">
              <button onClick={validate} className="btn btn-success btn-md w-25">
                Log In
              </button>
              <div className="float-end fs-6">
                New User? <Link to="/signup">Signup here</Link>
              </div>
              <div className="float-end fs-6">
                <Link to={'/forgotpassword'} >Forgot Password</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;
