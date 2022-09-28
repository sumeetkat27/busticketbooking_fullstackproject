import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080"; //"https://immense-retreat-08081.herokuapp.com";

const header = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};


const showBookings = (obj) => {
  return axios.post("/book/mybookings/", obj, header);
}
const checkReservation = (bId) => {
  console.log(`booking id : ${bId}`);
  return axios.get("/booking/check-reservation/" + bId, header);
}

const viewBookings2 = (busId) => {
  console.log(`bus id : ${busId}`);
  return axios.get("/booking/view-bookings-owner/", header);
}

const cancelBooking = (bookId) => {
  console.log(header);
  return axios.put(`/book/cancel/${bookId}`, [], header);
}
const addBooking = (booking) => {
  console.log(`booking`);
  return axios.post("/book", booking, header);
}

const bookedSeatList = (body) => {
  console.log(body);
  return axios.post('/book/getbookedseats', body, header);
}


const viewBookings = (pageNo) => {
  return axios.get(`/book/get/${pageNo}`, header);
}

const search = (body) => {
  return axios.post("/book/search", body, header);
}




export default { showBookings, addBooking, cancelBooking, viewBookings2, viewBookings, checkReservation, bookedSeatList, search };
