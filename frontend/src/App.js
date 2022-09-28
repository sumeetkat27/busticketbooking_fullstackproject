import "./App.css";
import SignInScreen from "./screens/SignInScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import ContactScreen from "./screens/ContactScreen";
import Footer from "./components/Footer";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import AddRouteScreen from "./screens/AddRouteScreen";
import AddBusScreen from "./screens/AddBusScreen";
import AddManagerScreen from "./screens/AddManagerScreen";
import AddAgentScreen from "./screens/AddAgentScreen";
import AddDriverScreen from "./screens/AddDriverScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import RoyalTravelsScreen from "./screens/RoyalTravelsScreen";
import viewProfileScreen from "./screens/ViewProfileScreen";
import PaymentStatusScreen from "./screens/PaymentStatusScreen";
import MakePaymentScreen from "./screens/MakePaymentScreen";
import ManagerHomeScreen from "./screens/ManagerHomeScreen";
import OwnerHomeScreen from "./screens/OwnerHomeScreen";
import ViewBusScreen from "./screens/ViewBusScreen";
import ViewBookingsScreen from "./screens/ViewBookingsScreen";
import ViewBookingsOwner from "./screens/ViewBookingsOwner";
import CheckReservationScreen from "./screens/CheckReservationScreen";
import ChangePasswordScreen from "./screens/ChangePassswordScreen";
import DeleteAccountScreen from "./screens/DeleteAccountScreen";
import BusScheduleScreen from "./screens/BusScheduleScreen";
import viewProfileManager from "./screens/ViewProfileManager";
import EditProfileManager from "./screens/EditProfileManager";
import ViewProfileOwner from "./screens/ViewProfileOwner";
import EditProfileOwner from "./screens/EditProfileOwner";
import UserNavigation from "./components/UserNavigation";
import OwnerNavigation from "./components/OwnerNavigation";
import ManagerNavigation from "./components/ManagerNavigation";
import HomeNavigation from "./components/HomeNavigation";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import SelectBusScreen from "./screens/SelectBusScreen";
import BusListScreen from "./screens/BusListScreen";
import BusLayOutScreen from "./screens/BusLayOutScreen";
import ShowMyBookings from "./screens/ShowMyBookings";
import ViewProfile from "./screens/ViewProfile";
import EditProfile from "./screens/EditProfile";
import ContactUs from "./screens/ContactUs";
import NotFound from "./screens/NotFound";
import ForgotPassword from "./screens/ForgotPassword";
import AddRoute from "./screens/AddRoute";
import AddBus from "./screens/AddBus"
import BookingsManager from './screens/BookingsManager'
import AddHault from "./screens/AddHault";
import ScheduleBus from "./screens/ScheduleBus";
import Ticket from "./screens/Ticket";
import AboutUs from "./screens/AboutUs";


function App() {
  const user = localStorage.getItem("user");
  return (
    <div>
      <Router>
        <div className="">
          <Switch>
            <Route path="/signin" component={SignInScreen} />
            <Route path="/signup" component={SignupScreen} />
            <Route path="/about" component={AboutUs} />
            <Route path="/contact" component={ContactUs} />

            <Route path="/add-route" component={AddRoute} />
            <Route path="/add-bus" component={AddBus} />
            <Route path="/add-manager" component={AddManagerScreen} />
            <Route path="/add-agent" component={AddAgentScreen} />
            <Route path="/add-driver" component={AddDriverScreen} />
            {/* <Route path="/edit-profile" component={EditProfileScreen} /> */}
            <Route path="/edit-profile" component={EditProfile} />
            <Route
              path="/edit-profile-manager"
              component={EditProfile}
            />
            <Route path="/edit-profile-owner" component={EditProfileOwner} />
            <Route path="/royal-travels" component={RoyalTravelsScreen} />
            <Route path="/view-profile" component={ViewProfile} />
            <Route
              path="/view-profile-manager"
              component={ViewProfile}
            />
            <Route path="/view-profile-owner" component={ViewProfileOwner} />
            <Route path="/view-bookings-owner" component={ViewBookingsOwner} />
            <Route path="/make-payment" component={MakePaymentScreen} />
            <Route path="/payment-status" component={PaymentStatusScreen} />
            <Route path="/manager" component={ManagerHomeScreen} />
            <Route path="/owner" component={OwnerHomeScreen} />
            {/* <Route path="/view-bus" component={ViewBusScreen} /> */}
            <Route path="/view-bus" component={SelectBusScreen} />
            <Route path="/buses" component={BusListScreen} />
            <Route path="/layout" component={BusLayOutScreen} />
            <Route path="/view-bookings" component={BookingsManager} />
            <Route path="/change-password" component={ChangePasswordScreen} />
            <Route path="/delete-account" component={DeleteAccountScreen} />
            <Route path="/contactus" component={ContactUs} />
            <Route
              path="/check-reservation"
              component={CheckReservationScreen}
            />
            <Route path="/bus-schedule" component={ScheduleBus} />
            <Route path="/add-hault" component={AddHault} />

            <Route path="/my-bookings" component={ShowMyBookings} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/generateticket" component={Ticket} />
            <Route path="/" component={HomeScreen} />
            <Route path="*" element={<NotFound />} />
          </Switch>
          <ToastContainer />
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
