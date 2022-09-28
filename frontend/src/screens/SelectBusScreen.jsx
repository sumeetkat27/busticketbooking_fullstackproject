import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserNavigation from "./../components/UserNavigation";
import viewBus from "../assets/viewBus.jpg";
import swal from "sweetalert";
import HaultService from "../Service/HaultService";

const SelectBusScreen = (props) => {


    const [firstName, setFirstName] = useState(localStorage.getItem("user"));
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [startdate, setStartDate] = useState(new Date());
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const [sourceList, setSourceList] = useState([]);
    const [destList, setDestList] = useState([]);
    const [msg, setMsg] = useState("");

    const init = () => {
        HaultService.getAll()
            .then(response => {
                console.log('Getting Source List', response.data + " " + user);
                setSourceList(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    const validate = () => {
        if (source == 0)
            swal("Please Select Source")
        if (destination == 0)
            swal("Please Select Destination")
    }

    const getDestinations = (e) => {
        setSource(e);
        HaultService.get(e)
            .then(response => {
                console.log('Getting Source List', response.data);

                setDestList(response.data);

            })
            .catch(error => {
                console.log('Something went wrong', error);
            })

    }

    useEffect(() => {
        init();
    }, []);


    return (
        <>
            {
                user === null ?
                    props.history.push("/signin")
                    :
                    <div >
                        <UserNavigation />
                        <div style={{ backgroundImage: `url(${viewBus})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh", opacity: "0.8" }}>
                            <div className="text-center p-4"
                                style={{
                                    fontSize: "60px", color: "black", fontWeight: "bolder",
                                    fontFamily: "'Courier New', monospace", textShadow: "1px 1px 1px white"
                                }}>Hi {user["firstName"]} Welcome To Royal Bus Bookings</div>
                            <div className="row d-flex">
                                <div className="col-md-4"></div>
                                <div className="col-md-4">
                                    <div className="form-control fs-4" style={{ background: "black", boxShadow: "2px 2px 10px black", opacity: "0.9", color: "white" }}>
                                        <div className="form-group" >
                                            <label style={{ display: "block", marginBottom: "10px", marginTop: "5px" }}>From :</label>
                                            <select name="from" style={{ width: "29vw", padding: "5px" }} onChange={(e) => getDestinations(e.target.value)}
                                            >
                                                <option value={0}>{"Select Station"}</option>
                                                {sourceList.map((x, index) => <option key={index} value={x}>{x}</option>)}
                                            </select>
                                        </div>

                                        <div className="form-group" >
                                            <label style={{ display: "block", marginBottom: "10px", marginTop: "5px" }}>To :</label>
                                            <select name="To" style={{ width: "29vw", padding: "5px" }}
                                                onChange={(e) => setDestination(e.target.value)} >
                                                <option value={0}>{"Select Destination"}</option>
                                                {destList.filter((x) => { return x !== source }).map((x, index) => <option key={index} value={x}>{x}</option>)}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label for="dateofJourney" style={{ display: "block", marginBottom: "10px", marginTop: "5px" }}>Date :</label>
                                            <input
                                                type="date"
                                                id="dateOfJourney"
                                                name="dateOfJourney"
                                                style={{ width: "29vw", padding: "5px" }}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                onBlur={validate}
                                                minDate={new Date()}
                                            ></input>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <Link to="/buses">
                                                <button className="btn btn-lg btn-danger my-3" >
                                                    Select Bus
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    );

}

export default SelectBusScreen;
