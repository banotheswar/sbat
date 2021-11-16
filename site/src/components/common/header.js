import React, { Component } from "react";
import TokenExpired from "./tokenExpired";
import "antd/dist/antd.css";

import { notification } from "antd";
import { pop } from "./Notification";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

class Header extends Component {
  constructor(props) {
    super();
    this.state = {
      logout: false,
    };
    this.logoutClick = this.logoutClick.bind(this);
  }

  logoutClick() {
    sessionStorage.clear();
    localStorage.clear();
    this.setState({ logout: true });
    const style={fontSize:"150%",width:"150%", padding:"5%",marginTop:"90%"}

    toast("you have successfully log out!",{type:"success",position:"top-center",theme:"colored",style})

    
    
  }

  render() {
    let homePageHref = "/";
    if (sessionStorage.getItem("status") === "ACTIVE") {
      homePageHref = "/dashboard";
    } else if (sessionStorage.getItem("token") !== null) {
      homePageHref = "/profile";
    }

    return (
      <header>
          <ToastContainer/>
        {this.state.logout ? (
          
           <TokenExpired />
          
        ) : (
          <></>
        )}
        <div
          className="navbar"
          style={{
            background: "#e2e9ef",
            paddingBottom: "6px",
            paddingTop: "6px",
          }}
        >
          <div className="navbar-inner">
            <div className="container">
              <a className="brand" href="https://sbatsevas.org/">
                <img
                  src="/./assets/images/logo (1).png"
                  alt=""
                  width="200"
                  height="60"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="navbar navbar-inverse-blue navbar">
          <div className="navbar-inner">
            <div className="container">
              <div className="pull-right">
                <nav className="navbar nav_bottom" role="navigation">
                  <div className="navbar-header nav_2">
                    <button
                      type="button"
                      className="navbar-toggle collapsed navbar-toggle1"
                      data-toggle="collapse"
                      data-target="#bs-megadropdown-tabs"
                    >
                      Menu
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                  </div>
                  <div
                    className="collapse navbar-collapse"
                    id="bs-megadropdown-tabs"
                  >
                    <ul className="nav navbar-nav nav_1">
                      <li>
                        <a
                          href={homePageHref}
                          style={{ color: "white", fontSize: "larger" }}
                        >
                          HOME
                        </a>
                      </li>
                      {sessionStorage.getItem("status") == "ACTIVE" ? (
                        <li>
                          <a
                            href="/profile"
                            style={{ color: "white", fontSize: "larger" }}
                          >
                            MY PROFILE
                          </a>
                        </li>
                      ) : (
                        <></>
                      )}
                      {sessionStorage.getItem("token") != null ? (
                        <></>
                      ) : (
                        <>
                          <li className="last">
                            <a
                              href="contact"
                              style={{ color: "white", fontSize: "larger" }}
                            >
                              CONTACT
                            </a>
                          </li>
                        </>
                      )}

                      {sessionStorage.getItem("token") && (
                        <li
                          style={{
                            display:
                              sessionStorage.getItem("token") !== null
                                ? "block"
                                : "none",
                          }}
                          className="last"
                        >
                          <a
                            onClick={this.logoutClick}
                            style={{ color: "white", fontSize: "large" }}
                          >
                            LOGOUT
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="clearfix"> </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default Header;
