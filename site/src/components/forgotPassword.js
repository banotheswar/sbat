import React, { Component } from "react";
import LoginService from "../services/LoginService";
import Fade from "react-reveal/Fade";

class ForgotPassword extends Component {
  constructor() {
    super();
    this.form = React.createRef();
    this.state = {
      email: "",
      password: "",
      message: "",
      submitted: "",
      fadeIn: false,
    };
    this.onChange = this.onChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  validate() {
    if (this.form.current.reportValidity()) {
      this.setState({ submitted: true });
      LoginService.forgotPassword(this.email)
        .then((result) => {
          window.location = "/pwLink";
        })
        .catch((code) => {
          this.setState({ fadeIn: true, message: "failed", submitted: "" });
        });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <>
        <div
          id="passwordModal"
          className="modal fade"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
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
                <h4 className="modal-title">Forgot Password</h4>
              </div>
              <div className="modal-body">
                <div className="login-w3ls">
                  <form
                    id="forgotPassword"
                    ref={this.form}
                    onSubmit={(e) => e.preventDefault()}
                  >
                    {" "}
                    <label>Enter your E-Mail</label>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      autoComplete="off"
                      onChange={(e) => (this.email = e.target.value)}
                    />
                    <div className="clearfix"> </div>
                    <br />
                    <div className="row">
                      <div className="col-md-3">{""}</div>
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
                              Invalid E-Mail
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
                        value="Submit"
                      />
                    </div>
                    <div className="clearfix"> </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default ForgotPassword;
