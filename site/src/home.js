import React, { Component, useState } from "react";
import Login from "./components/login";
import Signup from "./components/signup";
import { message } from "antd";
import SoulMateDiv from "./components/common/soulmateDiv";
import { findByLabelText } from "@testing-library/dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // msg: "",
      show:true
    };
  }

  componentDidMount() {
    if (localStorage.getItem("transactionExpired")) {
      message.error("Transaction Expired!");
      localStorage.removeItem("transactionExpired");
    }
    if (this.props.location.state !== undefined) {
      const displaytext = this.props.location.state.message;
      if (displaytext?.toString().indexOf("Session") !== -1) {
        message.error(displaytext);
      } else {
        message.success({
          content: displaytext,
          class: "text-center",
        });
        if (!localStorage.getItem("firstLoad")) {
          //if not reloaded once, then set firstload to true
          localStorage["firstLoad"] = true;

          window.location.reload();
        } else localStorage.removeItem("firstLoad");
      }
    }
  }
//style={{backgroundColor:"red",marginLeft:"700px"}}
  render() {
    
   
    
    return (
      <>
      
        <div className="w3layouts-banner" id="home">
          <div className="container">
            <div className="clearfix"></div>
            {this.state.show ?<Signup message={this.setMessage} login={()=>this.setState({show:false})}/>:
            <div className="float-right" > <Login register={()=>this.setState({show:true})}/></div>}
            
           
          </div>
          {/* <div className=""> <Login /></div> */}
        </div>
        <SoulMateDiv />
      </>
    );
  }
}
export default Home;
