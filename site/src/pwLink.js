import React, { Component } from "react";
import InnerBanner from "./components/common/innerBanner";
class PwLink extends Component {
  state = {};
  componentDidMount() {
    localStorage.removeItem("redirectedFromCheckout");
    if (sessionStorage.getItem("token")) {
      sessionStorage.clear();
      window.location.reload();
    }
  }
  render() {
    return (
      <>
        <InnerBanner />
        <div className="w3l_about">
          <div className="container">
            <h2>Password Link Sent!</h2>
            <br />
            <h5>
              We've sent a link to your mail to reset the password. Please
              check!
            </h5>
          </div>
        </div>
      </>
    );
  }
}

export default PwLink;
