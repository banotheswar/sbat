import React, { Component } from "react";
import InnerBanner from "./components/common/innerBanner";
import SoulMateDiv from "./components/common/soulmateDiv";
class Success extends Component {
  state = {};
  render() {
    return (
      <>
        <InnerBanner />
        <div className="w3l_about">
          <div className="container">
            <h2>You're halfway through!</h2>
            <br />
            <h5>
              We have sent a verification link to your mail. Please click on the
              link in order to complete the registration.
            </h5>
          </div>
        </div>
        <SoulMateDiv />
      </>
    );
  }
}

export default Success;
