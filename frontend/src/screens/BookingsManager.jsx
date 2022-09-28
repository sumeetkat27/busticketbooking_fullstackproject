import { useEffect } from "react";
import { useState } from "react";
import React from "react";
import { useRef } from "react";
import swal from "sweetalert";
import BookingApiService from "../Service/BookingApiService";
import ManagerNavigation from "../components/ManagerNavigation";
import { Button, Input } from "antd";
import exportFromJSON from 'export-from-json'
import { toast, ToastContainer } from "react-toastify";

const BookingsManager = (props) => {

    const [bookings, setBookings] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [id, setId] = useState(0);

    const data = searchList;
    const fileName = 'download'
    const exportType = 'xls'

    const ExportToExcel = () => {
        exportFromJSON({ data, fileName, exportType })
    }



    const cancelBooking = (id) => {
        BookingApiService.cancelBooking(id)
            .then(response => { toast.success("Canceled"); getBookingsList(); })
            .catch(err => toast.error("OOPS!! Error occurred"))
    }

    const getBookingsList = () => {
        BookingApiService.viewBookings(pageNo)
            .then(response => { setBookings(response.data); setSearchList(response.data) })
            .catch(error => { swal("Error", "OOPS!! Something Went Wrong at Our Side", "error") })
    }

    useEffect(() => {
        if (localStorage.getItem("user") === null || localStorage.getItem("user") === undefined || (JSON.parse(localStorage.getItem("user")).role) !== "ROLE_MANAGER") {
            props.history.push("/signin")
        } else {
            getBookingsList();
        }
    }, []);

    const getNextPage = () => {
        if (bookings.length > 0)
            setPageNo(pageNo + 1)
        // console.log("in next pageNo: " + pageNo)
    }

    useEffect(() => {

        getBookingsList();

    }, [pageNo])

    const getPrevPage = () => {
        if (pageNo > 0) {
            setPageNo(pageNo - 1)
        }
        //console.log("in prev pageNo: " + pageNo)

    }

    const searchByDate = () => {
        if (fromDate === undefined || toDate === undefined) {
            toast.warn("Please Select Date");
        } else {
            var body = {
                fromDate,
                toDate
            }
            BookingApiService.search(body)
                .then(response => { response.data.lemgth > 0 ? setSearchList(response.data) : setSearchList(bookings) })
                .catch(err => { toast.warning("Something Went Wrong"); setSearchList(bookings) })
        }

    }

    const searchById = () => {
        if (id === undefined)
            toast.warn("Please Enter Id");
        else {
            var body = {
                id
            }
            BookingApiService.search(body)
                .then(response => { setSearchList(response.data) })
                .catch(err => { toast.warning("Id is not Valid"); setSearchList(bookings) })
        }
    }

    return (
        <>
            <div>
                <ManagerNavigation />
                <ToastContainer position="top-right" />
                <div className="mb-3">
                    <h2 className="text-center mt-3 mb-3">View All Bookings</h2>
                    <div aria-label="Page navigation example" style={{ marginLeft: "3%" }}>

                        <ul class="pagination" style={{ float: "left" }}>
                            <button type="button" className="btn btn-success" onClick={ExportToExcel}>Export To Excel</button>
                            <button className="btn btn-info" style={{ backgroundColor: "#0dcaf0", borderColor: "#0dcaf0", color: "black", borderRadius: "5px", marginLeft: "10px" }} class="page-link" onClick={getPrevPage} >Previous</button>
                            <button className="btn btn-info" class="page-link" onClick={getNextPage} style={{ backgroundColor: "#0dcaf0", borderColor: "#0dcaf0", color: "black", borderRadius: "5px" }} >Next</button>
                        </ul>
                        <input type="date" style={{ height: "7vh", padding: "5px", float: "left", marginLeft: "20%" }}
                            onSelect={(e) => setFromDate(e.target.value)}
                        />
                        <input type="date" style={{ height: "7vh", padding: "5px", float: "left" }}
                            onSelect={(e) => setToDate(e.target.value)}
                        />
                        <button style={{ float: "left" }} className="btn btn-info" onClick={searchByDate}>Search</button>
                        <button style={{ float: "right", marginRight: "5%" }} onClick={searchById} className="btn btn-info mb-2">Search</button>
                        <Input type="number" min={1} style={{ float: "right", width: "20%", height: "37px", borderRadius: "5px" }} placeholder="Search By Ticket Id"
                            onChange={(e) => setId(e.target.value)}></Input>

                    </div>

                    <table
                        className="table table-striped table-hover mt-2"
                        style={{ fontSize: "20px", textAlign: "center" }}
                    >
                        <thead style={{ position: "sticky", top: 0, textAlign: "center", backgroundColor: "lightgrey", border: "1px solid black" }}>
                            <tr>
                                <th>Booking Id</th>
                                <th>Bus Name</th>
                                <th>Bus Number</th>
                                <th>Date Of Journey</th>
                                <th>On Boarding</th>
                                <th>Off Board</th>
                                <th>Seat Number</th>
                                <th>Customer</th>
                                <th> Fare</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchList.length > 0 && searchList.map((booking, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{booking.id}</td>
                                        <td>{booking.scheduleId.busId.busName}</td>
                                        <td>{booking.scheduleId.busId.busNo}</td>
                                        <td>{booking.scheduleId.startDate}</td>
                                        <td>{booking.onBoard}</td>
                                        <td>{booking.offBoard}</td>
                                        <td>{booking.seatNum}</td>
                                        <td>{booking.userId.firstName + " " + booking.userId.lastName}</td>
                                        <td>{booking.price}</td>
                                        <td>
                                            <button
                                                type="button"
                                                class="btn btn-danger btn-md mt-0"
                                                disabled={booking.status === "CANCELED"}
                                                style={{ backgroundColor: booking.status === "CANCELED" ? "black" : "", zIndex: -1 }}
                                                onClick={(e) => cancelBooking(booking.id)}
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
        </>
    );
}

export default BookingsManager;
