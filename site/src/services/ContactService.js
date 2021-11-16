import axios from "axios";
import * as constant from "../constants";

class InterestService {
  save(data) {
    return axios.post(
      constant.CONTACTUS_API_URL + "/save",
      data,
      constant.config
    );
  }
}

export default new InterestService();
