import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TokenExpired from "./common/tokenExpired";
import { Steps } from "antd";
import "antd/dist/antd.css";

class Checkout extends Component {
  constructor() {
    super();
    this.submitButton = React.createRef();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    localStorage.setItem("redirectedFromCheckout", true);
    if (this.props.location.state !== undefined) {
      this.submitButton.current.click();
    }
  }

  render() {
    if (this.props.location.state === undefined) {
      return <Redirect to={{ pathname: "/commonLauncher" }} />;
    }

    const { Step } = Steps;
    return (
      <>
        <TokenExpired />
        <section
          className="portfolio section-sm"
          id="portfolio"
          style={{ height: "450px" }}
        >
          <br />
          <div className="w3ls-list">
            <div className="container">
              <Steps size="small" current={2}>
                <Step title="Update Profile" />
                <Step title="Payment Information" />
                <Step title="Complete & Activate" />
              </Steps>
              <br />
              <br />
              <h2>Payment Details</h2>
              <div className="col-md-12 profiles-list-agileits">
                <div class="text-center">
                  <img src="assets/images/loader.gif" />
                  <br />
                  <br />
                  <strong>
                    Please wait while we redirect you to pay $
                    {this.props.location.state.amount}.
                  </strong>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="container-fluid">
              <div className="row ">
                <div className="col-xs-12">
                  <div className="row">
                    <div className="">
                      <div
                        className="title text-center"
                        style={{ display: "none" }}
                      >
                        <h4>Payment Using Bank</h4>
                        <a
                          href="https://smartpay.profitstars.com/express/Hindu%20SPE"
                          className="donate"
                        >
                          <img
                            src="https://rooseveltparkministries.org/wp-content/uploads/2015/02/donate-button.png"
                            style={{ width: "100px" }}
                          />
                        </a>
                        <div className="border"></div>
                        <h4>Payment Using Paypal </h4>
                        <form
                          action="https://www.eProcessingNetwork.com/cgi-bin/dbe/transact.pl"
                          method="POST"
                        >
                          <input
                            type="hidden"
                            name="ePNAccount"
                            value="1119133"
                          />
                          <input
                            type="hidden"
                            name="FirstName"
                            value={this.props.location.state.userName}
                          />
                          <input
                            type="hidden"
                            name="LastName"
                            value={this.props.location.state.userLastName}
                          />
                          <input
                            type="hidden"
                            name="CardNo"
                            value={this.props.location.state.cardNumber}
                          />
                          <input
                            type="hidden"
                            name="ExpMonth"
                            value={this.props.location.state.expireMonth}
                          />
                          <input
                            type="hidden"
                            name="ExpYear"
                            value={this.props.location.state.expireYear}
                          />
                          <input
                            type="hidden"
                            name="Total"
                            value={this.props.location.state.amount}
                          />
                          <input
                            type="hidden"
                            name="Address"
                            value={this.props.location.state.address}
                          />
                          <input
                            type="hidden"
                            name="Zip"
                            value={this.props.location.state.zipCode}
                          />
                          <input
                            type="hidden"
                            name="EMail"
                            value={sessionStorage.getItem("userEmail")}
                          />
                          <input
                            type="hidden"
                            name="ID"
                            value={this.props.location.state.uniqueId}
                          />
                          <input
                            type="hidden"
                            name="ReturnToURL"
                            value={this.props.location.state.ReturnToURL}
                          />
                          <input
                            type="hidden"
                            name="ReturnApprovedURL"
                            value={this.props.location.state.ReturnApprovedURL}
                          />
                          <input
                            type="hidden"
                            name="ReturnDeclinedURL"
                            value={this.props.location.state.ReturnDeclinedURL}
                          />
                          <input
                            type="hidden"
                            name="BackgroundColor"
                            value="FFFFFF"
                          />
                          <input
                            type="hidden"
                            name="TextColor"
                            value="000000"
                          />
                          <input type="hidden" name="redirect" value="1" />
                          <input
                            type="submit"
                            value="submit"
                            ref={this.submitButton}
                          />
                        </form>
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
}

export default Checkout;
