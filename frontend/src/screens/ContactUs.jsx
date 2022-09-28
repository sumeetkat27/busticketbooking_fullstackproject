import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserNavigation from "../components/UserNavigation";
import "../css/ContactUs.css";
import { Icon } from "@fortawesome/fontawesome-svg-core";
import { propTypes } from "react-bootstrap/esm/Image";
import HomeNavigation from "../components/HomeNavigation";

function ContactUs() {

    const [state, setState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",

    });

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const { name, email, subject, message } = state;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !subject || !message) {
            toast.error("Please provide value in each input field");
        } else {

            setState({ name: "", email: "", subject: "", message: "" });
            toast.success("Form Submitted Successfully");
        }
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };


    return (
        <>
            <HomeNavigation />

            <section className="contact-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="wrapper">
                                <div className="row no-gutters">
                                    <div className="col-md-6">
                                        <div className="contact-wrap w-100 p-lg-5 p-4">
                                            <h3 className="mb-4 text-white">Send us a message</h3>
                                            <form
                                                id="contactForm"
                                                className="contactForm"
                                                onSubmit={handleSubmit}
                                            >
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control-contact"
                                                                name="name"
                                                                placeholder="Name"
                                                                onChange={handleInputChange}
                                                                value={name}

                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input
                                                                type="email"
                                                                className="form-control-contact"
                                                                name="email"
                                                                placeholder="Email"
                                                                onChange={handleInputChange}
                                                                value={email}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control-contact"
                                                                name="subject"
                                                                placeholder="Subject"
                                                                onChange={handleInputChange}
                                                                value={subject}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <textarea
                                                                type="text"
                                                                className="form-control-contact"
                                                                name="message"
                                                                placeholder="Message"
                                                                cols="30"
                                                                rows="6"
                                                                onChange={handleInputChange}
                                                                value={message}
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input
                                                                type="submit"
                                                                value="Send Message"
                                                                className="btn1 btn-primary1"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-md-6 d-flex align-items-stretch">
                                        <div className="info-wrap w-100 p-lg-5 p-4 img">
                                            <h3 style={{ borderBottom: " 2px solid #d62196", paddingBottom: "5px" }}>Contact us</h3>
                                            <p className="mb-4">
                                                We're open for any suggestion or just to have a chat
                                            </p>
                                            <div className="dbox w-100 d-flex align-items-start" >

                                                <div className="text pl-3" style={{
                                                    fontFamily: "Poppins",
                                                    fontSize: "20px",
                                                    lineHeight: 1.8, fontWeight: "400", textAlign: "left"
                                                }}>
                                                    <p>
                                                        <span >Address:</span><a target={"_blank"} href="https://www.google.com/maps/dir//iacsd,%20Railway%20Station,%20Akurdi,%20Sector%2029,%20Nigdi,%20Pimpri-Chinchwad,%20Maharashtra%20411044"> Iacsd, Sector 29, Near Akurdi Railway Station, Nigdi, Pradhikaran, Akurdi, Pune, Maharashtra 411044 </a>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="dbox w-100 d-flex align-items-center">

                                                <div className="text pl-3" style={{
                                                    fontFamily: "Poppins",
                                                    fontSize: "20px",
                                                    lineHeight: 1.8, fontWeight: "400", textAlign: "left"
                                                }}>
                                                    <p>

                                                        <span>Phone:</span>
                                                        <a href="tel://123456789">+91 8308853970</a>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="dbox w-100 d-flex align-items-center">

                                                <div className="text pl-3" style={{
                                                    fontFamily: "Poppins",
                                                    fontSize: "20px",
                                                    lineHeight: 1.8, fontWeight: "400", textAlign: "left"
                                                }}>
                                                    <p>
                                                        <span>Email:</span>
                                                        <a href="mailto:royaltravelsbooking@gmail.com">
                                                            royaltravelsbooking@gmail.com
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="dbox w-100 d-flex align-items-center">
                                                <div className="icon d-flex align-items-center justify-content-center">
                                                    <span className="fa fa-globe"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}

export default ContactUs;
