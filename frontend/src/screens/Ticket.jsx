import { useState } from "react";
import { useEffect } from "react";
import UserNavigation from "../components/UserNavigation";

const Ticket = (props) => {
    const [user, setUser] = useState();
    const [bookedTicket, setBookedTicket] = useState(JSON.parse(localStorage.getItem("bookedTicket")));

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")))
            if (localStorage.getItem("bookedTicket")) {
                setBookedTicket(JSON.parse(localStorage.getItem("bookedTicket")))
                console.log(JSON.parse(localStorage.getItem("bookedTicket")));
            } else {
                props.history.push("/buses")
            }
        } else {
            props.history.push("/signin")
        }
    }, [])


    return (
        <>
            <UserNavigation />

            <div className="row">
                <div className="col-3 me-5 mt-5" ></div>
                <div className="col-5 mt-4"  >
                    <div className="mx-auto" style={{ border: "2px solid lightblue", borderRadius: "5px", padding: "5%" }}>
                        <h4>Royal Travels Bus Lines</h4>
                        {/* <div className="mt-2" style={{ fontSize: "18px" }}>BOARDING PASS <span style={{ marginLeft: "30%" }}> FIRST CLASS</span> </div>
                        <div className="mt-2">Name <span style={{ marginLeft: "100px" }}> Ticket Type </span> Fare Base Issued by</div>
                        <div>{bookedTicket[0].userId.firstName.toUpperCase() + " " + bookedTicket[0].userId.lastName.toUpperCase()} ONEWAY ADULT ROYAL TRAVELS</div>
                        <div> Date </div>
                        <div>{bookedTicket[0].onBoard + " "}{bookedTicket[0].scheduleId.startDate}</div>
                        <div>To Date</div>
                        <div>{bookedTicket[0].offBoard + " "}{bookedTicket[0].scheduleId.startDate}</div>
                        <div>Seat No</div>
                        <div>{bookedTicket.map(x => x.seatNum + " ")}</div> */}
                        <table className="table borderless mt-4" style={{ fontFamily: "sans-serif", backgroundColor: "lightblue", fontSize: "15px" }}>
                            <thead style={{ textAlign: "center" }}>
                                < td>Name</ td>< td>Ticket Type</ td>< td> Fare Base</ td>< td>Issued by</ td>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>{bookedTicket[0].userId.firstName.toUpperCase() + " " + bookedTicket[0].userId.lastName.toUpperCase()}</th><th>ONEWAY</th><th>ADULT</th><th>ROYAL TRAVELS</th>
                                </tr>

                                <tr>
                                    <td>From</td><td>Date</td>
                                </tr>
                                <tr>
                                    <td>{bookedTicket[0].onBoard + " "}</td><td>{bookedTicket[0].scheduleId.startDate}</td>
                                </tr>
                                <tr>
                                    <td>To</td><td>Date</td>
                                </tr>
                                <tr>
                                    <td>{bookedTicket[0].offBoard + " "}</td><td>{bookedTicket[0].scheduleId.startDate}</td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>Seat No.</td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>{bookedTicket.map(x => x.seatNum + " ")}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{ width: "70px", height: "70px", marginLeft: "80%" }}><img src="http://api.qrserver.com/v1/create-qr-code/?color=000000&amp;bgcolor=FFFFFF&amp;data=royaltravelsbookings%40gmail.com&amp;qzone=1&amp;margin=0&amp;size=400x400&amp;ecc=L" alt="qr code" /></div>
                    </div>
                </div>
                <div className="col-3"></div>
                <div className="col-2"></div>
            </div>

        </>
    );
}

export default Ticket;