import axios from "axios";
import * as constant from "../constants";
class UserService {
  getUsers() {
    return axios.get(constant.USER_API_URL);
  }

  saveUser(User) {
    return axios.post(constant.USER_API_URL + "/create", User, constant.config);
  }
}

export default new UserService();
