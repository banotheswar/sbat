
import React, { Component } from "react";
import LoginService from "../../../src/services/LoginService";
import Fade from "react-reveal/Fade";
import ForgotPassword from "../forgotPassword";
import Recaptcha from "react-recaptcha";
import * as constant from "../../constants";

class Login1 extends Component{
    constructor() {
        super();
        this.form = React.createRef();
        this.recaptchaRef = React.createRef();
        this.state = {
          email: "",
          password: "",
          message: "",
          submitted: "",
          fadeIn: false,
          captchaVerified: true,
        };
        this.onChange = this.onChange.bind(this);
        this.validate = this.validate.bind(this);
        this.callback = this.callback.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
      }
    
      validate() {
        if (this.form.current.reportValidity()) {
          this.setState({ submitted: true });
          let loginData = {
            email: this.email,
            password: this.password,
          };
    
          LoginService.login(loginData)
            .then((result) => {
              if (!this.state.captchaVerified) {
                this.setState({
                  fadeIn: true,
                  message: "captcha",
                  submitted: "",
                });
                return;
              }
              if (result.data.user.status === "INACTIVE") {
                this.setState({
                  fadeIn: true,
                  message: "inactive",
                  submitted: "",
                });
                return;
              }
    
              localStorage.clear();
              sessionStorage.clear();
              sessionStorage.setItem("userName", result.data.user.name);
              sessionStorage.setItem("userEmail", result.data.user.email);
              sessionStorage.setItem("userPhone", result.data.user.phone);
              sessionStorage.setItem("userId", result.data.user.id);
              sessionStorage.setItem(
                "userProfileNumber",
                result.data.user.profileNumber
              );
              sessionStorage.setItem("token", result.data.token);
              sessionStorage.setItem("status", result.data.user.profileStatus);
              localStorage.setItem("desiredHeight", result.data.user.desiredHeight);
              localStorage.setItem(
                "desiredAgeGroup",
                result.data.user.desiredAgeGroup
              );
              localStorage.setItem(
                "desiredMaritalStatus",
                result.data.user.desiredMaritalStatus
              );
              localStorage.setItem("desiredCaste", result.data.user.desiredCaste);
              localStorage.setItem("desiredGotra", result.data.user.desiredGotra);
              localStorage.setItem("profileGender", result.data.user.profileGender);
              if (sessionStorage.getItem("status") === "ACTIVE") {
                window.location = "/dashboard";
              } else {
                window.location = "/profile";
              }
            })
            .catch((code) => {
              this.setState({ fadeIn: true, message: "failed", submitted: "" });
            });
        }
      }
    
      callback() {
        // this.recaptchaRef.current.reset();
        //this.recaptchaRef.current.render();
        console.log("Captcha Loaded for Payment");
      }
    
      // specifying verify callback function
      verifyCallback(response) {
        this.setState({ captchaVerified: true });
      }
    
      onRecaptchaChange() {
        // this.recaptchaRef.current.remove();
        // this.recaptchaRef.current.reset();
      }
    
      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    render(){
        var el = document.getElementById("myModal");
    if (el) {
      el.addEventListener("shown.bs.modal", function () {
        this.callback();
      });
      el.addEventListener("hidden.bs.modal", function () {
        this.onRecaptchaChange();
      });
    }
        return(
            <>
        
        
                <div className="">
        <div
        //   id="myModal"
        //   className="modal fade"
        //   tabIndex="-1"
        //   role="dialog"
        //   aria-hidden="true"
        >
          <div
            className="modal-dialog"
            onClick={() => this.setState({ fadeIn: false })}
          >
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">Login to Continue</h4>
              </div>
              <div className="modal-body">
                <div className="login-w3ls">
                  <form
                    id="signin"
                    ref={this.form}
                     onSubmit={(e) => e.preventDefault()}
                  >
                    {" "}
                    <label>E-Mail</label>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      autoComplete="off"
                     onChange={(e) => (this.email = e.target.value)}
                    />
                    <label>Password</label>
                    <input
                      className="form-control"
                      required
                      type="password"
                      name="password"
                      placeholder="Password"
                      autoComplete="off"
                     onChange={(e) => (this.password = e.target.value)}
                    />
                    <div className="form-group loginCaptcha">
                      <br />
                      <div
                        className="col-md-12 text-center"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {/* <Recaptcha
                          className="loginCaptcha"
                          ref={(e) => (this.recaptchaRef = e)}
                          onChange={this.onRecaptchaChange}
                          sitekey={constant.CAPTCHA_SITE_KEY}
                          render="explicit"
                          verifyCallback={this.verifyCallback}
                          onloadCallback={this.callback}
                        /> */}
                        
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="w3ls-loginr">
                     <div style={{display:"none"}}>
                     <input
                        type="checkbox"
                        id="brand"
                        name="checkbox"
                        value=""
                      />
                      <span> Remember me ?</span>
                     </div>
                      <a style={{marginBottom:"20px"}}
                        href="#"
                        data-toggle="modal"
                        data-dismiss="modal"
                        data-target="#passwordModal"
                      >
                        Forgot password ?
                      </a>
                    </div>
                    <div className="clearfix"> </div>
                    <div className="row">
                      <div className="col-md-3" style={{ opacity: "1" }}>
                        {""}
                      </div>
                      <Fade when={this.state.fadeIn}>
                        {
                          //Check if message failed
                          this.state.message === "failed" ? (
                            <div
                              className="col-md-8 text-justify text-primary"
                              style={{
                                marginLeft: "8%",
                                marginTop: "-4%",
                                paddingBottom: "6px",
                              }}
                            >
                              Invalid Credentials
                            </div>
                          ) : this.state.message === "inactive" ? (
                            <div
                              className="col-md-8 text-justify text-primary"
                              style={{
                                marginLeft: "7%",
                                marginTop: "-4%",
                                paddingBottom: "6px",
                              }}
                            >
                              Account Not Activated
                            </div>
                          ) : this.state.message === "captcha" ? (
                            <div
                              className="col-md-8 text-justify text-primary"
                              style={{
                                marginLeft: "7%",
                                marginTop: "-4%",
                                paddingBottom: "6px",
                              }}
                            >
                              Invalid Captcha
                            </div>
                          ) : (
                            <div className="col-md-8"></div>
                          )
                        }
                      </Fade>
                    </div>
                    <div>
                      <input
                        onClick={this.validate}
                        type="submit"
                        disabled={this.state.submitted}
                        className="btn btn-primary"
                        name="submit"
                        value="Login"
                      />
                    </div>
                    <div className="clearfix"> </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
         <ForgotPassword />
        </div>
            </>
        )
    }
}
export default Login1