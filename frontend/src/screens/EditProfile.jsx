import React from "react";
import Header from "../components/Header";
import UserNavigation from "../components/UserNavigation";
import UserApiService from "./../Service/UserApiService";
import edit from "../assets/edit.jpg";
import swal from "sweetalert";
import { useState } from "react";
import { useEffect } from "react";
import ManagerNavigation from "../components/ManagerNavigation";
import axios from "axios";

const EditProfile = (props) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userDob, setUserDob] = useState(new Date());
    const [userMobile, setUserMobile] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userGender, setUserGender] = useState("");
    const [stateId, setStateId] = useState(1);
    const [userZip, setUserZip] = useState("");
    const [userCity, setUserCity] = useState("");
    const [userState, setUserState] = useState("");
    const [statesList, setStatesList] = useState([]);
    const [cityList, setCityList] = useState("");


    const validate = (e) => {

        var regEx = /^[a-zA-Z\s]+$/;
        var pattern = /^[6-9]\d{9}$/gi;
        if (name === "") {
            swal("Error", "Please enter Name", "error");
            return false;
            // } else if (!isNaN(Name)) {
            //   sweetalert("Error", "Please enter valid Name", "error");
            //   return false;
        } else if (!regEx.test(name)) {
            swal("Error", "Please enter characters and space only", "error");
            return false;
        } else if (userMobile === "") {
            swal("Error", "Please enter userMobile number", "error");
            return false;
        } else if (
            !pattern.test(userMobile) ||
            isNaN(userMobile) ||
            userMobile.length <= 9 ||
            userMobile.length >= 11
        ) {
            swal("Error", "Please enter valid Mobile number", "error");
            return false;
        } else   /* else if (City === "") {
            //       sweetalert("Error", "Please enter city", "error");
            //       return false;
            //     } else if (!isNaN(City)) {
            //       sweetalert("Error", "Please enter valid city", "error");
            //       return false;
            //     } else if (Role === "") {
            //       sweetalert("Error", "Please select role", "error");
            //       return false;
            //     }*/
            updateProfile();
    };

    const updateProfile = () => {
        const updatedUser = {
            id: user.id,
            firstName: userFirstName,
            lastName: userLastName,
            dob: userDob,
            mobile: userMobile,
            city: userCity,
            state: userState,
            zip: userZip
        };

        UserApiService.editProfile(updatedUser)
            .then((response) => {
                swal("Profile Udated Success", "Profile Udated successfull", "success");
                console.log(`message : ${response.data}`);
                setUser(response.data);
            })
            .catch((error) => {
                swal("OOPS!!", "Somethins went wrong", "error");
                console.log(`message : ${error}`);
            });
        console.log("Added user ")
        localStorage.setItem("user", JSON.stringify(user));
    }

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



    useEffect(() => {
        if (user === null) {
            props.history.push("/signin");
        } else {
            setUserFirstName(user.firstName);
            setUserLastName(user.lastName);
            setUserDob(user.dob);
            setUserMobile(user.mobile);
            setUserCity(user.city);
            setUserState(user.state);
        }
    }, [user]);

    return (
        <>
            {user == null ?
                props.history.push("/signin") :


                <div style={{ backgroundImage: `url(${edit})`, backgroundRepeat: "none", backgroundSize: "cover" }}>
                    {user.role === "ROLE_CUSTOMER" ? <UserNavigation /> : <ManagerNavigation />}

                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-4 mb-3">
                            <div className="text-center m-2" style={{ fontSize: "50px", fontFamily: "cursive" }}>Edit Profile</div>

                            <div className="form-group">
                                <label className="mb-2">First Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    defaultValue={user.firstName}
                                    onChange={(e) => { setUserFirstName(e.target.value) }}
                                />
                            </div>
                            <label className="mb-2">Last Name:</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                defaultValue={user.lastName}
                                onChange={(e) => { setUserLastName(e.target.value) }}
                            />



                            <div className="mb-3">
                                <label className="form-label mb-2">Mobile</label>
                                <input
                                    name="mobile"
                                    type="number"
                                    className="form-control"
                                    defaultValue={user.mobile}
                                    onChange={(e) => { setUserMobile(e.target.value) }}
                                />
                            </div>

                            <div className="form-group mb-2">

                                <label for="inputState">Select State</label>
                                <select id="inputState" class="form-control"
                                    defaultValue={statesList[0]} onChange={(e) => { setUserState(statesList[e.target.value]); setStateId(e.target.value) }}>
                                    {statesList && statesList.map((x, index) => <option key={index} value={x.state_id}>{x.state_name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="form-label mb-2">City :</label>
                                <select className="form-control"
                                    defaultValue={cityList[0]}
                                    onChange={(e) => {
                                        setUserCity(e.target.value);
                                    }}>
                                    {cityList && cityList.map((x, index) => <option key={index} value={x.district_name}>{x.district_name}</option>)}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="mb-2">DOB:</label>
                                <input
                                    type="date"
                                    name="dob"
                                    className="form-control"
                                    defaultValue={user.dob}
                                    onChange={(e) => { setUserDob(e.target.value) }}
                                />
                            </div>

                            <button className="btn btn-success mb-3 mt-4 text-center" onClick={validate}>
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            }

        </>
    );
}

export default EditProfile;