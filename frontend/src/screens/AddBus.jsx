import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ManagerNavigation from '../components/ManagerNavigation';
import BusApiService from "../Service/BusApiService";
import Header from '../components/Header';
import { Button, Input, InputNumber, Select } from "antd";
import { Option } from 'antd/lib/mentions';
import swal from 'sweetalert';
import AddBusBg1 from '../assets/AddBusBg1.jpg'

const AddBus = (props) => {

    useEffect(() => {
        if (user === null || user.role !== "ROLE_MANAGER") {
            props.history.push("/signin");
        } else {

        }
    }, []);

    const [busName, setBusName] = useState();
    const [busNo, setBusNo] = useState();
    const [type, setType] = useState();
    const [acType, setAcType] = useState();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [seatCapacity, setSeatCapacity] = useState(0);
    const [searchBus, setSearchBus] = useState();
    const [busDetails, setBusDetails] = useState();

    const myStyle = {
        backgroundImage:
            `url(${AddBusBg1})`,
        height: '100vh',
        marginTop: '-20px',
        fontSize: '50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };

    const saveBus = () => {
        console.log(busName)
        console.log(type)
        console.log(acType)
        if (busName === undefined || type === undefined || acType === undefined) {

            toast.warning("All Fields Are Manadatory")
            return;
        }

        var body = {
            busName,
            busNo,
            type,
            acType,
            seatCapacity
        }
        BusApiService.addBus(body)
            .then(response => { toast.success("Bus Added Successfully") })
            .catch(error => { toast.error("Could Not Add Bus, as Bus Number is Already Assigned"); })
    }

    const getBusDetails = () => {
        BusApiService.findByBusNo(searchBus)
            .then(response => setBusDetails(response.data))
            .catch(err => toast.error("No Bus Found with this Number"))
    }



    return (
        <>
            <ManagerNavigation />
            <ToastContainer position='top-right' />
            <div className='container' style={myStyle}>

                <div className='row'>
                    <div className="col-5" style={{ fontSize: "18px" }}>

                        <div class="container-grid">
                            <label>Bus No :</label>
                            <Input
                                type="number"
                                name="BusNo"
                                min={1}
                                onChange={(e) => { setBusNo(e.target.value) }}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <label>Bus Name :</label>
                            <Input
                                type="text"
                                name="BusName"

                                onChange={(e) => { setBusName(e.target.value) }}
                            />
                        </div>
                        <div className="custom-select custom-select-lg mb-3">
                            <label>Bus Type :</label>
                            <div>
                                <select style={{ width: "40%" }} className="form-group " placeholder="select Type" onChange={(e) => { setType(e.target.value) }}>
                                    <option  >---Select One---</option>
                                    <option value="SLEEPER" >Sleeper</option>
                                    <option value="SEATING" >Seater</option>
                                    <option value="MIXED" >Mixed</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-2">
                            <label>Select AC/Non_AC :</label>
                            <div>
                                <select style={{ width: "40%" }} className="form-group " placeholder="select Type"
                                    onChange={(e) => setAcType(e.target.value)}>
                                    <option  >---Select One---</option>
                                    <option value="AC" >AC</option>
                                    <option value="NON_AC" >Non-AC</option>
                                </select>
                            </div>
                        </div>
                        <div class="container-grid mb-3">
                            <label>Total Seat Capacity :</label>
                            <Input
                                type="number"
                                name="Totalseats"
                                min={1}
                                onChange={(e) => { setSeatCapacity(e.target.value) }}
                            />
                        </div>

                        <button
                            className="btn btn-success me-2 mb-3 "
                            onClick={saveBus}
                        >
                            Add Bus
                        </button>

                    </div>
                    <div className='col-1'></div>
                    <div className='col-5'>
                        <div >
                            <Input type="number" className="mb-2 mt-4" style={{ height: "37px" }} min={1}
                                placeholder="Enter Bus No" onChange={(e) => setSearchBus(e.target.value)}
                            />
                            <button className='btn btn-info mt-1 mb-3' style={{ float: "right" }} onClick={getBusDetails}>Search</button>
                        </div>
                        {busDetails && <div >
                            <table className="table table-light table-hover" style={{ fontSize: "12px" }}>
                                <thead style={{ position: "sticky", top: 0, textAlign: "center" }} class="thead-dark" >
                                    <tr>
                                        <th class="header" scope="col">Bus No</th>
                                        <th class="header" scope="col" >Bus Name</th>
                                        <th class="header" scope="col">Type</th>
                                        <th class="header" scope="col">Ac/Non_AC</th>
                                        <th class="header" scope="col">Seat Capacity</th>
                                    </tr>
                                </thead>
                                <tbody style={{ textAlign: "center", verticalAlign: "middle", fontSize: "14px" }}>
                                    <tr>
                                        <td>{busDetails.busNo}</td>
                                        <td>{busDetails.busName}</td>
                                        <td>{busDetails.type}</td>
                                        <td>{busDetails.acType}</td>
                                        <td>{busDetails.seatCapacity}</td>
                                    </tr>
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

export default AddBus;