import React, { Component } from "react";
import InnerBanner from "./components/common/innerBanner";
import Breadcrumbs from "./components/common/breadcrumbs";
import { Redirect } from "react-router-dom";
import ProfileService from "./services/ProfileService";
import UploadPic from "./components/common/uploadPic";
import TokenExpired from "./components/common/tokenExpired";
import { Select, Steps } from "antd";
import "antd/dist/antd.css";
import { Avatar, Dropdown, Menu, Button, message ,Space} from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import * as constant from ".//constants";
import Thumbnail from "./components/common/thumbnail";


class ProfileEdit extends Component {
  constructor() {
    super();
    this.form = React.createRef();
    this.state = {
      profileImage: null,
      horoscopeImage: "",
      photo1Image: "",
      photo2Image: "",
      profileFor: "",
      profileNumber: "NA",
      profileId: "",
      firstName: "",
      lastName: "",
      gender: "",
      height: "",
      dob: "",
      maritalStatus: "",
      motherName: "",
      motherAge: "",
      motherOccupation: "",
      fatherName: "",
      fatherAge: "",
      fatherOccupation: "",
      familyIncome: "",
      familyValues: "",
      city: "",
      statee: "",
      highestEducation: "",
      ugDegree: "",
      ugCollege: "",
      pgDegree: "",
      pgCollege: "",
      occupation: "",
      income: "",
      desiredAgeGroup: "",
      desiredHeight: "",
      desiredMaritalStatus: "",
      message: "",
      submitted: "",
      fadeIn: false,
      redirect: null,
      btnDisplay: "none",
      activationStatus: "INACTIVE",
      submitSource: "saveProfile",
      caste: "",
      gotra: "",
      nakshatra: "",
      rasi: "",
      desiredCaste: "",
      desiredGotra: "",
      desiredGender: "",
    };
    this.validate = this.validate.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    
  }
  handleProfileImageChange = (profileImage) => {
    this.setState({ profileImage: profileImage });
  };

  handleHoroscopeImageChange = (horoscopeImage) => {
    this.setState({ horoscopeImage: horoscopeImage, btnDisplay: "block" });
  };

  handlePhotosChange = (photos) => {
    this.setState({
      photo1Image: photos[0],
      photo2Image: photos?.[1] ? photos[1] : "",
    });
    window.location.reload();
  };

  saveChanges() {
    this.setState({ submitted: true });
    let profileData = {
      profileId: this.state.profileId,
      profileFor: this.state.profileFor,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gender: this.state.gender,
      dob: this.state.dob,
      height: this.state.height,
      maritalStatus: this.state.maritalStatus,
      motherName: this.state.motherName,
      motherAge: this.state.motherAge,
      motherOccupation: this.state.motherOccupation,
      fatherName: this.state.fatherName,
      fatherAge: this.state.fatherAge,
      fatherOccupation: this.state.fatherOccupation,
      familyIncome: this.state.familyIncome,
      familyValues: this.state.familyValues,
      city: this.state.city,
      state: this.state.statee,
      highestEducation: this.state.highestEducation,
      ugDegree: this.state.ugDegree,
      ugCollege: this.state.ugCollege,
      pgDegree: this.state.pgDegree,
      pgCollege: this.state.pgCollege,
      occupation: this.state.occupation,
      income: this.state.income,
      desiredAgeGroup: this.state.desiredAgeGroup,
      desiredHeight: this.state.desiredHeight,
      desiredMaritalStatus: this.state.desiredMaritalStatus,
      caste: this.state.caste,
      gotra: this.state.gotra,
      rasi: this.state.rasi,
      nakshatra: this.state.nakshatra,
      desiredCaste: this.state.desiredCaste,
      desiredGotra: this.state.desiredGotra,
      desiredGender: this.state.desiredGender,
      userId: sessionStorage.getItem("userId"),
    };
    
    // console.log("mother", this.motherName)
    ProfileService.updateProfile(profileData)
      .then((result) => {
        console.log(result);
        message.success("Changes Updated!");
        if (this.state.submitSource === "gotoPay") {
          this.setState({ redirect: "/payment" });
        } else {
          this.setState({ redirect: "/profile" });
        }
      })
      .catch((error) => {
        message.error("Something went wrong! Please try again!");
        this.setState({ submitted: "" });
      });
  }
  // handleUserInput (e) {
  //   // const motherName = e.target.name;
   
  //   this.setState( this.state.motherName = e.target.value);

  // }

  validate() {
   
    if (this.state.activationStatus === "INACTIVE") {
      this.setState({ submitSource: "gotoPay" });
    } else {
      this.setState({ submitSource: "saveProfile" });
    }
    if (this.form.current.reportValidity()) {
      if (this.state.profileFor === null) {
        message.warn("Profile For cannot be empty.");
        document.getElementById("profileFor").focus();
        return false;
      }
      if (this.state.statee === null) {
        message.warn("State cannot be empty.");
        document.getElementById("state").focus();
        return false;
      }
      if (this.state.gender === null) {
        message.warn("Gender cannot be empty.");
        document.getElementById("gender").focus();
        return false;
      }
      if (this.state.maritalStatus === null) {
        message.warn("Marital Status cannot be empty.");
        document.getElementById("maritalStatus").focus();
        return false;
      }
      if (this.state.familyValues === null) {
        message.warn("Family Values cannot be empty.");
        document.getElementById("familyValues").focus();
        return false;
      }
      // if (this.state.motherName.value == null) {
      //   message.warn("MotherName Values cannot be empty.");
      //   // document.getElementById("motherName").focus();
      //   return false;
      // }
      // if (this.state.fatherName.value === null) {
      //   message.warn("FatherName Values cannot be empty.");
      //   // document.getElementById("fatherName").focus();
      //   return false;
      // }
      this.saveChanges();
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (localStorage.getItem("redirectedFromCheckout")) {
      sessionStorage.removeItem("token");
      localStorage.setItem("transactionExpired", true);
      window.location.pathname = "/";
    }
    if (sessionStorage.getItem("status") === "ACTIVE") {
      window.location.pathname = "/profile";
      localStorage.setItem("profileMsg", "uneditable");
    }
    ProfileService.getById(sessionStorage.getItem("userId")).then((result) => {
      if (result.data.artifact) {
        this.setState({
          profileImage:
            constant.AVATAR_PATH + result.data.artifact.avatarFileName,
          horoscopeImage:
            constant.HOROSCOPE_PATH + result.data.artifact.horoscopeFileName,
          btnDisplay:
            result.data.artifact.horoscopeFileName === "" ? "none" : "block",
          photo1Image:
            constant.PHOTO1_PATH + result.data.artifact.photo1FileName,
          photo2Image:
            constant.PHOTO2_PATH + result.data.artifact.photo2FileName,
        });
      }
      if (result.data.profile) {
        this.setState({
          profileId: result.data.profile.profileId,
          profileNumber: result.data.profile.profileNumber,
          profileFor: result.data.profile.profileFor,
          firstName: result.data.profile.firstName,
          lastName: result.data.profile.lastName,
          gender: result.data.profile.gender,
          dob: result.data.profile.dob,
          height: result.data.profile.height,
          maritalStatus: result.data.profile.maritalStatus,
          motherName: result.data.profile.motherName,
          motherAge: result.data.profile.motherAge,
          motherOccupation: result.data.profile.motherOccupation,
          fatherName: result.data.profile.fatherName,
          fatherAge: result.data.profile.fatherAge,
          fatherOccupation: result.data.profile.fatherOccupation,
          familyIncome: result.data.profile.familyIncome,
          familyValues: result.data.profile.familyValues,
          city: result.data.profile.city,
          statee: result.data.profile.state,
          highestEducation: result.data.profile.highestEducation,
          ugDegree: result.data.profile.ugDegree,
          ugCollege: result.data.profile.ugCollege,
          pgDegree: result.data.profile.pgDegree,
          pgCollege: result.data.profile.pgCollege,
          occupation: result.data.profile.occupation,
          income: result.data.profile.income,
          desiredAgeGroup: result.data.profile.desiredAgeGroup,
          desiredHeight: result.data.profile.desiredHeight,
          desiredMaritalStatus: result.data.profile.desiredMaritalStatus,
          activationStatus: result.data.profile.status,
          caste: result.data.profile.caste,
          gotra: result.data.profile.gotra,
          rasi: result.data.profile.rasi,
          nakshatra: result.data.profile.nakshatra,
          desiredCaste: result.data.profile.desiredCaste,
          desiredGotra: result.data.profile.desiredGotra,
          desiredGender: result.data.profile.desiredGender,
        });
        console.log("profile",result.data.profile)
      }
    });
     }

  render() {
    
    const menu = (
      <Menu>
        {this.state.btnDisplay !== "none" ? (
          <Menu.Item>
            <Button
              type="text"
              onClick={(e) =>
                (window.location.href = this.state.horoscopeImage)
              }
            >
              View
            </Button>
          </Menu.Item>
        ) : (
          <></>
        )}{" "}
        <Menu.Item>
          <UploadPic
            handleImageChange={this.handleHoroscopeImageChange}
            horoscope={this.state.horoscopeImage}
            type="horoscope"
          />
        </Menu.Item>
      </Menu>
    );
    const { Option } = Select;
    const { Step } = Steps;
    let maritalStatusArray = this.state.desiredMaritalStatus
      .toString()
      .split(",");
    maritalStatusArray = maritalStatusArray[0] === "" ? [] : maritalStatusArray;
    let desiredCasteArray = this.state.desiredCaste.toString().split(",");
    desiredCasteArray = desiredCasteArray[0] === "" ? [] : desiredCasteArray;
    let desiredGotraArray = this.state.desiredGotra.toString().split(",");
    desiredGotraArray = desiredGotraArray[0] === "" ? [] : desiredGotraArray;
    // let profilegenderArray = this.state. desiredGender.toString().split(",");
    // profilegenderArray =profilegenderArray[0] === "" ? [] :profilegenderArray;
    let progressBar, paymentBtn;
    if (this.state.activationStatus === "INACTIVE") {
      paymentBtn = "submit";
      progressBar = (
        <>
          <Steps size="small" current={0}>
            <Step title="Update Profile" />
            <Step title="Payment Information" />
            <Step title="Complete & Activate" />
          </Steps>
          <br />
        </>
      );
    } else {
      paymentBtn = "hidden";
      progressBar = <></>;
    }

    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: { city: this.state.city, statee: this.state.statee },
          }}
        />
      );
    }
    return (
      <>
        <TokenExpired />
        <InnerBanner />
        {sessionStorage.getItem("status") === "ACTIVE" ? (
          <Breadcrumbs title={["Profile", "Edit"]} href={["/profile", ""]} />
        ) : (
          <Breadcrumbs title={["Edit"]} href={[""]} />
        )}
        <div className="w3ls-list">
          <div className="container">
            {progressBar}
            <h2>Profile</h2>
            <div
              className="col-md-9 profiles-list-agileits"
              style={{ marginLeft: "12.5%" }}
            >
              <div className="single_w3_profile">
                <div className="agileits_profile_image">
                  <div>
                    <Avatar
                      size={170}
                      icon={<UserOutlined />}
                      src={this.state.profileImage}
                    />
                    <UploadPic
                      handleImageChange={this.handleProfileImageChange}
                      type="avatar"
                    />
                  </div>
                </div>
                <div className="w3layouts_details">
                  {this.state.activationStatus === "ACTIVE" ? (
                    <h4 style={{ color: "#00A800" }}>
                      Profile ID : <b>{this.state.profileNumber}</b> (Active)
                    </h4>
                  ) : (
                    <h4 style={{ color: "#ff4c4c" }}>
                      Profile ID : <b>{this.state.profileNumber}</b> (Not
                      Activated)
                    </h4>
                  )}
                  <div className="row">
                    <div className="col-sm-5">
                      <p>
                        {this.state.firstName + " " + this.state.lastName}
                        <br />
                        {this.state.dob}
                        <br />
                        {this.state.occupation}
                        <br />
                        {this.state.income}
                      </p>
                    </div>
                    <div
                      class="col-sm-6 pull-left"
                      style={{ textAlign: "center" }}
                    >
                      <br />
                      {/* <Thumbnail
                      shape="square"
                        photo1={this.state.photo1Image}
                        photo2={this.state.photo2Image}
                        isViewerSelf={true}
                      /> */}
                      <Space> <Avatar
                         shape="square"
                      size={100}
                      icon={<UserOutlined />}
                      src={this.state.photo1Image}
                    />
                    <Avatar
                    className=""
                     shape="square"
                      size={100}
                      icon={<UserOutlined />}
                      src={this.state.photo2Image}
                    /></Space>
                        
                       
                    
                    
                    
                     
                      
                      
                
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-sm-5">
                      <Dropdown overlay={menu}>
                        <Button type="warning">
                          Horoscope <DownOutlined />
                        </Button>
                      </Dropdown>
                    </div>
                    <div className="col-sm-6" style={{ textAlign: "center" }}>
                      <UploadPic
                        handleImageChange={this.handlePhotosChange}
                        photos={[
                          this.state.photo1Image,
                          this.state.photo2Image,
                        ]}
                        type="photos"
                      />
                    </div>
                  </div>
                </div>

                <div className="clearfix"></div>
              </div>
              <div className="profile_w3layouts_details">
                <form
                  id="profile"
                  ref={this.form}
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="agileits_aboutme">
                    <div className="col-md-12">
                      <div className="col-md-2 required">
                        <h7>Profile for: </h7>
                      </div>
                      <div className="col-md-4">
                        <Select
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onChange={(e) => this.setState({ profileFor: e })}
                          required
                          className="form-control"
                          value={this.state.profileFor}
                          id="profileFor"
                        >
                          <Option value="Myself">Me</Option>
                          <Option value="Son">My Son</Option>
                          <Option value="Daughter">My Daughter</Option>
                          <Option value="Brother">My Brother</Option>
                          <Option value="Sister">My Sister</Option>
                          <Option value="Relative">My Relative</Option>
                          <Option value="Friend">My Friend</Option>
                        </Select>
                      </div>
                    </div>
                    <br />
                    <h5>Brief Details:</h5>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1 required">
                        {" "}
                        Full Name:{" "}
                      </label>
                      <div className="col-md-9">
                        <div className="col-md-5">
                          <input
                            onBlur={(e) =>
                              this.setState({ firstName: e.target.value })
                            }
                            required
                            type="text"
                            defaultValue={this.state.firstName}
                            id="firstName"
                            className="form-control"
                            placeholder="First Name"
                          ></input>
                        </div>
                        <div className="col-md-5">
                          <input
                            onBlur={(e) =>
                              this.setState({ lastName: e.target.value })
                            }
                            required
                            type="text"
                            defaultValue={this.state.lastName}
                            id="lastName"
                            className="form-control"
                            placeholder="Last Name"
                          ></input>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1 required">
                        {" "}
                        Gender:{" "}
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
                            onChange={(e) => this.setState({ gender: e })}
                            required
                            className="form-control"
                            value={this.state.gender}
                            id="gender"
                          >
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                          </Select>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1 required">
                        {" "}
                        Date of Birth:{" "}
                      </label>
                      <div className="col-md-9">
                        <div className="col-md-5">
                          <input
                            onBlur={(e) =>
                              this.setState({ dob: e.target.value })
                            }
                            required
                            type="date"
                            defaultValue={this.state.dob}
                            id="dob"
                            className="form-control"
                            placeholder="mm/dd/yyyy"
                          ></input>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1 required">
                        {" "}
                        Height (in inches):{" "}
                      </label>
                      <div className="col-md-9">
                        <div className="col-md-5">
                          <input
                            onBlur={(e) =>
                              this.setState({ height: e.target.value })
                            }
                            required
                            type="text"
                            defaultValue={this.state.height}
                            id="height"
                            className="form-control"
                            placeholder="Height (in inches)"
                          ></input>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1 required">
                        {" "}
                        Marital Status:{" "}
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
                            onChange={(e) =>
                              this.setState({ maritalStatus: e })
                            }
                            required
                            className="form-control"
                            value={this.state.maritalStatus}
                            id="maritalStatus"
                          >
                            <Option value="Single">Single</Option>
                            <Option value="Widowed">Widowed</Option>
                            <Option value="Divorced">Divorced</Option>
                          </Select>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <h5>Family Details:</h5>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1 required">
                        Mother :{" "}
                      </label>
                      <div className="col-md-9">
                        <div className="col-md-5">
                          <input
                            onBlur={(e) =>
                              this.setState({ motherName: e.target.value })
                            }
                            
                            type="text"
                           
                            className="form-control"
                           style={this.state.motherName===""?{border:"1px solid red"}:{border:""}}
                            
                            placeholder="Name"
                           
                            id="motherName"
                            
                            required
                          ></input>
                        </div>
                        <div className="col-md-2">
                          <input
                            onBlur={(e) =>
                              this.setState({ motherAge: e.target.value })
                            }
                            type="text"
                            className="form-control"
                            placeholder="Age"
                            defaultValue={this.state.motherAge}
                            id="motherAge"
                          ></input>
                        </div>
                        <div className="col-md-5">
                          <input
                            onBlur={(e) =>
                              this.setState({
                                motherOccupation: e.target.value,
                              })
                            }
                            type="text"
                            className="form-control"
                            placeholder="Occupation"
                            defaultValue={this.state.motherOccupation}
                            id="motherOccupation"
                          ></input>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1 required">
                        Father :{" "}
                      </label>
                      <div className="col-md-9">
                        <div className="col-md-5">
                          <input
                            onBlur={(e) =>
                              this.setState({ fatherName: e.target.value })
                            }
                           onChange={""}
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            // defaultValue={this.state.fatherName}
                            id="fatherName"
                            style={this.state.fatherName===""?{border:"1px solid red"}:{border:""}}
                            required
                          ></input>
                        </div>
                        <div className="col-md-2">
                          <input
                            onBlur={(e) =>
                              this.setState({ fatherAge: e.target.value })
                            }
                            type="text"
                            className="form-control"
                            placeholder="Age"
                            defaultValue={this.state.fatherAge}
                            id="fatherAge"
                           
                          ></input>
                        </div>
                        <div className="col-md-5">
                          <input
                            onBlur={(e) =>
                              this.setState({
                                fatherOccupation: e.target.value,
                              })
                            }
                            type="text"
                            className="form-control"
                            placeholder="Occupation"
                            defaultValue={this.state.fatherOccupation}
                            id="fatherOccupation"
                           
                          ></input>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1">
                        Family Income (in USD):<span className=" required"></span>{" "}
                      </label>
                      <div className="col-md-9">
                        <div className="col-md-5">
                          <input
                            onBlur={(e) =>
                              this.setState({ familyIncome: e.target.value })
                            }
                            required
                            type="text"
                            className="form-control"
                            placeholder="Income"
                            defaultValue={this.state.familyIncome}
                            id="familyIncome"
                          ></input>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1 required">
                        City/State :{" "}
                      </label>
                      <div className="col-md-9">
                        <div className="col-md-5">
                          <input
                            onBlur={(e) =>
                              this.setState({ city: e.target.value })
                            }
                            required
                            type="text"
                            className="form-control"
                            placeholder="City"
                            defaultValue={this.state.city}
                            id="city"
                          ></input>
                        </div>
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
                    <h5>Optional Details:</h5>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1">
                        Caste :{" "}
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
                            onChange={(e) => this.setState({ caste: e })}
                            className="form-control"
                            value={this.state.caste}
                            id="caste"
                          >
                            <Option value="Brahmin">Brahmin</Option>
                            <Option value="Kshatriya">Kshatriya</Option>
                            <Option value="Vaishya">Vaishya</Option>
                            <Option value="Shudra">Shudra</Option>
                            <Option value="Prefer Not To Say">
                              Prefer Not To Say
                            </Option>
                          </Select>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1">
                        Gotra :{" "}
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
                            onChange={(e) => this.setState({ gotra: e })}
                            className="form-control"
                            value={this.state.gotra}
                            id="gotra"
                          >
                            <Option value="Agastya">Agastya</Option>
                            <Option value="Agni">Agni</Option>
                            <Option value="Angirasa">Angirasa</Option>
                            <Option value="Alambayan">Alambayan</Option>
                            <Option value="Aliman">Aliman</Option>
                            <Option value="Atreya">Atreya</Option>
                            <Option value="Awasthi">Awasthi</Option>
                            <Option value="Bachchas">Bachchas</Option>
                            <Option value="Bansal">Bansal</Option>
                            <Option value="Bhargava">Bhargava</Option>
                            <Option value="Bilas">Bilas</Option>
                            <Option value="Batish-Vats">Batish-Vats</Option>
                            <Option value="Bhardwaja">Bhardwaja</Option>
                            <Option value="Baghel">Baghel</Option>
                            <Option value="Chandramaharshi">
                              Chandramaharshi
                            </Option>
                            <Option value="Chathundi Maharshi">
                              Chathundi Maharshi
                            </Option>
                            <Option value="Chahar">Chahar</Option>
                            <Option value="Dahiya">Dahiya</Option>
                            <Option value="Deshastha">Deshastha</Option>
                            <Option value="Deval">Deval</Option>
                            <Option value="Dubey">Dubey</Option>
                            <Option value="Garg/Gargeya">Garg/Gargeya</Option>
                            <Option value="Gangotri">Gangotri</Option>
                            <Option value="Gautama">Gautama</Option>
                            <Option value="Gohel">Gohel</Option>
                            <Option value="Goyal">Goyal</Option>
                            <Option value="Harita">Harita</Option>
                            <Option value="Jadaun">Jadaun</Option>
                            <Option value="Kashyapa">Kashyapa</Option>
                            <Option value="Kaundiya">Kaundiya</Option>
                            <Option value="Katyayana">Katyayana</Option>
                            <Option value="Kaushal">Kaushal</Option>
                            <Option value="Kaushika">Kaushika</Option>
                            <Option value="Kayastha">Kayastha</Option>
                            <Option value="Khangura ">Khangura </Option>
                            <Option value="Kancharla">Kancharla</Option>
                            <Option value="Kothapalla">Kothapalla</Option>
                            <Option value="Vishwamitra">Vishwamitra</Option>
                            <Option value="Mittal">Mittal</Option>
                            <Option value="Mohiwal">Mohiwal</Option>
                            <Option value="Maudgalya">Maudgalya</Option>
                            <Option value="Munshi">Munshi</Option>
                            <Option value="Nagasya">Nagasya</Option>
                            <Option value="Nanda">Nanda</Option>
                            <Option value="Panchal">Panchal</Option>
                            <Option value="Parashara">Parashara</Option>
                            <Option value="Rathod">Rathod</Option>
                            <Option value="Rawal">Rawal</Option>
                            <Option value="Sankrithi">Sankrithi</Option>
                            <Option value="Saraswata">Saraswata</Option>
                            <Option value="Savarna">Savarna</Option>
                            <Option value="Shandilya">Shandilya</Option>
                            <Option value="Shaktri">Shaktri</Option>
                            <Option value="Shatamarshana">Shatamarshana</Option>
                            <Option value="Sheoran">Sheoran</Option>
                            <Option value="Shiva">Shiva</Option>
                            <Option value="Singhal">Singhal</Option>
                            <Option value="Srivatsa">Srivatsa</Option>
                            <Option value="Toppo">Toppo</Option>
                            <Option value="Tulyamahamuni">Tulyamahamuni</Option>
                            <Option value="Upreti">Upreti</Option>
                            <Option value="Vadhula">Vadhula</Option>
                            <Option value="Vaid">Vaid</Option>
                            <Option value="Vasishtha">Vasishtha</Option>
                            <Option value="Vats">Vats</Option>
                            <Option value="Vishwakarman">Vishwakarman</Option>
                            <Option value="Vishnu">Vishnu</Option>
                            <Option value="Not Listed">Not Listed</Option>
                            <Option value="Prefer Not To Say">
                              Prefer Not To Say
                            </Option>
                          </Select>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1">Rasi : </label>
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
                            onChange={(e) => this.setState({ rasi: e })}
                            className="form-control"
                            value={this.state.rasi}
                            id="rasi"
                          >
                            <Option value="Mesha">Mesha</Option>
                            <Option value="Rishabha">Rishabha</Option>
                            <Option value="Mithuna">Mithuna</Option>
                            <Option value="Kataka">Kataka</Option>
                            <Option value="Simha">Simha</Option>
                            <Option value="Kanya">Kanya</Option>
                            <Option value="Thula">Thula</Option>
                            <Option value="Vrischika">Vrischika</Option>
                            <Option value="Dhanus">Dhanus</Option>
                            <Option value="Makara">Makara</Option>
                            <Option value="Kumbha">Kumbha</Option>
                            <Option value="Meena">Meena</Option>
                          </Select>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1">
                        Star/Nakshatra :{" "}
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
                            onChange={(e) => this.setState({ nakshatra: e })}
                            className="form-control"
                            value={this.state.nakshatra}
                            id="nakshatra"
                          >
                            <Option value="Ashwini">Ashwini</Option>
                            <Option value="Bharani">Bharani</Option>
                            <Option value="Krittika">Krittika</Option>
                            <Option value="Rohini">Rohini</Option>
                            <Option value="Mrigashirsha">Mrigashirsha</Option>
                            <Option value="Ardra">Ardra</Option>
                            <Option value="Punarvasu">Punarvasu</Option>
                            <Option value="Pushyami">Pushyami</Option>
                            <Option value="Aslesha">Aslesha</Option>
                            <Option value="Makha">Makha</Option>
                            <Option value="Purvaphalguni">Purvaphalguni</Option>
                            <Option value="Uttaraphalguni">
                              Uttaraphalguni
                            </Option>
                            <Option value="Hasta">Hasta</Option>
                            <Option value="Chitra">Chitra</Option>
                            <Option value="Swati">Swati</Option>
                            <Option value="Visakha">Visakha</Option>
                            <Option value="Anuradha">Anuradha</Option>
                            <Option value="Jyeshta">Jyeshta</Option>
                            <Option value="Moola">Moola</Option>
                            <Option value="Purvashada">Purvashada</Option>
                            <Option value="Uttarashada">Uttarashada</Option>
                            <Option value="Shravana">Shravana</Option>
                            <Option value="Danishta">Danishta</Option>
                            <Option value="Satabhisha">Satabhisha</Option>
                            <Option value="Purvabhadra">Purvabhadra</Option>
                            <Option value="Uttarabhadra">Uttarabhadra</Option>
                            <Option value="Revati">Revati</Option>
                          </Select>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <h5>Desired Partner Preferences:</h5>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1 required">
                        Age Group:{" "}
                      </label>
                      <div className="col-md-9">
                        <div className="col-md-5">
                          <Select
                            onChange={(e) =>
                              this.setState({ desiredAgeGroup: e })
                            }
                            required
                            className="form-control"
                            value={this.state.desiredAgeGroup}
                            id="desiredAgeGroup"
                          >
                            <Option value="18-20">18-20</Option>
                            <Option value="21-23">21-23</Option>
                            <Option value="24-27">24-27</Option>
                            <Option value="28-30">28-30</Option>
                            <Option value="30-35">30-35</Option>
                            <Option value="35-40">35-40</Option>
                            <Option value="40-45">40-45</Option>
                            <Option value="45-50">45-50</Option>
                          </Select>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1 required">
                        Height (in inches):{" "}
                      </label>
                      <div className="col-md-9">
                        {" "}
                        <div className="col-md-5">
                          <Select
                            onChange={(e) =>
                              this.setState({ desiredHeight: e })
                            }
                            required
                            className="form-control"
                            value={this.state.desiredHeight}
                            id="desiredHeight"
                          >
                            <Option value="30-40">30-40</Option>
                            <Option value="40-50">40-50</Option>
                            <Option value="50-60">50-60</Option>
                            <Option value="60-70">60-70</Option>
                            <Option value="70-80">70-80</Option>
                            <Option value="80-90">80-90</Option>
                            <Option value="90-100">90-100</Option>
                          </Select>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1">
                        Marital Status :{" "}
                      </label>
                      <div className="col-md-9">
                        <div className="col-md-11">
                          <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="Please Select"
                            value={maritalStatusArray}
                            onChange={(e) =>
                              this.setState({
                                desiredMaritalStatus:
                                  e.length === 0
                                    ? ""
                                    : Object.values(e).join(","),
                              })
                            }
                          >
                            <Option key="Single">Single</Option>
                            <Option key="Widowed">Widowed</Option>
                            <Option key="Divorced">Divorced</Option>
                          </Select>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1">
                        Caste :{" "}
                      </label>
                      <div className="col-md-9">
                        <div className="col-md-11">
                          <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="Please Select"
                            value={desiredCasteArray}
                            onChange={(e) =>
                              this.setState({
                                desiredCaste:
                                  e.length === 0
                                    ? ""
                                    : Object.values(e).join(","),
                              })
                            }
                          >
                            <Option value="Brahmin">Brahmin</Option>
                            <Option value="Kshatriya">Kshatriya</Option>
                            <Option value="Vaishya">Vaishya</Option>
                            <Option value="Shudra">Shudra</Option>
                          </Select>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1">
                        Gotra :{" "}
                      </label>
                      <div className="col-md-9">
                        <div className="col-md-11">
                          <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="Please Select"
                            value={desiredGotraArray}
                            onChange={(e) =>
                              this.setState({
                                desiredGotra:
                                  e.length === 0
                                    ? ""
                                    : Object.values(e).join(","),
                              })
                            }
                          >
                            <Option value="Agastya">Agastya</Option>
                            <Option value="Agni">Agni</Option>
                            <Option value="Angirasa">Angirasa</Option>
                            <Option value="Alambayan">Alambayan</Option>
                            <Option value="Aliman">Aliman</Option>
                            <Option value="Atreya">Atreya</Option>
                            <Option value="Awasthi">Awasthi</Option>
                            <Option value="Bachchas">Bachchas</Option>
                            <Option value="Bansal">Bansal</Option>
                            <Option value="Bhargava">Bhargava</Option>
                            <Option value="Bilas">Bilas</Option>
                            <Option value="Batish-Vats">Batish-Vats</Option>
                            <Option value="Bhardwaja">Bhardwaja</Option>
                            <Option value="Baghel">Baghel</Option>
                            <Option value="Chandramaharshi">
                              Chandramaharshi
                            </Option>
                            <Option value="Chathundi Maharshi">
                              Chathundi Maharshi
                            </Option>
                            <Option value="Chahar">Chahar</Option>
                            <Option value="Dahiya">Dahiya</Option>
                            <Option value="Deshastha">Deshastha</Option>
                            <Option value="Deval">Deval</Option>
                            <Option value="Dubey">Dubey</Option>
                            <Option value="Garg/Gargeya">Garg/Gargeya</Option>
                            <Option value="Gangotri">Gangotri</Option>
                            <Option value="Gautama">Gautama</Option>
                            <Option value="Gohel">Gohel</Option>
                            <Option value="Goyal">Goyal</Option>
                            <Option value="Harita">Harita</Option>
                            <Option value="Jadaun">Jadaun</Option>
                            <Option value="Kashyapa">Kashyapa</Option>
                            <Option value="Kaundiya">Kaundiya</Option>
                            <Option value="Katyayana">Katyayana</Option>
                            <Option value="Kaushal">Kaushal</Option>
                            <Option value="Kaushika">Kaushika</Option>
                            <Option value="Kayastha">Kayastha</Option>
                            <Option value="Khangura ">Khangura </Option>
                            <Option value="Kancharla">Kancharla</Option>
                            <Option value="Kothapalla">Kothapalla</Option>
                            <Option value="Vishwamitra">Vishwamitra</Option>
                            <Option value="Mittal">Mittal</Option>
                            <Option value="Mohiwal">Mohiwal</Option>
                            <Option value="Maudgalya">Maudgalya</Option>
                            <Option value="Munshi">Munshi</Option>
                            <Option value="Nagasya">Nagasya</Option>
                            <Option value="Nanda">Nanda</Option>
                            <Option value="Panchal">Panchal</Option>
                            <Option value="Parashara">Parashara</Option>
                            <Option value="Rathod">Rathod</Option>
                            <Option value="Rawal">Rawal</Option>
                            <Option value="Sankrithi">Sankrithi</Option>
                            <Option value="Saraswata">Saraswata</Option>
                            <Option value="Savarna">Savarna</Option>
                            <Option value="Shandilya">Shandilya</Option>
                            <Option value="Shaktri">Shaktri</Option>
                            <Option value="Shatamarshana">Shatamarshana</Option>
                            <Option value="Sheoran">Sheoran</Option>
                            <Option value="Shiva">Shiva</Option>
                            <Option value="Singhal">Singhal</Option>
                            <Option value="Srivatsa">Srivatsa</Option>
                            <Option value="Toppo">Toppo</Option>
                            <Option value="Tulyamahamuni">Tulyamahamuni</Option>
                            <Option value="Upreti">Upreti</Option>
                            <Option value="Vadhula">Vadhula</Option>
                            <Option value="Vaid">Vaid</Option>
                            <Option value="Vasishtha">Vasishtha</Option>
                            <Option value="Vats">Vats</Option>
                            <Option value="Vishwakarman">Vishwakarman</Option>
                            <Option value="Vishnu">Vishnu</Option>
                          </Select>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label1">
                        Gender :{" "}
                      </label>
                      <div className="col-md-9">
                        <div className="col-md-11">
                          <Select
                            mode="single"
                            style={{ width: "100%" }}
                            placeholder="Please Select"
                            value={this.state. desiredGender}
                            id="Profilegender"
                           
                            onChange={(e) =>
                              this.setState({
                                desiredGender:
                                  e.length === 0
                                    ? ""
                                    : Object.values(e).join(""),
                              })
                            }
                          >
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                            
                          </Select>
                        </div>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div>
                      <input
                        required
                        // onClick={
                        //   this.state.activationStatus === "INACTIVE"
                        //     ? this.saveChanges
                        //     : this.validate
                        // }
                        onClick={this.validate}
                        type="submit"
                        disabled={this.state.submitted}
                        className="btn btn-primary"
                        id="saveProfile"
                        value="Save Changes"
                      />

                      <input
                        required
                        onClick={this.validate}
                        type={paymentBtn}
                        disabled={this.state.submitted}
                        className="btn btn-success pull-right"
                        // id="gotoPay"
                        value="Proceed To Payment"
                      />
                      <div className="clearfix"> </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
           
          </div>
        </div>
      </>
    );
  }
}

export default ProfileEdit;
