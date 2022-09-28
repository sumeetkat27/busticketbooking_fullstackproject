import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";  //"https://immense-retreat-08081.herokuapp.com";

const header = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

class ManagerApiService {
  addAgent(agent) {
    return axios.post("/manager/add-agent", agent, header);
  }
  addDriver(driver) {
    return axios.post("/manager/add-driver", driver, header);
  }
  getSchdeduleDetails() {
    return axios.get("/manager/get-schedule-details", header);
  }
  addScheduleDetails(busSchedule) {
    return axios.post("/manager/add-schedule", busSchedule, header);
  }
}

export default new ManagerApiService();
