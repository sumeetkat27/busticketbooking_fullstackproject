import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";  //"https://immense-retreat-08081.herokuapp.com";

const header = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};


const addRoute = (route) => {
  return axios.post("/route/add", route, header);
}
const getRoutes = () => {
  return axios.get("/route/getall", header);
}

const updatePriceById = (body) => {
  return axios.post("/route/updateprice", body, header);
}

const deleteById = (id) => {
  return axios.delete(`/route/delete/${id}`, header)
}


export default { addRoute, getRoutes, updatePriceById, deleteById };
