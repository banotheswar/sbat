import React, { Component } from "react";
import InnerBanner from "./components/common/innerBanner";
import SoulMateDiv from "./components/common/soulmateDiv";
class CommonLauncher extends Component {
  state = {};
  render() {
    let incomingState = this.props.location.state;
    const header =
      incomingState === undefined ? "404 Error" : incomingState.header;
    const message =
      incomingState === undefined
        ? "Oops! Seems like you've landed on a wrong page!"
        : incomingState.header;

    return (
      <>
        <InnerBanner />
        <div className="w3l_about">
          <div className="container">
            <h2>{header}</h2>
            <br />
            <h5>{message}</h5>
          </div>
        </div>
        <SoulMateDiv />
      </>
    );
  }
}

export default CommonLauncher;
