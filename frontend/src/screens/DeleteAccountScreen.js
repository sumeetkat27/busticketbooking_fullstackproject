import React from "react";
import Header from "../components/Header";
import UserApiService from "../Service/UserApiService";

class DeleteAccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.notDeleteUser = this.notDeleteUser.bind(this);
  }
  deleteUser(e) {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    UserApiService.deleteUser(userId).then((res) => {
      this.setState({ message: "User deleted successfully." });
      this.props.history.push("/signup");
    });
  }
  notDeleteUser() {
    this.props.history.push("/view-bus");
  }

  render() {
    return (
      <div>
        <Header title="Delete Account" />
        <form>
          <h2> Are You Sure You want to Delete Your Account</h2>
          <div className="form-group">
            <button className="btn btn-success mb-3" onClick={this.deleteUser}>
              YES
            </button>
          </div>
          <div className="form-group">
            <button
              className="btn btn-danger mb-3"
              onClick={this.notDeleteUser}
            >
              NO
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default DeleteAccountScreen;
