import React, { Component } from "react";
class Breadcrumbs extends Component {
  state = {};

  subCrumbs() {
    const returnString = [];
    this.props.title.forEach((title, index) => {
      if (
        this.props.href !== undefined &&
        this.props.href[index].includes("/")
      ) {
        returnString.push(
          <React.Fragment>
            <a href={this.props.href[index]}>{title}</a> {">"}
          </React.Fragment>
        );
      } else {
        returnString.push(<span> {title}</span>);
      }
    });
    return returnString;
  }
  render() {
    let homeHref;
    if (sessionStorage.getItem("token")) {
      if (sessionStorage.getItem("status") === "ACTIVE") {
        homeHref = "/dashboard";
      } else {
        homeHref = "/profile";
      }
    } else {
      homeHref = "/";
    }
    return (
      <>
        <div className="w3layouts-breadcrumbs text-center">
          <div className="container">
            <span className="agile-breadcrumbs">
              <a href={homeHref}>Home</a> {">"}
              {this.subCrumbs()}
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default Breadcrumbs;
