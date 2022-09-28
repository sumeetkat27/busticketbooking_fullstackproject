import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080"; //"https://immense-retreat-08081.herokuapp.com";

const header = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

class PaymentApiService { }

export default new PaymentApiService();
