import React, { useState } from "react";
import Header from "./components/common/header";
import Footer from "./components/common/footer";
import Home from "./home";
import Success from "./success";
import PaymentSuccess from "./paymentSuccess";
import PaymentFail from "./paymentFail";
import CommonLauncher from "./commonLauncher";
import Contact from "./contact";
import Profile from "./profile";
import ProfileEdit from "./profileEdit";
import LoginVerified from "./loginVerified";
import PrivacyPolicy from "./privacyPolicy";
import Payment from "./payment";
import Terms from "./terms";
import { Route } from "react-router-dom";
import Checkout from "./components/checkout";
import PwLink from "./pwLink";
import "antd/dist/antd.css";

 import Dashboard from "./dashboard"
import Login from "../src/components/login";
import Signup from "./components/signup";
import Login1 from "./components/common/Login";
import Auth from "./components/common/Auth";
// import Dashboard from "./dashboard_back";



function App() {
  


  return (
    <>
   
  
      <Header />
      <Route exact path="/" render={(props) => <Home {...props} />} />
     
      <Route exact path="/success" component={Success} />
      <Route exact path="/paymentSuccess" component={PaymentSuccess} />
      <Route exact path="/paymentFail" component={PaymentFail} />
      <Route exact path="/paymentFail" component={PaymentFail} />
      <Route exact path="/pwLink" component={PwLink} />
      <Route exact path="/contact" component={Contact} />
      <Route
        exact
        path="/commonLauncher"
        render={(props) => <CommonLauncher {...props} />}
      />
      <Route
        exact
        path="/profile/:profileNumber?"
        render={(props) => <Profile {...props} />}
      />
      <Route exact path="/profileEdit" component={ProfileEdit} />
      <Route exact path="/payment" render={(props) => <Payment {...props} />} />
      <Route
        exact
        path="/checkout"
        render={(props) => <Checkout {...props} />}
      />
      <Route exact path="/loginVerified" component={LoginVerified} />
      <Route exact path="/privacyPolicy" component={PrivacyPolicy} />
      
      <Route exact path="/terms" component={Terms} />
     
     
      
      <Route exact path="/dashboard" component={Dashboard}></Route>
      {/* <Route exact path="/dashboard" component={Dashboard}></Route> */}
     
       <Footer  className=""/>  
    </>
  );
}

export default App;
