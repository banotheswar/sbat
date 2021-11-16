import React, { Component } from "react";
import InnerBanner from "./components/common/innerBanner";
class PaymentFail extends Component {
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
            <h2>Transaction Failed!</h2>
            <br />
            <h5>
              Your recent payment transaction of $100 failed. Please try again!
            </h5>
          </div>
        </div>
      </>
    );
  }
}

export default PaymentFail;
