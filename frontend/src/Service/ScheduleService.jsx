import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

const header = {
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
};

const getAll = () => {
    localStorage.getItem("token")
    return axios.get("/schedule/getsource", header);
};

const create = (data) => {
    return axios.post('/schedule', data, header);
};

const get = (id) => {
    return axios.get("/schedule/getdest" + `/${id}`, header);
};

const getByName = (station) => {

    return axios.get(`/schedule/get/${station}`, header)
}

const remove = (id) => {
    return axios.delete(`/schedule/delete/${id}`, header);
};

const getSchedules = () => {
    return axios.get("/schedule/getfuture", header)
}

const deleteSchedule = (id) => {
    return axios.delete(`/schedule/delete/${id}`, header)
}

export default { getAll, create, get, remove, getByName, getSchedules, deleteSchedule };
