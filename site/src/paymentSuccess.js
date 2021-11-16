import React, { Component } from "react";
import InnerBanner from "./components/common/innerBanner";
import Login from "./components/login";
import SoulMateDiv from "./components/common/soulmateDiv";
class PaymentSuccess extends Component {
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
            <h2>Payment Success!</h2>
            <br />
            <h5>
              Thanks for completing the payment transaction. You can now enjoy
              the subscription for the next one year! Please{" "}
              <a href="#" data-toggle="modal" data-target="#myModal">
                login.
              </a>
            </h5>
          </div>
        </div>
        <Login />
        <SoulMateDiv />
      </>
    );
  }
}

export default PaymentSuccess;
