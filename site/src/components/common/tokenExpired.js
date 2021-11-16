import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "antd/dist/antd.css";

import { notification, Alert, message } from "antd";
import { expaire } from "./Notification";

class TokenExpired extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
   
  render() {
    let msg=true
    

    if (this.props.msg) {
      sessionStorage.clear();
      localStorage.clear();
      msg=this.props.msg
     
      
     
    } else {
      msg = "Session expired or uninitialized! Please Login!";
    }
    if (!sessionStorage.getItem("token")) {
      return (
      
          <Redirect
            to={{
              pathname: "/",
       
      }}
          />
          
      );
    }

    return null
  }
}

export default TokenExpired;
