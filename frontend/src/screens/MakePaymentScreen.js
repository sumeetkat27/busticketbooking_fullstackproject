import React, { useEffect, useState } from "react";
import PaymentApiService from "../Service/PaymentApiService";
import BusApiService from "../Service/BusApiService";
import UserNavigation from "../components/UserNavigation";
import viewBus from "../assets/viewBus.jpg";
import BookingApiService from "../Service/BookingApiService";
import routeImage from '../assets/Home.jpeg'
import { toast } from "react-toastify";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const MakePaymentScreen = (props) => {


  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [bookingDetails, setBookingDetails] = useState(JSON.parse(localStorage.getItem('booking')));
  const [modeOfPay, setModeOfPay] = useState("UPI");
  const [ticket, setTicket] = useState();
  const [passenger, setPassenger] = useState([]);
  const [bookingObject, setBookingObject] = useState();
  const [price, setPrice] = useState(parseInt(JSON.parse(localStorage.getItem('booking')).price))
  console.log(parseInt(JSON.parse(localStorage.getItem('booking')).price));
  let [nameList, setNameList] = useState([]);
  const [pid, setPid] = useState();
  const [flag, setFlag] = useState(false);



  const bookTicket = (value) => {

    console.log(nameList)
    var body = {
      ...bookingDetails,
      nameList,
      txnId: value
    }
    console.log(body);
    BookingApiService.addBooking(body)
      .then(async response => {
        localStorage.setItem("bookedTicket", JSON.stringify(response.data), [], (setFlag(true)));

      })
      .catch(error => {
        console.log(error);
        swal("Error", "OOPS!!! Something went wrong", "error")
      })

  }

  const goBack = () => {
    //  localStorage.removeItem("booking");
    props.history.push("/layout");
  }

  useEffect(() => { }, [flag]);

  useEffect(() => {
    console.log(bookingDetails);
    toast.warn("Fill All passenger details")
  }, [])


  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      }

      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }
  const displayRazorPay = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("You are offline Failed to load Payment Gateway")
      return;
    }

    const options = {
      key: 'rzp_test_42ctP1zytKKP42',
      currency: "INR",
      amount: price * 100,
      name: "Royal Travels",
      description: "Thank For Booking Tickets",

      handler: function (response) {
        swal("Successful", "Hi Your Payment is sccuessful with id :" + response.razorpay_payment_id, "success")
        bookTicket(response.razorpay_payment_id)

      }
    }

    const paymentObject = new window.Razorpay(options);
    paymentObject.open()
  }

  return (
    <>
      {user == null ?
        props.history.push("/signin") :
        <div style={{
          backgroundSize: "cover", backgroundRepeat: "repeat-y", height: "150vh", opacity: "0.8", backgroundImage:
            `url(${routeImage})`
        }}>
          <UserNavigation />
          <div style={{ height: "10%" }}></div>
          <div className="  bg-dark mt-5" style={{
            border: "2px solid grey", textAlign: "left",
            width: "40%", color: "black",
            boxShadow: "2px 2px 10px grey", fontFamily: "revert", padding: "5px", float: "left", marginLeft: "5%"
          }}>
            <h3 style={{ color: "lightblue" }}>You are Booking Ticket For </h3>
            <table className="text-info" style={{ height: "200px", marginLeft: "30px", padding: "5px", fontSize: "20px" }}>
              <tr> <td >Your Name : {user.firstName}&nbsp;{user.lastName}</td></tr>
              <tr> <td >Boarding : {bookingDetails.onBoard} <span className="text-info" style={{ float: "right" }}>&nbsp;&nbsp; Dropping : {bookingDetails.offBoard} </span></td></tr>
              <tr> <td>Bus No : {bookingDetails.scheduleId.busId.busNo} </td></tr>
              <tr> <td>Your Selected Seat No. Are : {bookingDetails.seatNo.map(x => x + ", ")}</td></tr>
              <tr> <td>Fare Details : {bookingDetails.price}</td></tr>

            </table>
          </div>
          <div className="row mt-1" style={{ float: "right", marginRight: "8%" }}>
            {/* <div className="col-md-4"></div>
            <div className="col-md-4"> */}
            <h2 className="text-center" style={{ fontSize: "30px", color: "black" }}>Choose Payment Method</h2>
            <form className="form-control mb-5 bg-dark text-light" style={{ fontSize: "20px", boxShadow: "2px 2px 10px black" }}>
              <div className="form-group mb-2 form-check">
                <input
                  type="radio"
                  className="form-check-input "
                  id="creditCard"
                  name="payment"
                  defaultChecked
                  value={"CREDITCARD"}
                  onClick={() => { setModeOfPay("CREDITCARD") }}
                />
                <label className="d-inline">Credit Card</label>
              </div>

              <div className="form-group mb-2 form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="debitCard"
                  name="payment"

                  onClick={() => { setModeOfPay("DEBITCARD") }}
                />
                <label>Debit Card</label>
              </div>

              <div className="form-group mb-2 form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="wallet"
                  name="payment"
                  onClick={() => { setModeOfPay("WALLET") }}
                />
                <label>Wallet</label>
              </div>

              <div className="form-group mb-2 form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="netBanking"
                  name="payment"
                  onClick={() => { setModeOfPay("NETB") }}
                />
                <label>NetBanking</label>
              </div>

              <div className="form-group mb-2 form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="upi"
                  name="payment"
                  onClick={() => { setModeOfPay("UPI") }}
                />
                <label>UPI</label>
              </div>
              {!flag && <button
                className="btn btn-warning mb-2 me-2 mt-3"
                onClick={displayRazorPay}
              >
                Proceed
              </button>
              }
              {!flag &&
                <button className="btn btn-danger mb-2 me-2 mt-3" onClick={goBack}>
                  Cancel
                </button>
              }
              {flag &&

                <button className="btn btn-success mb-2 me-2 mt-3" onClick={() => { props.history.push("/generateticket") }}>Get Ticket</button>

              }
            </form>
          </div>
          <div class="row" style={{ marginTop: "30%", marginLeft: "5%", marginRight: "5%" }}>
            <h3>Passenger Details:</h3>
            {bookingDetails.seatNo.length > 0 && bookingDetails.seatNo.map((x, index) =>
              <div class="col-4" style={{ float: "left" }}>
                <label style={{ float: "left", color: "black", fontSize: "25px" }}>Seat No. {x}  </label>
                <input id={x} type="text" class="form-control" placeholder="First name" defaultValue={user.firstName + " " + user.lastName} name="fn" onChange={(e) => { nameList[e.target.id] = e.target.value }} />
                <br />

              </div>
            )}
          </div>
        </div>

      }
    </>
  );
}
export default MakePaymentScreen;
