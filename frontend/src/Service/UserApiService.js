import { config } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080"; //"https://immense-retreat-08081.herokuapp.com";

const header = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

const jwtService = (jwt) => {
  axios.interceptors.request.use((config) => {
    if (localStorage.getItem("token")) {

      //adding the authorization header to config
      config.headers.Authorization = 'Bearer ' + jwt;
    }
    //return config
    return config;
  });
}

const token = localStorage.getItem("token");

const signup = (user) => {
  console.log(user);
  return axios.post("/user/add", user);
}
const signin = (email, password) => {
  const body = {
    email,
    password,
  };
  //console.log(`email : ${email} and password : ${password}`);
  return axios.post("/user/login", body);
}
const editProfile = (profile) => {
  console.log(`profile : ${profile.name}`);
  const userId = localStorage.getItem("user");
  console.log(`userId : ${localStorage.getItem("userId")}`);
  return axios.put("/user/editprofile", profile, header);
}
const viewProfile = (userId) => {
  console.log(`user id : ${userId}`);
  return axios.get("/user/view-profile/" + userId);
}
const deleteUser = (userId) => {
  console.log(`user id : ${userId}`);
  return axios.delete("/user/delete-account/" + userId);
}

const viewProfile2 = (userId) => {
  console.log(`user id : ${userId}`);
  return axios.get("/user/view-profile-manager/" + userId);
}
const editProfile2 = (profile) => {
  console.log(`profile : ${profile.name}`);
  const userId = localStorage.getItem("userId");
  console.log(`userId : ${localStorage.getItem("userId")}`);
  return axios.post("/user/edit-profile-manager/" + userId, profile);
}

const viewProfile3 = (userId) => {
  console.log(`user id : ${userId}`);
  return axios.get("/user/view-profile-owner/" + userId);
}

const editProfile3 = (profile) => {
  console.log(`profile : ${profile.name}`);
  const userId = localStorage.getItem("userId");
  console.log(`userId : ${localStorage.getItem("userId")}`);
  return axios.post("/user/edit-profile-owner/" + userId, profile);
}
const changePassword = (userId) => {
  axios.put("/user/change-password" + userId);
}

const getSateList = () => {
  return fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states")
}

const changeProfile = (body, userId) => {
  return axios.post(`/user/${userId}/image`, body,
    { headers: { 'Content-type': 'multipart/form-data;boundary=add-random-characters', Authorization: "Bearer " + localStorage.getItem("token") } });
}

const getProfile = (userId) => {
  //axios.defaults.Authorization.headers = "Bearer " + localStorage.getItem("token");
  //axios.responseType = "blob"

  return axios.get(`/user/${userId}/image`, { responseType: "blob" });
}

const checkUser = (email) => {
  return axios.post("/user/check", email);
}

export default { jwtService, signin, signup, editProfile, changePassword, viewProfile, getSateList, changeProfile, getProfile, checkUser }
