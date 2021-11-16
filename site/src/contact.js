import React, { Component } from "react";
import InnerBanner from "./components/common/innerBanner";
import Breadcrumbs from "./components/common/breadcrumbs";
import { message } from "antd";
import ContactService from "./services/ContactService";
import Recaptcha from "react-recaptcha";
import * as constant from ".//constants";
class Contact extends Component {
  constructor() {
    super();
    this.form = React.createRef();
    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
      submitted: false,
      captchaVerified: false,
    };
    this.validate = this.validate.bind(this);
    this.callback = this.callback.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }

  validate() {
    if (this.form.current.reportValidity()) {
      if (this.state.captchaVerified !== true) {
        message.warn("Please make sure captcha has been verified");
        return false;
      }
      this.setState({ submitted: true });
      let data = {
        name: this.state.name,
        email: this.state.email,
        subject: this.state.subject,
        message: this.state.message,
      };
      ContactService.save(data)
        .then(() => {
          this.setState({ submitted: false });
          message.success("Your message has been recorded successfully!");
          this.form.current.reset();
        })
        .catch(() => {
          message.error("Something went wrong! Please try again!");
          this.setState({ submitted: false });
        });
    }
  }

  callback() {
    console.log("Captcha Loaded for Payment");
  }

  // specifying verify callback function
  verifyCallback(response) {
    this.setState({ captchaVerified: true });
  }

  render() {
    return (
      <>
        <InnerBanner />
        <Breadcrumbs title={["Contact Us"]} />
        <section className="privacy_policy_section">
          <div className="privacy_policy">
            <div className="container">
              <div className="row">
                <div className="col-md-8 animated fadeInLeft notransition">
                  <div className="col-md-2"></div>
                  <h1 className="smalltitle">
                    <span>Get in Touch</span>
                  </h1>
                  <br />

                  <form
                    id="ajax-contact-form"
                    ref={this.form}
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <div className="form-group">
                      <label for="personname" className="col-md-8 required">
                        Name
                      </label>
                      <div className="col-md-8">
                        <input
                          required
                          onBlur={(e) =>
                            this.setState({ name: e.target.value })
                          }
                          className="form-control"
                          type="text"
                          name="personname"
                          id="personname"
                          placeholder="Name"
                        />
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label for="personemail" className="col-md-8 required">
                        Email
                      </label>
                      <div className="col-md-8">
                        <input
                          onBlur={(e) =>
                            this.setState({ email: e.target.value })
                          }
                          required
                          className="form-control"
                          type="text"
                          name="personemail"
                          id="personemail"
                          placeholder="E-mail"
                        />
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label for="contactsubject" className="col-md-8 required">
                        Subject
                      </label>
                      <div className="col-md-8">
                        <input
                          onBlur={(e) =>
                            this.setState({ subject: e.target.value })
                          }
                          required
                          className="form-control"
                          type="text"
                          name="contactsubject"
                          id="contactsubject"
                          placeholder="Subject"
                        />
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label for="contactsubject" className="col-md-8 required">
                        Message
                      </label>
                      <div className="col-md-8">
                        <textarea
                          onBlur={(e) =>
                            this.setState({ message: e.target.value })
                          }
                          required
                          className="form-control"
                          id="message"
                          name="message"
                          rows="7"
                          placeholder="Message"
                          style={{ resize: "none" }}
                        />
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <br />
                      <div className="col-md-8">
                        <Recaptcha
                          sitekey={constant.CAPTCHA_SITE_KEY}
                          render="explicit"
                          verifyCallback={this.verifyCallback}
                          onloadCallback={this.callback}
                        />
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <div className="col-md-8">
                        <input
                          type="submit"
                          id="contactsubmit"
                          name="contactsubmit"
                          onClick={this.validate}
                          disabled={this.state.submitted}
                          className="btn btn-primary"
                          value="Send"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-md-4 animated fadeInRight notransition">
                  <h1 className="smalltitle">
                    <span>Contact Us</span>
                  </h1>
                  <br />
                  <h4 className="font100">SBAT Matrimony</h4>
                  <ul className="unstyled wedoit">
                    <li>
                      <h4>USA</h4>
                    </li>
                    <li>
                      <span style={{ marginRight: "5px" }}>
                        <i className="icon-map-marker"></i>
                      </span>
                      8604 Stone House Dr, Ellicott City, MD-21043
                    </li>
                    <li>
                      <span style={{ marginRight: "3px" }}>
                        <i className="icon-phone"></i>
                      </span>{" "}
                      Phone: +1-443-364-8075
                    </li>
                    <li>
                      <span style={{ marginRight: "2px" }}>
                        <i className="icon-envelope"></i>
                      </span>{" "}
                      Email: info@rovarinfotech.com
                    </li>
                  </ul>
                  <div
                    className="br-hr type_short"
                    style={{ margin: "20px 0 20px" }}
                  >
                    <span className="br-hr-h">
                      <i className="icon-gear"></i>
                    </span>
                  </div>
                  {/* <ul className="unstyled wedoit">
                    <li>
                      <h4>Singapore</h4>
                    </li>
                    <li>
                      <span style={{ marginRight: "5px" }}>
                        <i className="icon-map-marker"></i>
                      </span>
                      BLK 60 Dakota Crescent,#09-245, Singapore - 390060
                    </li>
                    <li>
                      <span style={{ marginRight: "3px" }}>
                        <i className="icon-phone"></i>
                      </span>{" "}
                      Phone: +65-6434 4660
                    </li>
                    <li>
                      <span style={{ marginRight: "2px" }}>
                        <i className="icon-envelope"></i>
                      </span>{" "}
                      Email: balaji@rovarinfotech.com
                    </li>
                  </ul>
                  <div
                    className="br-hr type_short"
                    style={{ margin: "20px 0 20px" }}
                  >
                    <span className="br-hr-h">
                      <i className="icon-gear"></i>
                    </span>
                  </div>
                  <ul className="unstyled wedoit">
                    <li>
                      <h4>India – Bangalore</h4>
                    </li>
                    <li>
                      <span style={{ marginRight: "5px" }}>
                        <i className="icon-map-marker"></i>
                      </span>
                      BF-05, Banyan Tree Apartments, 154, Kariammana Agrahara
                      Road, Bellandur, Bangalore 560103
                    </li>
                    <li>
                      <span style={{ marginRight: "3px" }}>
                        <i className="icon-phone"></i>
                      </span>{" "}
                      Phone: +91-804-205-0090
                    </li>
                    <li>
                      <span style={{ marginRight: "2px" }}>
                        <i className="icon-envelope"></i>
                      </span>{" "}
                      Email: info@rovarinfotech.com
                    </li>
                  </ul>
                  <div
                    className="br-hr type_short"
                    style={{ margin: "20px 0 20px" }}
                  >
                    <span className="br-hr-h">
                      <i className="icon-gear"></i>
                    </span>
                  </div>
                  <ul className="unstyled wedoit">
                    <li>
                      <h4>India – Hyderabad</h4>
                    </li>
                    <li>
                      <span style={{ marginRight: "5px" }}>
                        <i className="icon-map-marker"></i>
                      </span>
                      B-308, Lodha Meridian Apartments, Phase-5, KPHB, Hyderabad
                      - 500 075,{" "}
                    </li>
                    <li>
                      <span style={{ marginRight: "3px" }}>
                        <i className="icon-phone"></i>
                      </span>{" "}
                      Phone: +91-955-071-0101
                    </li>
                    <li>
                      <span style={{ marginRight: "2px" }}>
                        <i className="icon-envelope"></i>
                      </span>{" "}
                      Email: info@rovarinfotech.com
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Contact;
