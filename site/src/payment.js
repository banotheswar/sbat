import React, { Component } from "react";
import InnerBanner from "./components/common/innerBanner";
import Breadcrumbs from "./components/common/breadcrumbs";
import { Redirect } from "react-router-dom";
import TokenExpired from "./components/common/tokenExpired";
import PaymentService from "./services/PaymentService";
import * as constant from ".//constants";
import { Checkbox, Layout, message, Select, Steps } from "antd";
import "antd/dist/antd.css";
import Recaptcha from "react-recaptcha";
import { Content } from "antd/lib/layout/layout";

class Payment extends Component {
  constructor() {
    super();
    this.form = React.createRef();
    this.state = {
      userName: "",
      userLastName: "",
      userEmail: "",
      userPhone: "",
      address: "",
      statee: "",
      city: "",
      zipCode: "",
      cardNumber: "",
      expireMonth: "",
      expireYear: "",
      submitted: "",
      redirect: null,
      uniqueId: "",
      amount: "100",
      captchaVerified: false,
      agreementCheck: false,
    };
    // this.onChange = this.onChange.bind(this);
    this.validate = this.validate.bind(this);
    this.callback = this.callback.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (localStorage.getItem("redirectedFromCheckout")) {
      sessionStorage.removeItem("token");
      localStorage.setItem("transactionExpired", true);
      window.location.pathname = "/";
    }
  }

  callback() {
    console.log("Captcha Loaded for Payment");
  }

  // specifying verify callback function
  verifyCallback(response) {
    this.setState({ captchaVerified: true });
  }

  validate() {
    if (this.form.current.reportValidity()) {
      if (this.state.expireMonth === "") {
        message.warn("Please add Expiry Month");
        return false;
      }
      if (this.state.expireYear === "") {
        message.warn("Please add Expiry Year");
        return false;
      }
      if (this.state.agreementCheck === false) {
        message.warn("Please accept Terms & Conditions");
        return false;
      }
      if (this.state.captchaVerified !== true) {
        message.warn("Please make sure captcha has been verified");
        return false;
      }
      this.setState({ submitted: true });
      let paymentData = {
        city: this.state.city,
        statee: this.state.statee,
        address: this.state.address,
        zipCode: this.state.zipCode,
        cardNumber: this.state.cardNumber,
        expireMonth: this.state.expireMonth,
        expireYear: this.state.expireYear,
        amount: "100",
        userId: sessionStorage.getItem("userId"),
      };
      PaymentService.makePayment(paymentData)
        .then((result) => {
          console.log(result);
          this.setState({
            uniqueId: result.data.payment.uniqueId,
            redirect: "/checkout",
          });
        })
        .catch((error) => {
          this.setState({ submitted: "" });
        });
    }
  }

  onChange(e) {
    console.log({ [e.target.name]: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { Option } = Select;
    const { Step } = Steps;
    if (this.props.location.state === undefined) {
      return <Redirect to={{ pathname: "/commonLauncher" }} />;
    }
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: {
              userName: sessionStorage.getItem("userName").split(" ", 2)[0],
              userLastName: sessionStorage.getItem("userName").split(" ", 2)[1],
              userEmail: sessionStorage.getItem("userEmail"),
              userPhone: sessionStorage.getItem("userPhone"),
              address: this.state.address,
              statee: this.state.statee,
              city: this.state.city,
              zipCode: this.state.zipCode,
              cardNumber: this.state.cardNumber,
              expireMonth: this.state.expireMonth,
              expireYear: this.state.expireYear,
              uniqueId: this.state.uniqueId,
              amount: this.state.amount,
              ReturnToURL: constant.CHECKOUT_DECLINED_URL + this.state.uniqueId,
              ReturnApprovedURL:
                constant.CHECKOUT_APPROVED_URL + this.state.uniqueId,
              ReturnDeclinedURL:
                constant.CHECKOUT_DECLINED_URL + this.state.uniqueId,
            },
          }}
        />
      );
    }
    return (
      <>
        <TokenExpired />
        <InnerBanner />
        <Breadcrumbs
          title={["Edit Profile", "Payment"]}
          href={["/profileEdit", ""]}
        />
        <div className="w3ls-list">
          <div className="container">
            <Steps size="small" current={1}>
              <Step title="Update Profile" />
              <Step title="Payment Information" />
              <Step title="Complete & Activate" />
            </Steps>
            <br />
            <br />
            <h2>Payment Details</h2>
            <div className="col-md-12 profiles-list-agileits">
              <div className="profile_w3layouts_details">
                <form
                  id="apptSlotForm"
                  ref={this.form}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="agileits_aboutme">
                    <div className="form-group">
                      <h5>Brief Details:</h5>
                      <label className="col-sm-3 control-label1">
                        Full Name:
                      </label>
                      <div className="col-md-9">
                        <div className="col-md-5">
                          <input
                            disabled
                            type="text"
                            id="userName"
                            name="userName"
                            value={
                              sessionStorage
                                .getItem("userName")
                                .split(" ", 2)[0]
                            }
                            className="form-control"
                            placeholder="First Name"
                          ></input>
                        </div>
                        <div className="col-md-5">
                          <input
                            disabled
                            type="text"
                            value={
                              sessionStorage
                                .getItem("userName")
                                .split(" ", 2)[1]
                            }
                            id="userLastName"
                            name="userLastName"
                            className="form-control"
                            placeholder="Last Name"
                          ></input>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1">E-Mail:</label>
                      <div className="col-md-9">
                        <div className="col-md-10">
                          <input
                            disabled
                            type="email"
                            id="userEmail"
                            name="userEmail"
                            value={sessionStorage.getItem("userEmail")}
                            className="form-control"
                            placeholder="E-Mail"
                          ></input>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1">
                        Phone Number:
                      </label>
                      <div className="col-md-9">
                        <div className="col-md-5">
                          <input
                            disabled
                            type="text"
                            className="form-control"
                            placeholder="Phone Number"
                            id="userPhone"
                            name="userPhone"
                            value={sessionStorage.getItem("userPhone")}
                          ></input>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <h5>Address Details:</h5>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1">
                        Address :
                      </label>
                      <div className="col-md-9">
                        <div className="col-md-10">
                          <input
                            onBlur={(e) =>
                              this.setState({ address: e.target.value })
                            }
                            required
                            type="text"
                            name="address"
                            className="form-control"
                            placeholder="Address"
                          ></input>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1">City :</label>
                      <div className="col-md-9">
                        <div className="col-md-6">
                          <input
                            onBlur={(e) =>
                              this.setState({ city: e.target.value })
                            }
                            // defaultValue={this.props.location.state.city}
                            required
                            type="text"
                            className="form-control"
                            placeholder="City"
                            id="city"
                            name="city"
                          ></input>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1">State :</label>
                      <div className="col-md-9">
                        {/* <div className="col-md-6">
                          <Select
                            onChange={(e) => this.setState({ statee: e})}
                            required
                            className="form-control"
                            value={this.props.location.state.statee}
                            id="state"
                            name="state"
                          >
                            <Option value="AL">Alabama</Option>
                            <Option value="AK">Alaska</Option>
                            <Option value="AZ">Arizona</Option>
                            <Option value="AR">Arkansas</Option>
                            <Option value="CA">California</Option>
                            <Option value="CO">Colorado</Option>
                            <Option value="CT">Connecticut</Option>
                            <Option value="DE">Delaware</Option>
                            <Option value="DC">District Of Columbia</Option>
                            <Option value="FL">Florida</Option>
                            <Option value="GA">Georgia</Option>
                            <Option value="HI">Hawaii</Option>
                            <Option value="ID">Idaho</Option>
                            <Option value="IL">Illinois</Option>
                            <Option value="IN">Indiana</Option>
                            <Option value="IA">Iowa</Option>
                            <Option value="KS">Kansas</Option>
                            <Option value="KY">Kentucky</Option>
                            <Option value="LA">Louisiana</Option>
                            <Option value="ME">Maine</Option>
                            <Option value="MD">Maryland</Option>
                            <Option value="MA">Massachusetts</Option>
                            <Option value="MI">Michigan</Option>
                            <Option value="MN">Minnesota</Option>
                            <Option value="MS">Mississippi</Option>
                            <Option value="MO">Missouri</Option>
                            <Option value="MT">Montana</Option>
                            <Option value="NE">Nebraska</Option>
                            <Option value="NV">Nevada</Option>
                            <Option value="NH">New Hampshire</Option>
                            <Option value="NJ">New Jersey</Option>
                            <Option value="NM">New Mexico</Option>
                            <Option value="NY">New York</Option>
                            <Option value="NC">North Carolina</Option>
                            <Option value="ND">North Dakota</Option>
                            <Option value="OH">Ohio</Option>
                            <Option value="OK">Oklahoma</Option>
                            <Option value="OR">Oregon</Option>
                            <Option value="PA">Pennsylvania</Option>
                            <Option value="RI">Rhode Island</Option>
                            <Option value="SC">South Carolina</Option>
                            <Option value="SD">South Dakota</Option>
                            <Option value="TN">Tennessee</Option>
                            <Option value="TX">Texas</Option>
                            <Option value="UT">Utah</Option>
                            <Option value="VT">Vermont</Option>
                            <Option value="VA">Virginia</Option>
                            <Option value="WA">Washington</Option>
                            <Option value="WV">West Virginia</Option>
                            <Option value="WI">Wisconsin</Option>
                            <Option value="WY">Wyoming</Option>
                          </Select>
                        </div> */}
                         <div className="col-md-5">
                          <Select
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                            onChange={(e) => this.setState({ statee: e })}
                            required
                            className="form-control"
                            value={this.state.statee}
                            id="state"
                          >
                            <Option value="AL">Alabama</Option>
                            <Option value="AK">Alaska</Option>
                            <Option value="AZ">Arizona</Option>
                            <Option value="AR">Arkansas</Option>
                            <Option value="CA">California</Option>
                            <Option value="CO">Colorado</Option>
                            <Option value="CT">Connecticut</Option>
                            <Option value="DE">Delaware</Option>
                            <Option value="DC">District Of Columbia</Option>
                            <Option value="FL">Florida</Option>
                            <Option value="GA">Georgia</Option>
                            <Option value="HI">Hawaii</Option>
                            <Option value="ID">Idaho</Option>
                            <Option value="IL">Illinois</Option>
                            <Option value="IN">Indiana</Option>
                            <Option value="IA">Iowa</Option>
                            <Option value="KS">Kansas</Option>
                            <Option value="KY">Kentucky</Option>
                            <Option value="LA">Louisiana</Option>
                            <Option value="ME">Maine</Option>
                            <Option value="MD">Maryland</Option>
                            <Option value="MA">Massachusetts</Option>
                            <Option value="MI">Michigan</Option>
                            <Option value="MN">Minnesota</Option>
                            <Option value="MS">Mississippi</Option>
                            <Option value="MO">Missouri</Option>
                            <Option value="MT">Montana</Option>
                            <Option value="NE">Nebraska</Option>
                            <Option value="NV">Nevada</Option>
                            <Option value="NH">New Hampshire</Option>
                            <Option value="NJ">New Jersey</Option>
                            <Option value="NM">New Mexico</Option>
                            <Option value="NY">New York</Option>
                            <Option value="NC">North Carolina</Option>
                            <Option value="ND">North Dakota</Option>
                            <Option value="OH">Ohio</Option>
                            <Option value="OK">Oklahoma</Option>
                            <Option value="OR">Oregon</Option>
                            <Option value="PA">Pennsylvania</Option>
                            <Option value="RI">Rhode Island</Option>
                            <Option value="SC">South Carolina</Option>
                            <Option value="SD">South Dakota</Option>
                            <Option value="TN">Tennessee</Option>
                            <Option value="TX">Texas</Option>
                            <Option value="UT">Utah</Option>
                            <Option value="VT">Vermont</Option>
                            <Option value="VA">Virginia</Option>
                            <Option value="WA">Washington</Option>
                            <Option value="WV">West Virginia</Option>
                            <Option value="WI">Wisconsin</Option>
                            <Option value="WY">Wyoming</Option>
                          </Select>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1 required">
                        Family Values :{" "}
                      </label>
                      <div className="col-md-9">
                        <div className="col-md-5">
                          <Select
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                            onChange={(e) => this.setState({ familyValues: e })}
                            required
                            className="form-control"
                            value={this.state.familyValues}
                            id="familyValues"
                          >
                            <Option value="Orthodox">Orthodox</Option>
                            <Option value="Conservative">Conservative</Option>
                            <Option value="Moderate">Moderate</Option>
                            <Option value="Liberal">Liberal</Option>
                          </Select>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1">
                        Zip Code :
                      </label>
                      <div className="col-md-9">
                        <div className="col-md-6">
                          <input
                            onBlur={(e) =>
                              this.setState({ zipCode: e.target.value })
                            }
                            required
                            type="text"
                            className="form-control"
                            placeholder="Zip Code"
                            maxLength="6"
                            name="zipCode"
                            id="zipCode"
                          ></input>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <h5>Card Details:</h5>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1">
                        Card Number :
                      </label>
                      <div className="col-md-9">
                        <div className="col-md-10">
                          <input
                            onBlur={(e) =>
                              this.setState({ cardNumber: e.target.value })
                            }
                            required
                            type="text"
                            maxLength="16"
                            name="cardNumber"
                            className="form-control"
                            placeholder="Card Number"
                            data-constraints="@Required @Numeric"
                          ></input>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1">
                        Expires on :
                      </label>
                      <div className="col-md-9">
                        <div className="col-md-5">
                          <Select
                            onChange={(e) => this.setState({ expireMonth: e })}
                            required
                            className="form-control form-wrap"
                            id="expireMonth"
                            name="expireMonth"
                          >
                            <Option value="1">January</Option>
                            <Option value="2">February</Option>
                            <Option value="3">March</Option>
                            <Option value="4">April</Option>
                            <Option value="5">May</Option>
                            <Option value="6">June</Option>
                            <Option value="7">July</Option>
                            <Option value="8">August</Option>
                            <Option value="9">September</Option>
                            <Option value="10">October</Option>
                            <Option value="11">November</Option>
                            <Option value="12">December</Option>
                          </Select>
                        </div>
                        <div className="col-md-5">
                          <Select
                            onChange={(e) => this.setState({ expireYear: e })}
                            required
                            className="form-control form-wrap"
                            id="expireYear"
                            name="expireYear"
                          >
                            <Option value="21">2021</Option>
                            <Option value="22">2022</Option>
                            <Option value="23">2023</Option>
                            <Option value="24">2024</Option>
                            <Option value="25">2025</Option>
                            <Option value="26">2026</Option>
                            <Option value="27">2027</Option>
                            <Option value="28">2028</Option>
                            <Option value="29">2029</Option>
                            <Option value="30">2030</Option>
                            <Option value="31">2031</Option>
                            <Option value="32">2032</Option>
                            <Option value="33">2033</Option>
                            <Option value="34">2034</Option>
                            <Option value="35">2035</Option>
                            <Option value="36">2036</Option>
                            <Option value="37">2037</Option>
                            <Option value="38">2038</Option>
                            <Option value="39">2039</Option>
                            <Option value="40">2040</Option>
                            <Option value="41">2041</Option>
                            <Option value="42">2042</Option>
                            <Option value="43">2043</Option>
                            <Option value="44">2044</Option>
                            <Option value="45">2045</Option>
                            <Option value="46">2046</Option>
                            <Option value="47">2047</Option>
                            <Option value="48">2048</Option>
                            <Option value="49">2049</Option>
                            <Option value="50">2050</Option>
                          </Select>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <Layout
                        className="site-layout"
                        style={{ margin: "4% 10%" }}
                      >
                        <Content style={{ margin: "0 16px" }}>
                          <div
                            className="site-layout-background"
                            style={{
                              overflowY: "scroll",
                              padding: 24,
                              height: 230,
                            }}
                          >
                            <h5>
                              PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY .
                            </h5>

                            <h6>
                              1. Introduction and Acceptance of Terms of Use
                            </h6>
                            <p>
                              SBAT Matrimony offers you a wide range of content,
                              communication tools, forums, and information about
                              its products and services ("Materials") via this
                              web site. By using this web site, you are agreeing
                              to accept and comply with the terms and conditions
                              of use as stated below ("Terms of Use"), which
                              SBAT Matrimony may update at any time without
                              notice. You should visit this page periodically to
                              review the then-current Terms of Use. Please note
                              that SBAT Matrimony may, at its sole discretion,
                              terminate your access to this web site at any time
                              without notice.
                            </p>

                            <h6>2. Limited Right to Use</h6>
                            <p>
                              This web site is owned and operated by SBAT
                              Matrimony. Unless otherwise specified, all
                              Materials on this web site are the property of
                              SBAT Matrimony and are protected by the copyright
                              laws of Australia and, throughout the world by the
                              applicable copyright laws. You may, view, print
                              and/or download one copy of the Materials from
                              this web site on any single computer solely for
                              your personal, informational, non-commercial use,
                              provided you keep intact all copyright and other
                              proprietary notices. No Materials published by
                              SBAT Matrimony on this web site, in whole or in
                              part, may be copied, reproduced, modified,
                              republished, uploaded, posted, transmitted, or
                              distributed in any form or by any means without
                              prior written permission from SBAT Matrimony . The
                              use of any such Materials on any other web site or
                              networked computer environment or for any other
                              purpose is strictly prohibited and such
                              unauthorized use may violate copyright, trademark
                              and other similar laws.
                            </p>

                            <h6>3. Communications</h6>
                            <p>
                              Except for any disclosure by you for technical
                              support purposes, or as specified in our Privacy
                              Statement, all communications from you to this web
                              site will be considered non-confidential and
                              non-proprietary. You agree that any and all
                              comments, information, feedback and ideas
                              regarding our company, products or services that
                              you communicate to SBAT Matrimony ("Feedback")
                              will be deemed, at the time of communication to
                              SBAT Matrimony, the property of SBAT Matrimony,
                              and SBAT Matrimony shall be entitled to full
                              rights of ownership, including without limitation,
                              unrestricted right to use or disclose such
                              Feedback in any form, medium or technology now
                              known or later developed, and for any purpose,
                              commercial or otherwise, without compensation to
                              you. You are solely responsible for the content of
                              your communications and their legality under all
                              laws and regulations. You agree not to use this
                              web site to distribute, link to or solicit content
                              that is defamatory, harassing, unlawful,
                              libellous, harmful to minors, threatening,
                              obscene, false, misleading, or infringing a third
                              party intellectual or privacy rights.
                            </p>

                            <h6>
                              4. Access to Password Protected or Secured Areas
                            </h6>
                            <p>
                              Access to and use of password protected or secured
                              areas of this web site is restricted to authorized
                              users only. You will be asked to provide accurate
                              and current information on all registration forms
                              on this web site. You are solely responsible for
                              maintaining the confidentiality of any username
                              and password that you choose or is chosen by your
                              web administrator on your behalf, to access this
                              web site as well as any activity that occur under
                              your username/password. You will not misuse or
                              share your username or password, misrepresent your
                              identity or your affiliation with an entity,
                              impersonate any person or entity, or misstate the
                              origin of any Materials you are exposed to through
                              this web site.
                            </p>

                            <h6>5. Monitoring</h6>
                            <p>
                              Although SBAT Matrimony is not obligated to do so,
                              it will have the right to review your
                              communications on this web site to determine
                              whether you comply with our Terms of Use. SBAT
                              Matrimony will not have any liability or
                              responsibility for the content of any
                              communications you post to this web site, or for
                              any errors or violations of any laws or
                              regulations by you. SBAT Matrimony will comply
                              with any court order in disclosing the identity of
                              any person posting communications on this web
                              site. It is advisable that you review our Privacy
                              Policy before posting any such communications.
                              Please note that when you conduct transactions
                              with other companies providing content via this
                              web site, you will also be subject to their
                              privacy policies.
                            </p>

                            <h6>6. Links to Other Sites</h6>
                            <p>
                              The linked sites are not under the control of SBAT
                              Matrimony and SBAT Matrimony is not responsible
                              for the content of any linked site or any link
                              contained in a linked site. SBAT Matrimony
                              reserves the right to terminate any link at any
                              time. SBAT Matrimony may provide links from this
                              web site to other sites as a convenience to you
                              and in no way should this be interpreted as an
                              endorsement of any company, content or products to
                              which it links. If you decide to access any of the
                              third party sites linked to this web site, you do
                              this entirely at your own risk. SBAT Matrimony
                              DISCLAIMS ANY AND ALL WARRANTIES, EXPRESS OR
                              IMPLIED, TO ANY SUCH LINKED SITES, INCLUDING BUT
                              NOT LIMITED TO ANY TERMS AS TO THE ACCURACY,
                              OWNERSHIP, VALIDITY OR LEGALITY OF ANY CONTENT OF
                              A LINKED SITE.
                            </p>

                            <h6>7. Trademarks</h6>
                            <p>
                              The trademarks, service marks and logos of SBAT
                              Matrimony and others used in this web site
                              ("Trademarks") are the property of SBAT Matrimony
                              and their respective owners. You have no right to
                              use any such Trademarks, and nothing contained in
                              this web site or the Terms of Use grants any right
                              to use (by implication, waiver, estoppel or
                              otherwise) any Trademarks without the prior
                              written permission of SBAT Matrimony or the
                              respective owner.
                            </p>

                            <h6>8. Indemnity</h6>
                            <p>
                              You agree to indemnify, defend and hold SBAT
                              Matrimony harmless from and against any and all
                              third party claims, liabilities, damages, losses
                              or expenses (including reasonable attorney's fees
                              and costs) arising out of, based on or in
                              connection with your access and/or use of this web
                              site.
                            </p>

                            <h6>9. Limitation of Liability</h6>
                            <p>
                              N NO EVENT SHALL SBAT Matrimony OR ITS SUPPLIERS
                              BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL,
                              INCIDENTAL OR CONSEQUENTIAL DAMAGES INCLUDING,
                              WITHOUT LIMITATION, LOSS PROFITS OR REVENUES,
                              COSTS OF REPLACEMENT GOODS, LOSS OR DAMAGE TO DATA
                              ARISING OUT OF THE USE OR INABILITY TO USE THIS
                              WEB SITE OR ANY LINKED SITE, DAMAGES RESULTING
                              FROM USE OF OR RELIANCE ON THE INFORMATION OR
                              MATERIALS PRESENTED ON THIS WEB SITE, WHETHER
                              BASED ON WARRANTY, CONTRACT, TORT OR ANY OTHER
                              LEGAL THEORY EVEN IF SBAT Matrimony OR ITS
                              SUPPLIERS HAVE BEEN ADVISED OF THE POSSIBILITY OF
                              SUCH DAMAGES.
                            </p>

                            <h6>10. Disclaimer</h6>
                            <p>
                              SBAT Matrimony assumes no responsibility for
                              accuracy, correctness, timeliness, or content of
                              the Materials provided on this web site. You
                              should not assume that the Materials on this web
                              site are continuously updated or otherwise contain
                              current information. SBAT Matrimony is not
                              responsible for supplying content or materials
                              from the web site that have expired or have been
                              removed. THE MATERIALS PROVIDED AT THIS WEB SITE
                              ARE PROVIDED "AS IS" AND ANY WARRANTY (EXPRESS OR
                              IMPLIED), CONDITION OR OTHER TERM OF ANY KIND,
                              INCLUDING WITHOUT LIMITATION, ANY WARRANTY OF
                              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                              NON-INFRINGEMENT OR TITLE IS HEREBY EXCLUDED.
                            </p>

                            <h6>11. Applicable Laws</h6>
                            <p>
                              These Terms of Use are governed by laws of the
                              United States and by the laws of the State of
                              Maryland without regard to its conflicts of laws
                              provisions. You agree to the personal jurisdiction
                              by and venue in the state and federal courts in
                              Howard County, Maryland, and waive any objection
                              to such jurisdiction or venue.
                            </p>

                            <h6>12. General</h6>
                            <p>
                              If you have any questions regarding the Terms of
                              Use, please contact us via info@rovarinfotech.com
                            </p>
                          </div>
                        </Content>
                      </Layout>
                      <div
                        className="col-md-12 text-center"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Checkbox
                          onChange={(e) =>
                            this.setState({ agreementCheck: true })
                          }
                        >
                          Accept Terms & Conditions
                        </Checkbox>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <br />
                      <div
                        className="col-md-12 text-center"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
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
                      <br />
                      <div className="col-md-12 text-center">
                        <input
                          required
                          onClick={this.validate}
                          type="submit"
                          disabled={this.state.submitted}
                          className="btn btn-lg btn-primary"
                          value="Pay $100 for 1 Year"
                        ></input>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <br />
            <div className="clearfix"> </div>
          </div>
        </div>
      </>
    );
  }
}

export default Payment;
