import React, { Component } from "react";
import Login from "./components/login";
import InnerBanner from "./components/common/innerBanner";
import SoulMateDiv from "./components/common/soulmateDiv";
class LoginVerified extends Component {
  state = {};
  render() {
    return (
      <>
        <InnerBanner />
        <div className="w3l_about">
          <div className="container">
            <h2>Sign-up Success!</h2>
            <br />
            <h5>You're all set!</h5>
            <p className="w3ls-login pull-left">
              Please{" "}
              <a href="#" data-toggle="modal" data-target="#myModal">
                Login
              </a>{" "}
              Now!
            </p>
          </div>
        </div>
        <Login />
        <SoulMateDiv />
      </>
    );
  }
}

export default LoginVerified;
