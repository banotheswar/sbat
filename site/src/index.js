import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

axios.interceptors.response.use(undefined, function (error) {
  if (error.toString().indexOf("401") !== -1) {
    sessionStorage.removeItem("token");
  } else {
    console.log("Error on Profile Page:" + error);
  }
  return Promise.reject(error);
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
