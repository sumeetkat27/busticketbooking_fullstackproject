import ManagerNavigation from "../components/ManagerNavigation";
import { toast, ToastContainer } from "react-toastify";
import { Input } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import RouteApiService from "../Service/RouteApiService";
import route from "../assets/route3.jpg"
import HaultService from "../Service/HaultService";


const AddHault = (props) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const [station, setStation] = useState("");
    const [routeId, setRouteId] = useState(-1);
    const [distance, setDistance] = useState();
    const [routeList, setRouteList] = useState([]);
    const [haultList, setHaultList] = useState([]);
    const [searchStation, setSearchStation] = useState();

    const myStyle = {
        backgroundImage:
            `url(${route})`,
        height: '100vh',
        marginTop: '-20px',
        fontSize: '50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };


    const addHault = () => {
        console.log(station + " " + routeId + " " + distance);
        if (station === undefined
            || routeId === -1 || distance < -1) {
            toast.warning("Please Enter Valid Data");
        } else {
            var body = {
                station,
                routeId,
                distance
            }
            HaultService.create(body)
                .then(response => {
                    toast.success("Station Added !!!")
                })
                .catch(error => { toast.error("Station Exist on Same Route"); setSearchStation(station); getHault(); })
        }
    }

    useEffect(() => {
        if (user === null || user.role !== "ROLE_MANAGER") {
            props.history.push("/signin");
        } else {
            getAllRoutesList();
        }
    }, []);

    const getAllRoutesList = () => {
        RouteApiService.getRoutes()
            .then(response => { setRouteList(response.data) })
            .catch(err => { toast.warning("Something Went Wrong in Getting Route List") })
    }

    const getHault = () => {
        console.log(searchStation)
        // if (searchStation === undefined || searchStation === null) {
        //     toast.warning("Please Enter Valid Name");
        //     return;
        // }

        HaultService.getByName(searchStation)
            .then(response => { if (response.data.length === 0) { toast.warn("Station Does Not Exist") } setHaultList(response.data) })
            .catch(err => { toast.warning("Station Does Not Exist") })
    }

    const deleteHault = (body) => {
        HaultService.remove(body)
            .then(response => { toast.success("Delete Successfully!!!"); getHault(); })
            .catch(err => { toast.warning("Could Not Delete ") })
    }

    return (
        <>
            <ManagerNavigation />
            <ToastContainer position='top-right' />
            <div className='container' style={myStyle} >

                <div className='row'>
                    <div className="col-5" style={{ fontSize: "18px", backgroundColor: "lightblue" }}>

                        <div className="form-group mb-3">
                            <label>Station Name :</label>
                            <Input
                                type="text"
                                name="station"

                                onChange={(e) => { setStation(e.target.value) }}
                            />
                        </div>
                        <div className="form-control selectpicker" style={{ height: "50px" }} >
                            <div><label className="mt-1">Select Route : &nbsp;</label>
                                <select className="form-control selectpicker"
                                    style={{ width: "50%", float: "right", marginRight: "20px" }}
                                    placeholder="select Type" onChange={(e) => { setRouteId(e.target.value) }}>
                                    <option>---Select Route---</option>
                                    {routeList.length > 0 && routeList.map((x, index) =>
                                        <option key={index} value={x.id}>{x.src + " ---- " + x.dest} </option>
                                    )}

                                </select>
                            </div>
                        </div>

                        <div class="container-grid mb-3 mt-2">
                            <label>Distance from Source (Km) :</label>
                            <Input
                                type="number"
                                name="distance"
                                min={1}
                                onChange={(e) => { setDistance(e.target.value) }}
                            />
                        </div>

                        <button
                            className="btn btn-success me-2 mb-3 "
                            onClick={addHault}
                        >
                            Add Station
                        </button>

                    </div>
                    <div className="col-1"></div>
                    <div className='col-6'>
                        <div >
                            <Input type="text" className="mb-2 mt-4" style={{ height: "37px", backgroundColor: "black", color: "white" }} min={1}
                                placeholder="Enter Station Name" onChange={(e) => setSearchStation(e.target.value)}
                            />
                            <button className='btn btn-info mt-1 mb-3' style={{ float: "right" }} onClick={getHault}>Search</button>
                        </div>
                        {haultList.length > 0 && <div >
                            <table className="table table-dark table-hover" style={{ fontSize: "14px" }}>
                                <thead style={{ position: "sticky", top: 0, textAlign: "center" }} class="thead-dark" >
                                    <tr>
                                        <th class="header" scope="col">Station Id</th>
                                        <th class="header" scope="col">Station</th>
                                        <th class="header" scope="col" >RouteName</th>
                                        <th class="header" scope="col" >Action</th>
                                    </tr>
                                </thead>

                                <tbody style={{ textAlign: "center", verticalAlign: "middle", fontSize: "14px" }}>
                                    {haultList.map((hault, index) =>
                                        <tr key={index}>
                                            <td>{hault.id}</td>
                                            <td>{hault.station}</td>
                                            <td>{hault.routeId.src + " ---- " + hault.routeId.dest}</td>
                                            <td><button
                                                className="btn btn-danger me-2 mb-1 "
                                                value={hault.id}
                                                onClick={(e) => {
                                                    deleteHault(e.target.value)
                                                }}
                                            >Delete</button></td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddHault;