import React, { Component } from "react";
import "antd/dist/antd.css";
import { message, Popconfirm, Button,Space } from "antd";
import InterestService from "../../services/InterestService";
import ListingService from "../../services/ListingService";
import Profile from "../../profile";

class InterestBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      loadable: false,
      popupMsg: false,
      submitted: false,
      notsubmitted:false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }
notInterst(){
 
  // console.log("this.props.profileUserId",this.toUserId)
  // console.log(" this.props.profileProfNum" ,this.toProfileNumber)
}
  onSubmit(e) {
    this.setState({
      popupMsg: false,
    });
    let interestData = {
      toUserId: this.props.profileUserId,
      fromUserId: sessionStorage.getItem("userId"),
      fromProfileNumber: sessionStorage.getItem("userProfileNumber"),
      fromEmail: sessionStorage.getItem("userEmail"),
      toProfileNumber: this.props.profileProfNum,
    };
    InterestService.save()
      .then((result) => {
        this.setState({
          loadable: false,
          clicked: false,
          submitted: true,
        });
        message.success("We've notified the user about your interest! ");
      })
      .catch((error) => {
        message.error("Something went wrong! Please try again!");
        this.setState({
          loadable: false,
          clicked: false,
        });
      });
  }

  onClick(e) {
    e.preventDefault();
    this.setState({
      clicked: true,
      loadable: true,
    });
    if (
      this.props.status !== "INACTIVE" &&
      sessionStorage.getItem("status") !== "INACTIVE"
    ) {
      ListingService.checkDesirable(
        this.props.profileUserId,
        sessionStorage.getItem("userId")
      )
        .then((result) => {
          this.setState({
            loadable: false,
          });
          this.onSubmit();
        })
        .catch((error) => {
          console.log(error);
          this.setState({ popupMsg: true });
        });
    } else {
      this.setState({
        loadable: false,
        clicked: false,
      });
      if (sessionStorage.getItem("status") === "INACTIVE") {
        message.info("This needs your profile to be activated first!");
      } else {
        message.info(
          "This user hasn't activated the profile yet. You might have to wait till then!"
        );
      }
    }
  }

  render() {
    console.log("this.props.profileUserId",this.toUserId)
  console.log(" this.props.profileProfNum" ,this.toProfileNumber)
    return (
      <Popconfirm
        visible={this.state.popupMsg}
        title="Your profile doesn't match with this person's preferences. Do you wish to continue?"
        onConfirm={this.onSubmit}
        onCancel={(e) =>
          this.setState({
            popupMsg: false,
            loadable: false,
          })
        }
        okText="Yes"
        cancelText="No"
      >
       <div style={{display:"flex"}}>
         <Space>
         <Button
          loading={this.state.loadable}
          type="primary"
          disabled={this.state.submitted}
          onClick={this.onClick}
        >
          {!this.state.submitted ? <>Show Interest</> : <>Interest Sent</>}
        </Button>
        <Button
          // loading={this.state.loadable}
          type="primary"
          // disabled={this.state.submitted}
          onClick={this.notInterst}
        >
          {!this.state. notsubmitted ? <>Not Show Interest</> : <>Interest Sent</>}
        </Button>
         </Space>
       </div>
      </Popconfirm>
    );
  }
}

export default InterestBtn;
