import { useState } from "react";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import ManagerNavigation from "../components/ManagerNavigation";
import BusApiService from "../Service/BusApiService";
import RouteApiService from "../Service/RouteApiService";
import ScheduleService from "../Service/ScheduleService";
import { Input } from "antd";

const ScheduleBus = (props) => {

    const [busList, setBusList] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [routeList, setRouteList] = useState([]);
    const [routeId, setRouteId] = useState();
    const [route, setRoute] = useState();
    const [busNo, setBusNo] = useState();
    const [startDate, setStartDate] = useState();
    const [startTime, setStartTime] = useState();
    const [today, setToday] = useState(new Date().toISOString().split("T")[0]);
    const [searchList, setSearchList] = useState([]);
    const [scheduleList, setScheduleList] = useState([]);

    const getAllBuses = () => {
        BusApiService.findAll()
            .then(response => { setBusList(response.data) })
            .catch(error => { toast.error("Something went wrong Please Refresh or conatct us") });
    }
    const getAllRoutesList = () => {
        RouteApiService.getRoutes()
            .then(response => { setRouteList(response.data); })
            .catch()
    }

    const getAllSchedules = () => {
        ScheduleService.getSchedules()
            .then(response => { setSearchList(response.data); setScheduleList(response.data) })
            .catch(error => { toast.error("Server Down") })
    }

    useEffect(() => {
        if (user === null || user.role !== "ROLE_MANAGER") {
            props.history.push("/signin");
        } else {
            getAllBuses();
            getAllRoutesList();
            getAllSchedules();
        }
    }, [])

    const schedule = () => {
        console.log(route + " " + busNo + " " + startDate + " " + startTime)
        if (route === undefined || busNo === undefined || startDate === undefined || startTime === undefined) {
            toast.warning("All Fields are mandatory");


        } else {
            var body = {
                routeId: route.id,
                busNo,
                startDate,
                startTime
            }

            ScheduleService.create(body)
                .then(response => { toast.success("Bus is Ready to Go "); setBusNo(); setRoute(); getAllSchedules() })
                .catch(err => { toast.error("OOPS!! something went wrong") })
        }
    }

    const cancelSchedule = (id) => {
        ScheduleService.deleteSchedule(id)
            .then(response => { toast.warn("Bus canceled !!!"); getAllSchedules(); })
            .catch(error => { toast.error("Error Occurred Try Again") })
    }

    const filterList = (searchStation) => {

        if (searchStation == undefined) {
            setSearchList(setRouteList);
        } else {
            setSearchList(scheduleList.filter((x) => x.routeId.src.toUpperCase().match(searchStation.toUpperCase())
                || x.routeId.dest.toUpperCase().match(searchStation.toUpperCase())
                || x.busId.busNo.toString().match(searchStation)));
        }
    }

    return (
        <>
            <ManagerNavigation />
            <ToastContainer position="top-right" />
            <div className="container">
                <div className="row">
                    <div className="col-5">
                        <div className="form-group mb-3">
                            <span class="input-group-text" style={{ float: "left" }} id="basic-addon1">Bus No:

                                <input list="busList" style={{ float: "right", marginLeft: "6vw" }} className="form-control"
                                    onChange={(e) => { setBusNo(e.target.value) }} placeholder="Select Bus No" value={busNo} />
                                <datalist id="busList" >
                                    {busList.map((bus, index) => <option id={bus.id}>{bus.busNo}</option>)}

                                </datalist>
                            </span>

                            <br />

                            <div >
                                <span class="input-group-text mt-2" style={{ float: "left" }} id="basic-addon1">Route No:

                                    <input list="routeList" style={{ float: "right", marginLeft: "4.8vw" }} className="form-control"
                                        onChange={(e) => {

                                            setRoute(routeList.filter((route) => { return route.src === e.target.value.split(" ")[0] && route.dest === e.target.value.split(" ")[2] })[0])
                                        }} placeholder="Select Route" />
                                    <datalist id="routeList"  >
                                        {routeList.map((route, index) => <option key={index} id={route.id} >{route.src + " ---> " + route.dest}</option>)}
                                    </datalist>
                                </span>
                            </div>
                            <div >
                                <span class="input-group-text mt-2" style={{ float: "left" }} id="basic-addon1">Start Date :

                                    <input type="date" min={today} style={{ float: "right", marginLeft: "4.2vw", width: "16vw" }}
                                        className="form-control" onChange={(e) => { setStartDate(e.target.value) }} />
                                </span>
                            </div>
                            <div >
                                <span class="input-group-text mt-2" style={{ float: "left" }} id="basic-addon1">Start Time :

                                    <input type="time" style={{ float: "right", marginLeft: "4.2vw", width: "16vw" }} className="form-control"
                                        onChange={(e) => { setStartTime(e.target.value) }} />
                                </span>
                            </div>
                            <div >
                                <button style={{ float: "left", marginLeft: "20%" }} className="btn btn-success mt-2" onClick={schedule}>Schedule Bus</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-7">
                        <div >
                            <Input type="text" className="mb-2" style={{ height: "37px" }}
                                placeholder="Enter Bus No or Station"
                                onChange={(e) => { filterList(e.target.value) }} />

                        </div>
                        <div style={{ width: "100%", height: "365px", overflow: "auto" }}>
                            <table className="table table-dark table-hover table-striped">
                                <thead style={{ position: "sticky", top: 0, textAlign: "center" }} class="thead-dark" >
                                    <tr>
                                        <th class="header" scope="col">Schedule Id</th>
                                        <th class="header" scope="col" >Bus No</th>
                                        <th class="header" scope="col">Route</th>
                                        <th class="header" scope="col">Start Date</th>
                                        <th class="header" scope="col">Start Time</th>

                                        <th class="header" scope="col">Action</th>

                                    </tr>
                                </thead>
                                <tbody style={{ textAlign: "center", verticalAlign: "middle" }}>

                                    {searchList.length > 0 && searchList.map((schedule, index) => {
                                        return <tr>
                                            <td>{schedule.id}</td>
                                            <td>{schedule.busId.busNo}</td>
                                            <td>{schedule.routeId.src + "---" + schedule.routeId.dest}</td>
                                            <td>{schedule.startDate}</td>
                                            <td>{schedule.startTime}</td>
                                            <td><button
                                                type="button"
                                                class="btn btn-danger btn-md mt-0"
                                                disabled={schedule.status === "CANCELED"}
                                                style={{ backgroundColor: schedule.status === "CANCELED" ? "grey" : "", borderColor: schedule.status === "CANCELED" ? "white" : "", zIndex: -1 }}
                                                onClick={(e) => cancelSchedule(schedule.id)}
                                            >
                                                {schedule.status === "CANCELED" ? "Canceled" : "Cancel"}

                                            </button></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ScheduleBus;