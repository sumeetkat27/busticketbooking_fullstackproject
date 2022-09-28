import { Input, InputNumber } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import swal from "sweetalert";
import Header from "../components/Header";
import ManagerNavigation from "../components/ManagerNavigation";
import RouteApiService from "../Service/RouteApiService";
import '../css/AddRouteCss.css'
import { Button } from "react-bootstrap";

const AddRoute = (props) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [src, setSrc] = useState("");
    const [dest, setDest] = useState("");
    const [pricePerKm, setPricePerKm] = useState("");
    const [routeList, setRouteList] = useState([]);
    const [flag, setFlag] = useState(false);
    const [id, setId] = useState();
    const [searchList, setSearchList] = useState([]);

    useEffect(() => {
        if (user === null || user.role !== "ROLE_MANAGER") {
            props.history.push("/signin");
        } else {
            getAllRoutesList();
        }
    }, []);

    const updatePrice = () => {
        var body = {
            id,
            pricePerKm
        }
        RouteApiService.updatePriceById(body)
            .then((response) => { getAllRoutesList(); swal("Success", "Price Updated", "success") })
            .catch(error => swal("Error", "OOPS!! Could Not Update Price", "error"))
    }

    const getAllRoutesList = () => {
        RouteApiService.getRoutes()
            .then(response => { setRouteList(response.data); setSearchList(response.data) })
            .catch()
    }

    const saveRoute = () => {

        if (src === dest) {
            swal("Error", "Source and Destination Cannot be Same", "error");
            return;
        }

        var body = {
            src,
            dest,
            pricePerKm
        }

        RouteApiService.addRoute(body)
            .then(response => { swal("Success", "Route is Added", "success"); getAllRoutesList(); })
            .catch(error => swal("Error", "OOPS!! Route Is Already Exist", "error"))
        getAllRoutesList();

    }

    const filterList = (searchStation) => {

        if (searchStation == undefined) {
            setSearchList(setRouteList);
        } else {
            setSearchList(routeList.filter((x) => x.src.toUpperCase().match(searchStation.toUpperCase())
                || x.dest.toUpperCase().match(searchStation.toUpperCase())
                || x.id === parseInt(searchStation)));
        }
    }

    const deleteById = () => {

        RouteApiService.deleteById(id)
            .then(response => {
                setSrc(""); setDest("");
                setFlag(false); setPricePerKm();
                setId(0); getAllRoutesList();
            })
            .catch(error => { toast.error("Could Not Delete") })
    }



    return (
        <>
            <div>
                <ManagerNavigation />
                <ToastContainer position="top-right" />
                <div className="container">
                    <div className="row">
                        <div className="col-5" style={{ fontSize: "20px" }}>
                            <Header title="Add Route" />
                            <div class="container-grid">
                                <label>Enter Source:</label>
                                <Input
                                    value={src}
                                    type="text"
                                    name="source"
                                    className="input_route"
                                    readOnly={flag}
                                    style={{ backgroundColor: flag ? "transparent" : "" }}
                                    onChange={(e) => { setSrc(e.target.value) }}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label>Enter Destination:</label>
                                <Input
                                    type="text"
                                    name="destination"
                                    className="input_route"
                                    value={dest}
                                    readOnly={flag}
                                    style={{ backgroundColor: flag ? "transparent" : "" }}
                                    onChange={(e) => { setDest(e.target.value) }}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Enter Price Per Km : &nbsp;</label>
                                <Input
                                    type="number"
                                    name=""
                                    className="input_route"
                                    value={pricePerKm}

                                    onChange={(e) => { setPricePerKm(e.target.value) }}
                                    min={1}
                                />
                            </div>
                            {!flag ? <button
                                className="btn btn-success me-2 mb-3 "
                                onClick={saveRoute}
                            >
                                Add Route
                            </button> :
                                <button
                                    className="btn btn-success me-2 mb-3 "
                                    onClick={updatePrice}
                                >
                                    Update Price
                                </button>
                            }
                            {flag && <button
                                className="btn btn-danger me-2 mb-3 "
                                onClick={() => {
                                    setSrc(""); setDest("");
                                    setFlag(false); setPricePerKm();
                                    setId(0)
                                }}
                            >Cancel</button>
                            }
                            {flag &&
                                <button
                                    className="btn btn-danger me-2 mb-3 "
                                    onClick={deleteById}
                                >Delete Route</button>
                            }
                        </div>
                        <div className="col-6" style={{ marginLeft: "5%", overflow: "auto" }}>
                            <div style={{ marginTop: "-30px" }}>
                                <Header title="Route List" />
                            </div>
                            <div >
                                <Input type="text" className="mb-2" style={{ height: "37px" }}
                                    placeholder="Enter Station or Route Id"
                                    onChange={(e) => { filterList(e.target.value) }} />

                            </div>
                            <div className="container_route">
                                <table className="table table-dark table-striped table-hover">
                                    <thead style={{ position: "sticky", top: 0, textAlign: "center" }} className="thead-dark" >
                                        <tr>
                                            <th class="header" scope="col">Route Id</th>
                                            <th class="header" scope="col" >Source</th>
                                            <th class="header" scope="col">Destination</th>
                                            <th class="header" scope="col">Price Per Km </th>
                                            <th class="header" scope="col">Update Price</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ textAlign: "center", verticalAlign: "middle" }}>

                                        {searchList.map((route, index) => {
                                            return <tr>
                                                <td>{route.id}</td>
                                                <td>{route.src}</td>
                                                <td>{route.dest}</td>
                                                <td>{route.pricePerKm}</td>
                                                <td><Button onClick={() => {
                                                    setSrc(route.src); setDest(route.dest);
                                                    setFlag(true); setPricePerKm(route.pricePerKm);
                                                    setId(route.id)
                                                }}
                                                >Update</Button></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddRoute;