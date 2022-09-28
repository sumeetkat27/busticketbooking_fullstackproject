import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080"; //"https://immense-retreat-08081.herokuapp.com";

const header = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};


const addBus = (bus) => {
  return axios.post("/bus/add", bus, header);
}

const viewBus = (bus) => {
  return axios.post("/schedule/get", bus, header);
}

const calculateDistance = (body) => {
  return axios.post("/schedule/distance", body, header)
}

const findByBusNo = (id) => {
  return axios.get(`/bus/get/${id}`, header)
}

const findAll = () => {
  return axios.get("/bus/getall", header);
}



export default { viewBus, addBus, calculateDistance, findByBusNo, findAll };
