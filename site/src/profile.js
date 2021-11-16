import React, { Component } from "react";
import InnerBanner from "./components/common/innerBanner";
import Breadcrumbs from "./components/common/breadcrumbs";
import ProfileService from "./services/ProfileService";
import TokenExpired from "./components/common/tokenExpired";
import "antd/dist/antd.css";
import { Avatar, Button, message, Space, Alert, notification } from "antd";
import { UserOutlined, LinkOutlined } from "@ant-design/icons";
import * as constant from ".//constants";
import InterestBtn from "./components/common/interestBtn";
import Thumbnail from "./components/common/thumbnail";
import InterestService from "./services/InterestService";

class Profile extends Component {
  constructor() {
    super();
    this.form = React.createRef();
    this.state = {
      profileImage: "",
      profileUserId: "",
      horoscopeImage: "",
      photo1Image: "",
      photo2Image: "",
      profileFor: "",
      profileNumber: "NA",
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
      redirect: null,
      btnDisplay: "none",
      profileUserIdionStatus: "INACTIVE",
      isViewerSelf: true,
      interestBtnClick: false,
      interestBtnLoadable: false,
      popupMsg: false,
      caste: "",
      gotra: "",
      nakshatra: "",
      rasi: "",
      desiredCaste: "",
      desiredGotra: "",
      desiredGender: "",
      interestArray: [],
    };
  }

  async fetchData() {
    if (this.props.match.params.profileNumber) {
      const profileNo = this.props.match.params.profileNumber;
      return ProfileService.getByProfileNumber(profileNo)
        .then((result) => {
          if (result.data.profile.userId === sessionStorage.getItem("userId")) {
            this.setState({ isViewerSelf: true });
          } else {
            this.setState({ isViewerSelf: false });
          }
          return result.data;
        })
        .catch((error) => {
          if (error.toString().indexOf("401") === -1) {
            window.location = "/commonLauncher";
          }
        });
    } else {
      return ProfileService.getById(sessionStorage.getItem("userId")).then(
        (result) => {
          return result.data;
        }
      );
    }
  }

  async getInterests() {
    return InterestService.getById(sessionStorage.getItem("userId")).then(
      (result) => {
        return result.data.interest;
      }
    );
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (localStorage.getItem("profileMsg") === "activate") {
      message.warn("Please activate your profile to view this page!");
      localStorage.removeItem("profileMsg");
    }
    if (localStorage.getItem("profileMsg") === "uneditable") {
      // message.warn(<div style={{fontFamily:"revert",fontSize:"30px"}} className="bg-warning p-4" >"You cannot directly edit your profile once activated!"</div>)
      // openNotification();
      localStorage.removeItem("profileMsg");
    }
    if (localStorage.getItem("redirectedFromCheckout")) {
      sessionStorage.removeItem("token");
      localStorage.setItem("transactionExpired", true);
      window.location.pathname = "/";
    }
    if (
      this.props.match.params.profileNumber &&
      sessionStorage.getItem("status") === "INACTIVE"
    ) {
      localStorage.setItem("profileMsg", "activate");
      window.location.pathname = "/profile";
    }
    this.fetchData().then((data) => {
      if (data.artifact) {
        this.setState({
          profileImage: constant.AVATAR_PATH + data.artifact.avatarFileName,
          horoscopeImage:
            constant.HOROSCOPE_PATH + data.artifact.horoscopeFileName,
          btnDisplay: data.artifact.horoscopeFileName === "" ? "none" : "block",
          photo1Image: constant.PHOTO1_PATH + data.artifact.photo1FileName,
          photo2Image: constant.PHOTO2_PATH + data.artifact.photo2FileName,
        });
      }
      if (data.profile) {
        var profile = data.profile;
        console.log("profile data", profile);
        if (this.state.isViewerSelf) {
          localStorage.setItem("desiredHeight", profile.desiredHeight);
          localStorage.setItem("desiredAgeGroup", profile.desiredAgeGroup);
          // localStorage.setItem("desiredGender", profile.desiredGender);
          localStorage.setItem(
            "desiredMaritalStatus",
            profile.desiredMaritalStatus
          );
          localStorage.setItem("desiredCaste", profile.desiredCaste);
          localStorage.setItem("desiredGotra", profile.desiredGotra);
          localStorage.setItem("desiredGender", profile.desiredGender);
        }
        this.setState({
          profileNumber:
            profile.profileNumber === "" ? "NA" : profile.profileNumber,
          profileFor:
            profile.profileFor === "" ? "NA" : "My " + profile.profileFor,
          firstName:
            profile.firstName === "" ? "<First Name>" : profile.firstName,
          lastName: profile.lastName === "" ? "<Last Name>" : profile.lastName,
          gender: profile.gender === "" ? "<Gender>" : profile.gender,
          dob: profile.dob === "" ? "<Date of Birth>" : profile.dob,
          height:
            profile.height === "" ? "<Height>" : profile.height + " inches",
          maritalStatus:
            profile.maritalStatus === ""
              ? "<Marital Status>"
              : profile.maritalStatus,
          motherName: profile.motherName === "" ? "<Name>" : profile.motherName,
          motherAge: profile.motherAge === "" ? "<Age>" : profile.motherAge,
          motherOccupation:
            profile.motherOccupation === ""
              ? "<Occupation>"
              : profile.motherOccupation,
          fatherName: profile.fatherName === "" ? "<Name>" : profile.fatherName,
          fatherAge: profile.fatherAge === "" ? "<Age>" : profile.fatherAge,
          fatherOccupation:
            profile.fatherOccupation === ""
              ? "<Occupation>"
              : profile.fatherOccupation,
          familyIncome:
            profile.familyIncome === ""
              ? "<Family Income>"
              : profile.familyIncome,
          familyValues:
            profile.familyValues === ""
              ? "<Family Values"
              : profile.familyValues,
          city: profile.city === "" ? "<City>" : profile.city,
          statee: profile.state === "" ? "<State>" : profile.state,
          highestEducation:
            profile.highestEducation === ""
              ? "<Highest Education>"
              : profile.highestEducation,
          ugDegree: profile.ugDegree === "" ? "<UG Degree>" : profile.ugDegree,
          ugCollege:
            profile.ugCollege === "" ? "<UG College>" : profile.ugCollege,
          pgDegree: profile.pgDegree === "" ? "<PG Degree>" : profile.pgDegree,
          pgCollege:
            profile.pgCollege === "" ? "<PG College>" : profile.pgCollege,
          occupation:
            profile.occupation === "" ? "<Occupation>" : profile.occupation,
          income: profile.income === "" ? "<Income>" : profile.income,
          desiredAgeGroup:
            profile.desiredAgeGroup === "" ? "NA" : profile.desiredAgeGroup,
          desiredHeight:
            profile.desiredHeight === ""
              ? "NA"
              : profile.desiredHeight + " inches",
          desiredMaritalStatus:
            profile.desiredMaritalStatus === ""
              ? "NA"
              : profile.desiredMaritalStatus,
          activationStatus: profile.status === "" ? "INACTIVE" : profile.status,
          caste: profile.caste === "" ? "<Caste>" : profile.caste,
          gotra: profile.gotra === "" ? "<Gotra>" : profile.gotra,
          rasi: profile.rasi === "" ? "<Rasi>" : profile.rasi,
          nakshatra:
            profile.nakshatra === "" ? "<Nakshatra>" : profile.nakshatra,
          desiredCaste:
            profile.desiredCaste === "" ? "NA" : profile.desiredCaste,
          desiredGotra:
            profile.desiredGotra === "" ? "NA" : profile.desiredGotra,

          desiredGender:
            profile.desiredGender === ""
              ? "<Profilegender>"
              : profile.desiredGender,

          profileUserId: profile.userId,
        });
      }
    });
    this.getInterests().then((data) => {
      this.setState({
        interestArray: data !== "" ? data.split(",") : this.state.interestArray,
      });
    });
  }

  render() {
    let stateValue;
    switch (this.state.statee) {
      case "AL":
        stateValue = "Alabama";
        break;
      case "AK":
        stateValue = "Alaska";
        break;
      case "AZ":
        stateValue = "Arizona";
        break;
      case "AR":
        stateValue = "Arkansas";
        break;
      case "CA":
        stateValue = "California";
        break;
      case "CO":
        stateValue = "Colorado";
        break;
      case "CT":
        stateValue = "Connecticut";
        break;
      case "DE":
        stateValue = "Delaware";
        break;
      case "DC":
        stateValue = "District Of Columbia";
        break;
      case "FL":
        stateValue = "Florida";
        break;
      case "GA":
        stateValue = "Georgia";
        break;
      case "HI":
        stateValue = "Hawaii";
        break;
      case "ID":
        stateValue = "Idaho";
        break;
      case "IL":
        stateValue = "Illinois";
        break;
      case "IN":
        stateValue = "Indiana";
        break;
      case "IA":
        stateValue = "Iowa";
        break;
      case "KS":
        stateValue = "Kansas";
        break;
      case "KY":
        stateValue = "Kentucky";
        break;
      case "LA":
        stateValue = "Louisiana";
        break;
      case "ME":
        stateValue = "Maine";
        break;
      case "MD":
        stateValue = "Maryland";
        break;
      case "MA":
        stateValue = "Massachusetts";
        break;
      case "MI":
        stateValue = "Michigan";
        break;
      case "MN":
        stateValue = "Minnesota";
        break;
      case "MS":
        stateValue = "Mississippi";
        break;
      case "MO":
        stateValue = "Missouri";
        break;
      case "MT":
        stateValue = "Montana";
        break;
      case "NE":
        stateValue = "Nebraska";
        break;
      case "NV":
        stateValue = "Nevada";
        break;
      case "NH":
        stateValue = "New Hampshire";
        break;
      case "NJ":
        stateValue = "New Jersey";
        break;
      case "NM":
        stateValue = "New Mexico";
        break;
      case "NY":
        stateValue = "New York";
        break;
      case "NC":
        stateValue = "North Carolina";
        break;
      case "ND":
        stateValue = "North Dakota";
        break;
      case "OH":
        stateValue = "Ohio";
        break;
      case "OK":
        stateValue = "Oklahoma";
        break;
      case "OR":
        stateValue = "Oregon";
        break;
      case "PA":
        stateValue = "Pennsylvania";
        break;
      case "RI":
        stateValue = "Rhode Island";
        break;
      case "SC":
        stateValue = "South Carolina";
        break;
      case "SD":
        stateValue = "South Dakota";
        break;
      case "TN":
        stateValue = "Tennessee";
        break;
      case "TX":
        stateValue = "Texas";
        break;
      case "UT":
        stateValue = "Utah";
        break;
      case "VT":
        stateValue = "Vermont";
        break;
      case "VA":
        stateValue = "Virginia";
        break;
      case "WA":
        stateValue = "Washington";
        break;
      case "WV":
        stateValue = "West Virginia";
        break;
      case "WI":
        stateValue = "Wisconsin";
        break;
      case "WY":
        stateValue = "Wyoming";
        break;
      default:
        stateValue = "<State>";
        break;
    }

    return (
      <>
        <TokenExpired />
        <InnerBanner />

        {sessionStorage.getItem("status") === "ACTIVE" ? (
          <Breadcrumbs title={["Profile"]} />
        ) : (
          <></>
        )}
        <div className="w3ls-list">
          <div className="container">
            <h2>Profile</h2>
            <div
              className="col-md-9 profiles-list-agileits"
              style={{ marginLeft: "12.5%" }}
            >
              <div className="single_w3_profile">
                <div className="agileits_profile_image">
                  <div>
                    <Avatar
                      size={200}
                      icon={<UserOutlined />}
                      src={this.state.profileImage}
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
                        photo1={this.state.photo1Image}
                        photo2={this.state.photo2Image}
                        isViewerSelf={this.state.isViewerSelf}
                      /> */}
                      <Space>
                        {" "}
                        <Avatar
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
                        />
                      </Space>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-sm-3">
                      {this.state.isViewerSelf ? (
                        <Button
                          type="primary"
                          disabled={this.state.activationStatus === "ACTIVE"}
                          onClick={(e) =>
                            (window.location.pathname = "/profileEdit")
                          }
                        >
                          {this.state.activationStatus === "INACTIVE"
                            ? "Update & Pay"
                            : "Edit Profile"}
                        </Button>
                      ) : this.state.interestArray.includes(
                          this.state.profileUserId
                        ) ? (
                        <Button type="primary" disabled="true">
                          Interest Sent
                        </Button>
                      ) : (
                        <InterestBtn
                          status={this.state.activationStatus}
                          profileUserId={this.state.profileUserId}
                          profileProfNum={this.state.profileNumber}
                        />
                      )}
                      
                    </div>
                    <div className="col-sm-3">
                      <Button
                        type="primary"
                        style={{ display: this.state.btnDisplay }}
                        onClick={(e) =>
                          (window.location.href = this.state.horoscopeImage)
                        }
                      >
                        {<LinkOutlined />}
                        Horoscope
                      </Button>
                    </div>
                  </div>
                </div>
                <br />
                <div className="clearfix"></div>
              </div>
              <div
                className="profile_w3layouts_details"
                style={{ paddingLeft: "8%" }}
              >
                <div className="agileits_aboutme">
                  <h5>Brief Details:</h5>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">
                      {" "}
                      Full Name:{" "}
                    </label>
                    <div className="col-md-9">
                      <div className="col-md-10">
                        {this.state.firstName + " " + this.state.lastName}
                      </div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1"> Gender: </label>
                    <div className="col-md-9">
                      <div className="col-md-5">{this.state.gender}</div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">
                      {" "}
                      Date of Birth:{" "}
                    </label>
                    <div className="col-md-9">
                      <div className="col-md-5">{this.state.dob}</div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">
                      {" "}
                      Height (in inches):{" "}
                    </label>
                    <div className="col-md-9">
                      <div className="col-md-5">{this.state.height}</div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">
                      {" "}
                      Marital Status:{" "}
                    </label>
                    <div className="col-md-9">
                      <div className="col-md-5">{this.state.maritalStatus}</div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <h5>Family Details:</h5>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">Mother : </label>
                    <div className="col-md-9">
                      <div className="col-md-10">
                        {this.state.motherName +
                          ", " +
                          this.state.motherAge +
                          ", " +
                          this.state.motherOccupation}
                      </div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">Father : </label>
                    <div className="col-md-9">
                      <div className="col-md-10">
                        {this.state.fatherName +
                          ", " +
                          this.state.fatherAge +
                          ", " +
                          this.state.fatherOccupation}
                      </div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">
                      Family Income (in USD):{" "}
                    </label>
                    <div className="col-md-9">
                      <div className="col-md-5">{this.state.familyIncome}</div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">
                      City/State :{" "}
                    </label>
                    <div className="col-md-9">
                      <div className="col-md-10">
                        {this.state.city +
                          ", " +
                          (this.state.statee != null ? stateValue : null)}
                      </div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">
                      Family Values :{" "}
                    </label>
                    <div className="col-md-9">
                      <div className="col-md-5">{this.state.familyValues}</div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <h5>Education Details:</h5>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">
                      Highest Level of Education :{" "}
                    </label>
                    <div className="col-md-9">
                      <div className="col-md-5">
                        {this.state.highestEducation}
                      </div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">
                      Bachelor's Degree :{" "}
                    </label>
                    <div className="col-md-9">
                      <div className="col-md-5">{this.state.ugDegree}</div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">
                      School/College :{" "}
                    </label>
                    <div className="col-md-9">
                      <div className="col-md-5">{this.state.ugCollege}</div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">
                      Graduate Degree :{" "}
                    </label>
                    <div className="col-md-9">
                      <div className="col-md-5">{this.state.pgDegree}</div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">
                      Graduate School :{" "}
                    </label>
                    <div className="col-md-9">
                      <div className="col-md-5">{this.state.pgCollege}</div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <h5>Employment Details:</h5>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">
                      Occupation :{" "}
                    </label>
                    <div className="col-md-9">
                      <div className="col-md-5">{this.state.occupation}</div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">
                      Annual Income (in USD):{" "}
                    </label>
                    <div className="col-md-9">
                      <div className="col-md-5">{this.state.income}</div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <h5>Optional Details:</h5>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">Caste : </label>
                    <div className="col-md-9">
                      <div className="col-md-5">{this.state.caste}</div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">Gotra: </label>
                    <div className="col-md-9">
                      {" "}
                      <div className="col-md-5">{this.state.gotra}</div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">Rasi : </label>
                    <div className="col-md-9">
                      <div className="col-md-11">{this.state.rasi}</div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">
                      Nakshatra :{" "}
                    </label>
                    <div className="col-md-9">
                      <div className="col-md-11">{this.state.nakshatra}</div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <h5>Desired Partner Preferences:</h5>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">Age : </label>
                    <div className="col-md-9">
                      <div className="col-md-5">
                        {this.state.desiredAgeGroup}
                      </div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">
                      Height (in inches) :{" "}
                    </label>
                    <div className="col-md-9">
                      {" "}
                      <div className="col-md-5">{this.state.desiredHeight}</div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">
                      Marital Status :{" "}
                    </label>
                    <div className="col-md-9">
                      <div className="col-md-11">
                        {this.state.desiredMaritalStatus}
                      </div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">Caste : </label>
                    <div className="col-md-9">
                      <div className="col-md-5">{this.state.desiredCaste}</div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">Gotra : </label>
                    <div className="col-md-9">
                      {" "}
                      <div className="col-md-5">{this.state.desiredGotra}</div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="form-group profileFields">
                    <label className="col-sm-3 control-label1">Gender:</label>
                    <div className="col-md-9">
                      {" "}
                      <div className="col-md-5">{this.state.desiredGender}</div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div style={{ paddingBottom: "3%" }}>
                    <Button
                      type="primary"
                      disabled={this.state.activationStatus === "ACTIVE"}
                      onClick={(e) =>
                        (window.location.pathname = "/profileEdit")
                      }
                    >
                      {this.state.activationStatus === "INACTIVE"
                        ? "Edit Profile"
                        : "Edit profile"}
                    </Button>

                   
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
            <div className="clearfix"> </div>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
