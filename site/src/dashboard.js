import React, { Component } from "react";
import InnerBanner from "./components/common/innerBanner";
import ListingService from "./services/ListingService";
import TokenExpired from "./components/common/tokenExpired";
import { PictureFilled, HeartFilled } from "@ant-design/icons";
import Notification, { pop, pop2 } from './components/common/Notification'
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
  Alert
} from "antd";
import * as constant from "./constants";
import InterestService from "./services/InterestService";
import { emptyStatement } from "@babel/types";


import { notification } from "antd";
import popup from './dashbord'

const { CheckableTag } = Tag;

const tagsData = ["Height", "Marital Status", "Caste", "Gotra"];
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.state = {
      profileList: null,
      searchBoxOptions: [],
      selectedProfileName: "",
      listUpdateCount: 0,
      selectedTags: [],
      searchValue: "",
      refreshByTags: true,
      refreshByName: true,
      interestArray: [],
    
      
     
    };
    console.log("searchItem",this.state.searchItem)
    this.sliceIntoChunks = this.sliceIntoChunks.bind(this);
    this.options = props.options;
  }
  

  async fetchData(profileName = "", tagDetails = null) {
    return ListingService.fetchProfilesForUser(
      sessionStorage.getItem("userId"),
      profileName,
      tagDetails
    )
      .then((result) => {
       
        return result.data;
      })
      .catch((error) => {
        if (error.toString().indexOf("401") === -1) {
          
          
          // message.info("No profiles were found for your desired preferences.");
          pop2();
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

  sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  componentDidMount() {
    
    window.scrollTo(0, 0);
    this.fetchData().then((data) => {
      this.setState({ profileList: data });
      console.log("profiledata",this.state.profileList)
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

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.selectedProfileName !== prevState.selectedProfileName &&
      this.state.refreshByName
    ) {
      this.fetchData(this.state.selectedProfileName, null).then(( data) => {
        this.setState({ profileList:data });
        console.log("anotherdata",this.state.profileList)
      });
    }
    if (
      this.state.selectedTags !== prevState.selectedTags &&
      this.state.refreshByTags
    ) {
      this.setState({
        searchValue: "",
        selectedProfileName: this.state.profileList,
        refreshByName: false,
      });
      let tagDetails = null;
      if (localStorage.getItem("profileGender") !== "") {
        tagDetails = {
          id: sessionStorage.getItem("userId"),
          gender: localStorage.getItem("profileGender"),
          desiredHeight: localStorage.getItem("desiredHeight"),
          desiredAgeGroup: localStorage.getItem("desiredAgeGroup"),
          desiredMaritalStatus: localStorage.getItem("desiredMaritalStatus"),
          desiredCaste: localStorage.getItem("desiredCaste"),
          desiredGotra: localStorage.getItem("desiredGotra"),
          showHeight: this.state.selectedTags.includes("Height") ? true : false,
          showMaritalStatus: this.state.selectedTags.includes("Marital Status")
            ? true
            : false,
          showGotra: this.state.selectedTags.includes("Gotra") ? true : false,
          showCaste: this.state.selectedTags.includes("Caste") ? true : false,
        };
      }
      this.fetchData("", tagDetails).then((data) => {
        this.setState({ profileList: data });
       
      });
    }
  }

  handleTagChange(tag, checked) {
    if (!this.state.refreshByTags) {
      this.setState({
        refreshByTags: true,
      });
    }
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
   


    const { Text } = Typography;
    let optionsArray = [];
    let cardArray = [];
    let cardArray1 = [];
    
    console.log("cardarray1",cardArray1)
    let searchSpace;
    let { listUpdateCount, interestArray } = this.state;
    const { selectedTags } = this.state; 
    
    if (this.state.profileList) {
      this.state.profileList.map(function (profile, i) {
        if (listUpdateCount === 0) {
         
          optionsArray.push(profile.firstName + " " + profile.lastName);
      }
        cardArray1.push(profile.age,profile.avatarFileName);
        cardArray.push( 
          
          <div className="col-md-3">
            <Card
              title={[
                profile.firstName + " " + profile.lastName + " ",
                interestArray.includes(profile.userId) ? (
                  <Tooltip title={"Interest Sent"}>
                    <HeartFilled
                      style={{ fontSize: "12px", color: "#FF0000" }}
                    />
                  </Tooltip>
                ) : (
                  <></>
                ),
              ]}
              key={profile.id}
              style={{ width: 270 }}
            >
              <ul className="profile_item">
                <Tooltip title={"Go to Profile"}>
                  <a href={"/profile/" + profile.profileNumber.toLowerCase()}>
                    <li className="profile_item-img m-1">
                      <Avatar
                        src={constant.AVATAR_PATH + profile.avatarFileName}
                        size={75}
                        icon={<PictureFilled />}
                        shape="square"
                      />
                    </li>
                    <li className="profile_item-desc">
                      <div className="row">
                        <div className="col-sm-12">
                          <p>
                            
                            {"Age : " + profile.age} <br />
                            {"Height : " + profile.height + " Inches"} <br />
                            {"Education : " + profile.highestEducation} <br />
                             
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
        );
      });
     
      if (listUpdateCount === 0) {
        this.options = optionsArray;
      }
      let chunkedArray = this.sliceIntoChunks(cardArray, 4);
      console.log("chunkarray",chunkedArray)
      searchSpace = (
        <>
    
     

          {chunkedArray.map(function (card, i) {
            return (
              <>
             
                {card}
                <br />
              </>
            );
          })}
        </>
      );
    } else {
      searchSpace = (
        <Text
          type="secondary"
          style={{ display: "flex", justifyContent: "center" }}
        >
          Nothing to Show
        </Text>
      );
    }

    const onSearch = (searchText) => {
      try {
        this.setState({
          searchValue: searchText,
        });
        if (searchText !== "") {
          const currentOptionsArray = this.options.filter(
            (element) =>
            
              element.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
              
          );
          this.setState({
            searchBoxOptions: currentOptionsArray.map(function (val, i) {
              
              return console.log("search value",{ value: val }) ,{ value: val };
            }),
           
          });
         
        }
      } catch (error) {}
    };

    const onSelect = (data) => {
      this.setState({
        searchValue: data,
        refreshByName: true,
        selectedProfileName: data,
        listUpdateCount: listUpdateCount + 1,
        refreshByTags: false,
        selectedTags: [],
      });
    };

    const onChange = (data) => {
      this.setState({
        searchValue: data,
      });
      if (data === "" || data === undefined) {
        this.setState({
          selectedProfileName: data,
          refreshByName: true,
          listUpdateCount: 0,
          searchBoxOptions: [],
          refreshByTags: true,
          selectedTags: ["Height", "Marital Status", "Caste", "Gotra"],
        });
      }
    };
    return (
      <>
        <TokenExpired />
        <InnerBanner />
        <div className="w3ls-list">
          <div className="container">
            <h2 style={{ marginBottom: "27px", marginTop: "-35px" }}></h2>
            <div className="col-md-12 profiles-list-agileits">
              <div className="row">
                <div
                  className="col-xs-12"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Space direction="horizontal" align="center">
                    <AutoComplete
                      value={this.state.searchValue}
                      allowClear="true"
                      options={this.state.searchBoxOptions}
                      style={{ width: 300 }}
                      onSelect={onSelect}
                      onSearch={onSearch}
                      onChange={onChange}
                      notFoundContent="No Result(s) Found"
                      placeholder="Search Profile By Name"
                    />
                  </Space>
                </div>
              </div>
              <br />
              <br />
              <div className="row">
                <div
                  className="col-xs-12"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Space direction="horizontal" align="center">
                    <Tooltip title={"Age Group is mandatory"}>
                      <Tag color="#f50">Age Group</Tag>
                    </Tooltip>
                    {tagsData.map((tag) => (
                      <Tooltip title={"Check/Uncheck " + tag}>
                        <CheckableTag
                          key={tag}
                          
                          checked={selectedTags.indexOf(tag) > -1}
                          onChange={(checked) =>
                            this.handleTagChange(tag, checked)
                          }
                        >
                          {tag}
                        </CheckableTag>
                      </Tooltip>
                    ))}
                  </Space>
                </div>
              </div>
              <br />
              <br />

              <div className="row">{searchSpace}</div>
            </div>
            <div className="clearfix"> </div>
          </div>
        </div>
      </>
    );
                        
                        }
                      }



export default Dashboard;



