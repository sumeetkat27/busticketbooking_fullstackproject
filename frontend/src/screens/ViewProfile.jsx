import { useState } from "react";
import UserNavigation from "../components/UserNavigation";
import contact from "../assets/contact.jpg";
import moment from "moment";
import { useEffect } from "react";
import UserApiService from "../Service/UserApiService";
import swal from "sweetalert";
import ManagerNavigation from "../components/ManagerNavigation";
import axios from "axios";


const ViewProfile = (props) => {




    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [imgPreview, setImgPreview] = useState();
    const [imgFormData, setImgFormData] = useState(contact);
    console.log(imgFormData);
    const editProfile = () => {
        props.history.push("/edit-profile");
    }

    const upload = (e) => {

        const formData = new FormData();
        formData.append('imgFile', e);

        // setImgPreview(JSON.stringify(e))
        UserApiService.changeProfile(formData, user.id)
            .then((response) => {
                swal("Profile Picture Udated Success", "Profile Picture Udated successfully", "success");
            })
            .catch()
    }





    useEffect(async () => {
        if (JSON.parse(localStorage.getItem("user")) === null) {
            props.history.push("/signin")
        }

        if (user.profile !== null) {
            async function getImage() {
                let imageBlob
                let promise
                try {
                    // imageBlob = (await axios.get(`/patient/${id}/image`, { responseType: 'blob' })).data
                    promise = await UserApiService.getProfile(user.id);
                    imageBlob = promise.data
                    console.log(promise.data)
                } catch (err) {
                    return null
                }

                return URL.createObjectURL(imageBlob)
            }
            async function getImages() {

                setImgFormData(await getImage())

            }

            getImages()

        }
    }, [])

    return (
        <>
            {user === null ?
                props.history.push("/signin") :
                <div>
                    {console.log(user)}
                    {user.role === "ROLE_CUSTOMER" ? <UserNavigation /> : <ManagerNavigation />}
                    <header title="My-Profile" />
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-5">
                            <div className="form-control mt-5 mb-5" style={{ boxShadow: "2px 2px 2px 2px gray" }}>
                                <table className="table table-striped table-hover" style={{ fontSize: "20px", height: "300px" }}>
                                    <thead className="">
                                        <tr>
                                            <th>Fields</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr className="table-secondary">
                                            <td>Name:</td>
                                            <td>{user.firstName + " " + user.lastName}</td>
                                        </tr>
                                        <tr className="table-primary">
                                            <td>Email:</td>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr className="table-danger">
                                            <td>Mobile:</td>
                                            <td>{user.mobile}</td>
                                        </tr>
                                        <tr className="table-warning">
                                            <td>Gender:</td>
                                            <td>{user.gender == "M" ? "Male" : "Female"}</td>
                                        </tr>
                                        <tr className="table-info">
                                            <td>Date of Birth:</td>
                                            <td>{moment(user.dob).format("DD-MM-YYYY")}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <button className="btn btn-success mb-4 text-center" onClick={editProfile}>
                                    Edit Profile
                                </button>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <img style={{ height: "400px", width: "400px", marginTop: "50px", marginLeft: "100px", borderRadius: "50%", boxShadow: "2px 2px 2px 2px gray" }} src={imgFormData} />
                        </div>

                        <form style={{ width: "40%", float: "right", marginLeft: "55%" }}>
                            <div className="form-group preview">

                            </div>

                            <div className="form-group mb-2">

                                <input type="file" className="form-control" onChange={(e) => {
                                    setImgFormData(URL.createObjectURL(e.target.files[0])); upload(e.target.files[0])
                                }} />
                            </div>
                            {/* <button type="button" className="btn btn-success btn-block mt-2" onClick={upload} style={{ marginLeft: "25%" }}>Change Profile Picture</button> */}

                        </form >

                    </div>
                </div>
            }
        </>
    );
}

export default ViewProfile;