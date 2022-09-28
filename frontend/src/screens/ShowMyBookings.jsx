
import { useEffect } from "react";
import { useState } from "react";
import React from "react";
import UserNavigation from "../components/UserNavigation";
import { Button } from "react-bootstrap";
import swal from "sweetalert";
import BookingApiService from "../Service/BookingApiService";
import { toast } from "react-toastify";
import Header from "../components/Header";



const ShowMyBookings = (props) => {

    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [pageNo, setPageNo] = useState(0);
    const [today, setToday] = useState(new Date().toISOString().split("T")[0]);


    const getBookings = () => {

        var obj = {
            id: user.id,
            pageNo
        }
        BookingApiService.showBookings(obj)
            .then((response) => {
                setBookings(response.data);
            })
            .catch(error => {
                console.log(error);
                toast.info("Sorry Could Not Get Bookings");
            })

    }

    const pageRequest = (value) => {
        var obj = {
            id: user.id,
            pageNo: value
        }
        BookingApiService.showBookings(obj).then((result) => {
            if (result.data.length !== 0) {

                setBookings(result.data)
            }

        }).catch((error) => {
            console.log(error);
        })

    }

    const getNextPage = () => {

        setPageNo(pageNo + 1)
        // console.log("in next pageNo: " + pageNo)
    }

    useEffect(() => {
        getBookings()
    }, [pageNo])

    const getPrevPage = () => {
        if (pageNo > 0) {
            setPageNo(pageNo - 1)
        }
        //console.log("in prev pageNo: " + pageNo)

    }


    const cancelBooking = (value) => {
        // confirm("Confirm Do you want ");
        BookingApiService.cancelBooking(value)
            .then(response => {
                swal("Success", response.data, "success"); getBookings();
            })
            .catch(error => {
                swal("OOPS!! Could Not Cancel Try Again");
            })
    }


    useEffect(() => {
        if (localStorage.getItem("user") === undefined) {
            props.history.push("/signin")
        } else
            getBookings(0);
    }, [])

    return (
        <>{
            user === null ?
                props.history.push("/signin") :
                <div>
                    <UserNavigation></UserNavigation>
                    <Header title="My Bookings" />
                    {/* <nav aria-label="Page navigation example">*/}
                    <ul className="pagination justify-content">
                        <button className="page-link" onClick={getPrevPage} >Previous</button>
                        <button className="page-link" onClick={() => pageRequest(0)} >1</button>
                        <button className="page-link" onClick={() => pageRequest(1)} >2</button>
                        <button className="page-link" onClick={() => pageRequest(2)} >3</button>
                        <button className="page-link" onClick={getNextPage} >Next</button>
                    </ul>
                    {/* </nav> */}
                    <div>
                        <table className="table table-dark table-striped table-hover m-3" style={{ width: "95vw", marginLeft: "100px", fontSize: "20px" }}>

                            <thead className="thead-dark">
                                <tr style={{ textAlign: "center" }}>
                                    <th scope="col">Booking Id</th>
                                    <th scope="col">From</th>
                                    <th scope="col">To</th>
                                    <th scope="col">Seat Num</th>
                                    <th scope="col">Passenger</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.length > 0 && bookings.map((booking, index) => {
                                    return (
                                        <tr key={index} style={{ textAlign: "center" }}>
                                            <td>{booking.id}</td>
                                            <td>{booking.onBoard}</td>
                                            <td>{booking.offBoard}</td>
                                            <td>{booking.seatNum}</td>
                                            <td>{booking.fullName}</td>
                                            <td>{booking.scheduleId.startDate}</td>
                                            <td>{booking.price}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    class="btn btn-danger btn-lg"
                                                    disabled={booking.scheduleId.startDate <= today || booking.status === "CANCELED"}
                                                    style={{ backgroundColor: booking.status === "CANCELED" ? "grey" : "", borderColor: booking.status === "CANCELED" ? "grey" : "" }}
                                                    onClick={() => cancelBooking(booking.id)}
                                                >
                                                    {booking.status === "CANCELED" ? "Canceled" : "Cancel"}
                                                </button>

                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

        }
        </>
    );
}

export default ShowMyBookings;