import "antd/dist/antd.css";
import React from "react";
import { notification } from "antd";
export const pop = () => {
  notification.open({
    message: <div className=""style={{fontWeight:"bold"}}>Logout</div>,
    description: <div style={{fontSize:"20px"}}> You've successfully logged out!</div>,
    style: {
      placement: "topLeft",

      backgroundColor: "#54c064",

      fontStyle: "revert",
      
    },
  });
};


export const pop2 = () => {
  notification.open({
    message: <div style={{fontWeight:"bold"}}>Edit Profile</div>,
    description:<div style={{fontSize:"20px"}}>No profiles were found for your desired preferences.</div>,
    style: {
      placement: "topLeft",

      backgroundColor: "#ff8282",

      fontStyle: "revert",
      
    },
  });
};