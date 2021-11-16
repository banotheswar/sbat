import React, { Component } from "react";
import UserService from "../services/UserService";
import PasswordStrengthBar from "react-password-strength-bar";
import { message } from "antd";
import * as constant from "../constants";
import Recaptcha from "react-recaptcha";

let captchaRef = React.createRef();
class Signup extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.state = {
      // step 2
      name: "",
      phone: "",
      email: "",
      password: "",
      message: "",
      submitted: "",
      fadeIn: false,
      captchaApproved: false,
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changePhoneHandler = this.changePhoneHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.validate = this.validate.bind(this);
    this.captchaCallback = this.captchaCallback.bind(this);
    this.verifyCaptchaCallback = this.verifyCaptchaCallback.bind(this);
  }

  onCaptchaChange() {
    // captchaRef.current.remove();
    //captchaRef.current.reset();
  }

  captchaCallback() {
    //  captchaRef.current.reset();
    // captchaRef.current.render();
    console.log("Captcha Loaded for Payment");
  }

  // specifying verify callback function
  verifyCaptchaCallback(response) {
    this.setState({ captchaApproved: true });
  }

  validate() {
    if (this.form.current.reportValidity()) {
      if (!this.state.captchaApproved) {
        message.warn("Invalid Captcha");
        return false;
      }
      this.setState({ submitted: true });
      let User = {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        password: this.state.password,
      };
      console.log("User => " + JSON.stringify(User));

      UserService.saveUser(User)
        .then((res) => {
          console.log(res);
          window.location = "/success";
        })
        .catch((code) => {
          this.setState({
            submitted: "",
          });
          message.info("E-mail exists already! Please login instead!");
        });
    }
  }

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changePhoneHandler = (event) => {
    this.setState({ phone: event.target.value });
  };

  changePasswordHandler = (event) => {
    if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        event.target.value
      )
    ) {
      event.target.setCustomValidity("");
    } else {
      event.target.setCustomValidity(
        "Please enter at least 8 characters including upper, lower & special case characters"
      );
    }
    this.setState({ password: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };
  render() {
    var modalEl = document.getElementById("myModal");
    if (modalEl) {
      modalEl.addEventListener("shown.bs.modal", function () {
        this.onCaptchaChange();
      });
      modalEl.addEventListener("hidden.bs.modal", function () {
        this.captchaCallback();
      });
    }
//style={{ position: "relative", left: "-5%" }}
    return (
      <>
        <div
          className="agileits-register"
          onClick={() => this.setState({ fadeIn: false })}
        >
          
          <h3 >Sign-up Now!</h3>
          <form ref={this.form} onSubmit={(e) => e.preventDefault()}>
            <div className="w3_modal_body_grid w3_modal_body_grid1">
              <span>Name:</span>
              <input
                type="text"
                id="name"
                name="name"
                placeholder=" "
                onChange={this.changeNameHandler}
                required
              />
            </div>
            <div className="w3_modal_body_grid w3_modal_body_grid1">
              <span>Phone:</span>
              <input
                required
                id="phone"
                name="phone"
                type="text"
                onChange={this.changePhoneHandler}
              />
            </div>
            <div className="w3_modal_body_grid">
              <span>Email:</span>
              <input
                required
                type="email"
                name="email"
                placeholder=" "
                onChange={this.changeEmailHandler}
              />
            </div>
            <div className="w3_modal_body_grid w3_modal_body_grid1">
              <span>Password:</span>
              <input
                required
                id="password"
                name="password"
                type="password"
                onChange={this.changePasswordHandler}
              />
            </div>
            <div className="w3_modal_body_grid">
              <span></span>
              <PasswordStrengthBar
                minLength={1}
                password={this.state.password}
              />
            </div>

            <div className="w3-agree">
              <input required type="checkbox" id="c1" name="cc" />
              <label className="agileits-agree">
                I have read & agree to the{" "}
                <a href="/terms">Terms and Conditions</a>
              </label>
            </div>
            <div className="form-group signupCaptcha">
              <br />
              <div
                className="col-md-12 text-center"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Recaptcha
                  className="signupCaptcha"
                  ref={(e) => (captchaRef = e)}
                  sitekey={constant.CAPTCHA_SITE_KEY}
                  render="explicit"
                  onChange={this.onCaptchaChange}
                  verifyCallback={this.verifyCaptchaCallback}
                  onloadCallback={this.captchaCallback}
                />
              </div>
              <div className="clearfix"> </div>
            </div>

            <div className="text-center">
              <input
                onClick={this.validate}
                type="submit"
                disabled={this.state.submitted}
                className="btn btn-primary"
                value="Sign up"
              />
            </div>
            <div className="clearfix"></div>
            <p className="w3ls-login">
              Already a member?{" "}
              <a href="#" data-toggle="modal" data-target="#myModal"onClick={this.props.login}>
                Login
              </a>
             
            </p>
          </form>
        </div>
      </>
    );
  }
}
export default Signup;
