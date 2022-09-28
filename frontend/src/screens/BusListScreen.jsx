import { useState, useEffect } from "react";
import React from "react";
import UserNavigation from "../components/UserNavigation";
import HaultService from "../Service/HaultService";
import BusApiService from "../Service/BusApiService";
import moment from "moment";
import BusLayOutScreen from "./BusLayOutScreen";
import { Link } from "react-router-dom";
import { ToastBody } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import swal from "sweetalert";
import { isEmpty } from "lodash";
import { Button } from "antd";
import space2 from '../assets/space2.jpg'



const BusListScreen = (props) => {

    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [sourceList, setSourceList] = useState([]);
    const [destList, setDestList] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const [date, setDate] = useState(new Date());
    const [busList, setBusList] = useState([]);
    const [distance, setDistance] = useState();
    const [pageNo, setPageNo] = useState(0);
    const [sortType, setSortType] = useState(true);
    const [today, setToday] = useState(new Date().toISOString().split("T")[0]);

    const init = () => {
        HaultService.getAll()
            .then(response => {
                //   console.log('Getting Source List', response.data + " " + user);
                setSourceList(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    const myStyle = {
        backgroundImage:
            `url(${space2})`,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };


    useEffect(() => {
        if (user === null)
            props.history.push("/signin")
        else {

            init();
        }
        if (localStorage.getItem("busList")) {
            setSource(JSON.parse(localStorage.getItem("onBoard")))
            setDestination(JSON.parse(localStorage.getItem("offBoard")))
            setBusList(JSON.parse(localStorage.getItem("busList")));

        }

    }, []);

    useEffect(() => {
        getDistance();
    }, [busList])


    const getNextPage = () => {
        setPageNo(pageNo + 1)
        // console.log("in next pageNo: " + pageNo)
    }

    useEffect(() => {
        if (user === null)
            props.history.push("/signin")
        else {
            getBusList()
        }
    }, [pageNo])

    const getPrevPage = () => {
        if (pageNo > 0) {
            setPageNo(pageNo - 1)
        }
        //console.log("in prev pageNo: " + pageNo)

    }





    const getDestinations = (e) => {
        setSource(e);
        HaultService.get(e)
            .then(response => {
                setDestination(response.data[0]);
                setDestList(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    const getBusList = () => {
        var body = {
            source,
            destination,
            date,
            pageNo
        }

        getDistance();
        if (source == 0) {
            toast.info("Specify Source", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            return;
        } else if (destination == 0) {
            toast.info("Specify Destination", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            return;
        }


        BusApiService.viewBus(body)
            .then(response => {
                console.log(response.data);
                if (response.data.length !== 0) {
                    setBusList(response.data)
                    console.log(response.data[0].startTime);
                }
                else {
                    getPrevPage();
                }
            })
            .catch(error => {
                console.log(error)
            })

    }



    const getDistance = () => {
        var obj = {
            source, destination
        }
        BusApiService.calculateDistance(obj)
            .then(response => {
                console.log("this is getting called")
                console.log(response.data);
                setDistance(response.data);

            })
            .catch(error => {

            })
    }

    const getPrice = (bus) => {
        return bus.busId.type === "SLEEPER" && bus.busId.acType === "AC" ?
            distance * (bus.routeId.pricePerKm) + (distance * 3)
            : (bus.busId.type === "SEATING" && bus.busId.acType === "AC" ? distance * (bus.routeId.pricePerKm) + (distance * 1)
                : (bus.busId.type === "SLEEPER" && bus.busId.acType === "NON_AC" ? distance * (bus.routeId.pricePerKm) + (distance * 2) : distance * (bus.routeId.pricePerKm)))
    }

    const sortList = (value) => {


        var body = {
            source,
            destination,
            date
        }
        if (value)
            setBusList(busList.sort((x, y) => getPrice(y) - getPrice(x)));
        else {
            setBusList(busList.sort((x, y) => getPrice(x) - getPrice(y)));
        }
        setSortType(value)
    }

    const busLayout = (bus) => {
        console.log(bus);
        localStorage.setItem("busList", JSON.stringify(busList));
        localStorage.setItem("bus", JSON.stringify(bus));
        localStorage.setItem("onBoard", JSON.stringify(source));
        localStorage.setItem("offBoard", JSON.stringify(destination));
        localStorage.setItem("price", getPrice(bus));
        props.history.push("/layout");
    }

    return (
        <>
            {
                user === null ?
                    props.history.push("/signin")
                    :
                    <div>
                        <UserNavigation />
                        <ToastContainer />
                        <div style={myStyle} >
                            <div className="text-center p-4"
                                style={{
                                    fontSize: "30px", color: "White", fontWeight: "bolder",
                                    fontFamily: "'Courier New', monospace", textShadow: "1px 1px 1px white", fontFamily: "cursive"
                                }}>Hi {user["firstName"]} Welcome To Royal Bus Bookings</div>

                            <div className="mb-2 mt-2" style={{ marginLeft: "5vw", float: "left", fontFamily: "sans-serif" }}>
                                <label for="from" style={{ padding: "5px" }}>From :</label>
                                <select name="from" style={{ width: "22vw", padding: "5px" }}
                                    onChange={(e) => getDestinations(e.target.value)}
                                >
                                    <option value={0}>{"Select Source Station"}</option>
                                    {sourceList.map((x, index) => <option key={index} value={x}>{x}</option>)}
                                </select>

                                <label for="To" style={{ padding: "5px" }}>To :</label>
                                <select name="To" style={{ width: "22vw", padding: "5px" }}
                                    onChange={(e) => setDestination(e.target.value)}
                                >
                                    {destList.length === 0 && <option value={0}>{"Select Destination"}</option>}
                                    {destList.filter((x) => { return x !== source }).map((x, index) => <option key={index} value={x}>{x}</option>)}
                                </select>

                            </div>


                            <div className="form-group mt-2">
                                <label for="StartDate" style={{ padding: "5px" }}>Date :</label>
                                <input type="date" min={today} style={{ height: "2.6vw", padding: "5px", }}
                                    onSelect={(e) => setDate(e.target.value)}
                                />

                                <button onClick={getBusList} className="btn btn-outline-success" style={{ marginRight: "21vw", float: "right", padding: "0.3vw", fontFamily: "sans-serif" }}>
                                    Search
                                </button>
                            </div>

                            <br />
                            <div aria-label="Page navigation example" style={{ marginLeft: "3%" }}>
                                <ul class="pagination">
                                    <button className="btn btn-info" style={{ backgroundColor: "#0dcaf0", borderColor: "#0dcaf0", color: "black", borderRadius: "5px" }} class="page-link" onClick={getPrevPage} >Previous</button>
                                    <button className="btn btn-info" class="page-link" onClick={getNextPage} style={{ backgroundColor: "#0dcaf0", borderColor: "#0dcaf0", color: "black", borderRadius: "5px" }} >Next</button>
                                    <button className="btn btn-info bg-blue" class="page-link" onClick={() => sortList(!sortType)} style={{ backgroundColor: "#0dcaf0", borderColor: "#0dcaf0", color: "black", marginLeft: "68%" }} >Sort on Price</button>
                                </ul>

                            </div>

                            {/* Display BusList in Below Section */}

                            {busList.length > 0 && (
                                <table class="table table-striped table-light table-hover">
                                    <thead>
                                        <tr style={{ textAlign: "center" }}>
                                            <th scope="col">Bus No</th>
                                            <th scope="col">Bus Name</th>
                                            <th scope="col">Arrival Time</th>
                                            <th scope="col">Departure Time</th>
                                            <th scope="col">Type</th>
                                            <th scope="col"> Price</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ textAlign: "center", verticalAlign: "middle" }}>
                                        {busList.map((bus, index) => {
                                            return (

                                                <tr key={index} >
                                                    <td>{bus.busId.busNo}</td>
                                                    <td>{bus.busId.busName}</td>
                                                    <td>

                                                        {moment(bus.startDate, "yyyy-MM-DD").format("DD-MM") + " " + moment(bus.startTime, "hh:mm:ss").add(distance / 20, 'h').format("hh:mm")}
                                                        {/* {moment(bus).format("MM-DD hh:mm a")} */}
                                                    </td>

                                                    <td>{moment(bus.startDate, "yyyy-MM-DD").format("DD-MM") + " " + moment(bus.startTime, "hh:mm:ss").add(distance / 20, 'h').add(20, 'm').format("hh:mm")}</td>
                                                    <td>{bus.busId.type + "  " + bus.busId.acType} </td>
                                                    <td>{getPrice(bus)} </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            class="btn btn-info"
                                                            onClick={() => { busLayout(bus) }}
                                                        >
                                                            Select
                                                        </button>
                                                    </td>
                                                </tr>

                                            );

                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
            }
        </>
    );
}

export default BusListScreen;