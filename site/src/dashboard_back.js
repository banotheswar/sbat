import React, { Component } from "react";
import InnerBanner from "./components/common/innerBanner";
import ListingService from "./services/ListingService";
import TokenExpired from "./components/common/tokenExpired";
import { PictureFilled, HeartFilled } from "@ant-design/icons";
import "antd/dist/antd.css";
import {
  AutoComplete,
  Card,
  Typography,
  Space,
  Tag,
  Tooltip,
  message,
  Avatar,
  Input,
} from "antd";
import * as constant from "./constants";
import InterestService from "./services/InterestService";
import { emptyStatement } from "@babel/types";
import { Footer } from "antd/lib/layout/layout";

const { CheckableTag } = Tag;

const tagsData = ["Height", "Marital Status", "Caste", "Gotra"];
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.state = {
      profileList: null,

      interestArray: [],
      userprofile: [],
      searchItem: [""],
     diiredAgeGroup:"",
     desiredAgeGroup:"",
     desiredHeight:"",
     desiredCast:"",
     desiredGotra:""
    };
    console.log("searchItem", this.state.searchItem);
  }

  async fetchData(profileName = "", tagDetails = null) {
    return ListingService.fetchProfilesForUser(
      sessionStorage.getItem("userId"),
      profileName,
      tagDetails
    )
      .then((result) => {
        this.state.userprofile = result.data;
        console.log("result", result.data);
        console.log("this.state.userprofile", this.state.userprofile);
        return result.data;
      })
      .catch((error) => {
        if (error.toString().indexOf("401") === -1) {
          message.info("No profiles were found for your desired preferences.");
        }
      });
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
    this.fetchData().then((data) => {
      this.setState({ profileList: data });
      console.log("profiledata", this.state.profileList);
    });
    if (sessionStorage.getItem("status") === "INACTIVE") {
      localStorage.setItem("profileMsg", "activate");
      window.location = "/profile";
    }
    this.getInterests().then((data) => {
      this.setState({
        interestArray: data !== "" ? data.split(",") : this.state.interestArray,
      });
    });
  }

  render() {
    return (
      <div className="" style={{ marginTop: "50px" }}>
        <div
          className=""
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "40px",
          }}
        >
          <Input
            style={{
              width: "300px ",
              border: "red",
              boxSizing: "border-box",
              padding: "8px",
              border: "1px solid gray",
              textAlign: "center",
              boxShadow: "1px,1px,2px #333333",
              fontSize: "20px",
              color: "black",
            }}
            type="text"
            placeholder="Search Profile Names ...."
            className="border bg-primary"
            name="search"
            onChange={(e) => {
              this.setState({ searchItem: e.target.value });
            }}
          ></Input>
        </div>
        <div className="d-flex align-content-center" style={{display:"flex",marginLeft:"610px",textAlign: "center"}}>
<button className="btn btn-primary " value="desiredAgeGroup"onClick={(e)=>{this.setState({ searchItem:this.state.desiredAgeGroup })}}>AgeGroup</button>
<button className="btn btn-danger "onClick={()=>{this.setState({ searchItem:this.state.desiredHeight })}}>Height</button>
<button className="btn btn-info"onClick={()=>{this.setState({ searchItem:this.state.desiredCast })}}>Cast</button>
<button className="btn btn-warning "onClick={()=>{this.setState({ searchItem:this.state.desiredGotra })}}>Gotra</button>
        </div>

        <div className="mt-4"style={{marginTop:"50px"}}>
          {this.state.userprofile
            ?.filter((val) => {
              
              if (this.state.searchItem == "") {
                return val;
                
              } 
              else if (
                (val.firstName + " " + val.lastName)
                  .toLowerCase()
                  .includes(this.state.searchItem.toLowerCase())
              ) {
                return val;
              }
              else if((val.desiredAgeGroup).toLowerCase()
              .includes(this.state.searchItem.toLowerCase())){
                this.setState({desiredAgeGroup:val.desiredAgeGroup})
                return val

              }
              else if((val.desiredHeight).toLowerCase()
              .includes(this.state.searchItem.toLowerCase())){
                this.setState({desiredHeight:val.desiredHeight})
                return val

               }
             
              else if((val.desiredCaste).toLowerCase()
              .includes(this.state.searchItem.toLowerCase())){
                this.setState({desiredCast:val.desiredCaste})
                return val

              }
              else if((val.desiredGotra).toLowerCase()
              .includes(this.state.searchItem.toLowerCase())){
                this.setState({desiredGotra:val.desiredGotra})
                return val

              }
            })
            .map((item, index) => {
             
              return (
                
                <div className="">
                 
                  <div className="col-md-3 ">
                    <Card
                      className=""
                      title={[
                        item.firstName + " " + item.lastName + " ",
                        this.state.interestArray.includes(item.userId) ? (
                          <Tooltip title={"Interest Sent"}>
                            <HeartFilled
                              style={{ fontSize: "12px", color: "#FF0000" }}
                            />
                          </Tooltip>
                        ) : (
                          <></>
                        ),
                      ]}
                      key={item.id}
                      style={{ width: 270 }}
                    >
                      <ul className="profile_item">
                        <Tooltip title={"Go to Profile"}>
                          <a
                            href={
                              "/profile/" + item.profileNumber.toLowerCase()
                            }
                          >
                            <li className="profile_item-img m-1">
                              <Avatar
                                src={constant.AVATAR_PATH + item.avatarFileName}
                                size={75}
                                icon={<PictureFilled />}
                                shape="square"
                              />
                            </li>
                            <li className="profile_item-desc">
                              <div className="row">
                                <div className="col-sm-12">
                                  <p>
                                    {"Age : " + item.age} <br />
                                    {"Height : " + item.height + " Inches"}{" "}
                                    <br />
                                    {"Education : " +
                                      item.highestEducation}{" "}
                                    <br />
                                  </p>
                                </div>
                              </div>
                            </li>
                            <div className="clearfix"> </div>
                          </a>
                        </Tooltip>
                      </ul>
                    </Card>
                    <br />
                  </div>
                  <div></div>
                </div>
              );
            })}
        </div>
        <div className="" style={{ marginTop: "400px" }}></div>
      </div>
    );
  }
}
export default Dashboard;
