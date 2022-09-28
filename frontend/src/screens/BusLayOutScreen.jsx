
import { useEffect } from "react";
import { useState } from "react";
import React from "react";
import UserNavigation from "../components/UserNavigation";
import { Button } from "react-bootstrap";
import BusApiService from "../Service/BusApiService";
import swal from "sweetalert";
import BookingApiService from "../Service/BookingApiService";
import { toast } from "react-toastify";
import seat2 from '../assets/seat2.jpg'


const BusLayOutScreen = (props) => {



    const [totalSeats, setTotalSeats] = useState([]);
    const [seatCount, setSeatCount] = useState(0);
    const [busDetails, setBusDetails] = useState(JSON.parse(localStorage.getItem("bus")));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [columns, setColumns] = useState(0);
    const [rows, setRows] = useState(0);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [onBoardStation, setOnBoardStation] = useState(JSON.parse(localStorage.getItem("onBoard")));
    const [offBoardStation, setOffBoardStation] = useState(JSON.parse(localStorage.getItem("offBoard")));
    const [isSelected, setIsSeleted] = useState(false);
    const [alreadyBookedSeats, setAlreadyBookedSeats] = useState([]);
    const [price, setPrice] = useState(JSON.parse(localStorage.getItem("price")));


    const showSelected = () => {
        setIsSeleted(current => !current);
    }



    const getList = () => {
        var arr = [];
        setRows(Math.floor((busDetails.busId.seatCapacity) / 5));
        arr.length = Math.floor((busDetails.busId.seatCapacity) / 5);
        var x = 0;
        for (var i = 0; i < arr.length; i++) {
            arr[i] = x;
            x = x + 5;
        }
        setTotalSeats(arr);
    }

    const checkUser = () => {
        if (user === null)
            props.history.push("/signin")
        console.log(user)
    }

    const addSeat = (e) => {
        var clickedSeat = e.target.value;

        if (bookedSeats.includes(clickedSeat)) {
            setBookedSeats(bookedSeats.filter(i => i !== clickedSeat));
            setTotalPrice((bookedSeats.length - 1) * price);
            return;
        }
        console.log(price);
        console.log(totalPrice)
        setBookedSeats([...bookedSeats, e.target.value]);
        console.log(bookedSeats.length);
        setTotalPrice((bookedSeats.length + 1) * price);
        showSelected();
    }

    const clearSelection = () => {
        setBookedSeats([]);
        setTotalPrice(0);
    }

    const generateTicket = () => {
        if (bookedSeats.length === 0) {
            swal("Error", "Please Select Atleast One Seat", "error");
            return;
        } else {
            getBookedSeatList();
            var booking = {
                onBoard: onBoardStation,
                offBoard: offBoardStation,
                userId: user,
                scheduleId: busDetails,
                seatNo: bookedSeats,
                price: totalPrice
            }
            console.log(booking);
            localStorage.setItem("booking", JSON.stringify(booking));

            if (bookedSeats.includes(getBookedSeatList()))
                toast.info("Sorry Some of Seats you selected are already booked");
            else
                props.history.push("/make-payment");
        }
    }

    const getBookedSeatList = () => {

        console.log(busDetails);
        BookingApiService.bookedSeatList(busDetails)
            .then(response => {
                setAlreadyBookedSeats(response.data);
            })
            .catch(error => {
                swal("Something Went Wrong");
            })
    }

    useEffect(() => {
        getList();
        getBookedSeatList();
    }, [])

    return (
        <>{
            user === null ?
                props.history.push("/signin") :
                <div >
                    <UserNavigation></UserNavigation>
                    <div
                        className="text-center"
                        style={{
                            marginLeft: "35%",
                            fontFamily: "cursive",
                            fontSize: "50px",
                            marginTop: "10px",
                            color: "Black",
                        }}
                    >
                        Bus Layout
                    </div>
                    <div style={{ width: "40%", float: "left", height: "100vh" }}>
                        <br />
                        <div style={{ marginLeft: "10%" }}>
                            <Button className="mb-3" variant="primary" style={{ backgroundColor: "Beige", color: "black" }}> Window Seat </Button>
                            <Button className="mb-3" variant="primary" style={{ backgroundColor: "lightBlue", color: "WHite", marginLeft: "15%" }}> Aisle Seat </Button><br />
                            <Button className="mb-3" variant="primary" style={{ backgroundColor: "grey", color: "WHite" }}> Already Booked </Button>
                            <Button className="mb-3" variant="primary" style={{ backgroundColor: "green", color: "WHite", marginLeft: "11%" }}> Your Selected </Button>
                            <br />
                            <br />
                            <h4>Your Total Price is = {totalPrice}</h4>
                            <br />
                            <Button onClick={clearSelection} variant="danger" style={{ float: "left" }}>Clear Selection</Button>
                            <Button style={{ marginLeft: "10%" }} variant="success" onClick={generateTicket}>Book Selected Seats</Button>
                        </div>
                    </div>
                    <table className="table table-striped" style={{ width: "40%", float: "right", alignSelf: "center", marginRight: "15%" }}>
                        <tbody>
                            <tr>
                                <td align="right" style={{ fontFamily: "cursive" }}>Window Seat</td>
                                <td colSpan={3} align={"center"} style={{ fontFamily: "cursive" }}>Aisle Seats</td>
                                <td align="left" style={{ fontFamily: "cursive" }}>Window Seat</td>

                            </tr>
                            {totalSeats && totalSeats.map((x, index) => <tr style={{ textAlign: "center" }} key={index - 100}>
                                <td key={x + 1} align="right" style={{ paddingRight: "5%" }}> <Button id={x + 1} value={x + 1} className="mb-3" variant="primary" style={{ backgroundColor: alreadyBookedSeats.includes((parseInt(JSON.stringify(x)) + parseInt("1"))) ? "grey" : bookedSeats.includes((parseInt(JSON.stringify(x)) + parseInt("1")).toString()) ? "green" : "beige", color: "black", width: "40px" }}
                                    disabled={alreadyBookedSeats.includes((parseInt(JSON.stringify(x)) + parseInt("1")))}
                                    onClick={addSeat}
                                > {x + 1} </Button></td>
                                <td key={x + 2} align="left" > <Button style={{ color: "black", backgroundColor: alreadyBookedSeats.includes((parseInt(JSON.stringify(x)) + parseInt("2"))) ? "grey" : bookedSeats.includes((parseInt(JSON.stringify(x)) + parseInt("2")).toString()) ? "green" : "lightblue", width: "40px" }} disabled={alreadyBookedSeats.includes((parseInt(JSON.stringify(x)) + parseInt("2")))} id={x + 1} value={x + 2} onClick={addSeat} > {x + 2} </Button></td>
                                <td key={x + 3} align="right"> <Button style={{ backgroundColor: alreadyBookedSeats.includes((parseInt(JSON.stringify(x)) + parseInt("3"))) ? "grey" : bookedSeats.includes((parseInt(JSON.stringify(x)) + parseInt("3")).toString()) ? "green" : "lightblue", color: "black", width: "40px" }} disabled={alreadyBookedSeats.includes((parseInt(JSON.stringify(x)) + parseInt("3")))} id={x + 1} value={x + 3} onClick={addSeat}> {x + 3} </Button></td>
                                <td key={x + 4} align="right" style={{ paddingRight: "5%" }}> <Button style={{ backgroundColor: alreadyBookedSeats.includes((parseInt(JSON.stringify(x)) + parseInt("4"))) ? "grey" : bookedSeats.includes((parseInt(JSON.stringify(x)) + parseInt("4")).toString()) ? "green" : "lightblue", color: "black", width: "40px" }} disabled={alreadyBookedSeats.includes((parseInt(JSON.stringify(x)) + parseInt("4")))} id={x + 1} value={x + 4} onClick={addSeat}> {x + 4} </Button></td>
                                <td key={x + 5} align="left"> <Button id={x + 1} value={x + 5} style={{ backgroundColor: alreadyBookedSeats.includes((parseInt(JSON.stringify(x)) + parseInt("5"))) ? "grey" : bookedSeats.includes((parseInt(JSON.stringify(x)) + parseInt("5")).toString()) ? "green" : "beige", color: "black", width: "40px" }} disabled={alreadyBookedSeats.includes((parseInt(JSON.stringify(x)) + parseInt("5")))} onClick={addSeat}> {x + 5} </Button></td></tr>)}
                            {/*<img style={{ height: "2vh", marginTop: "5px", marginBottom: "5px", boxShadow: "2px 2px 10px black" }} src={seat} />*/}

                        </tbody>
                    </table>
                </div>
        }
        </>
    );
}

export default BusLayOutScreen;