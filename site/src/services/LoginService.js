import axios from "axios";
import * as constant from "../constants";
class LoginService {
  getUsers() {
    return axios.get(constant.LOGIN_API_URL);
  }

  login(credentials) {
    return axios.post(constant.LOGIN_API_URL + "/signin", credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  forgotPassword(email) {
    return axios.post(
      constant.LOGIN_API_URL + "/forgotPassword",
      { email: email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export default new LoginService();
