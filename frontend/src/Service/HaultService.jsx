import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

const header = {
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
};

const getAll = () => {
    return axios.get("/hault/getsource", header);
};

const create = (data) => {
    return axios.post('/hault/add', data, header);
};

const get = (id) => {
    return axios.get("/hault/getdest" + `/${id}`, header);
};

const getByName = (station) => {

    return axios.get(`/hault/get/${station}`, header)
}

const remove = (id) => {
    return axios.delete(`/hault/delete/${id}`, header);
};
export default { getAll, create, get, remove, getByName };
