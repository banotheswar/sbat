import axios from "axios";
import * as constant from "../constants";

class InterestService {
  save(interestDetails) {
    return axios.post(
      constant.INTEREST_API_URL + "/save",
      interestDetails,
      constant.config
    );
  }

  getById(id) {
    return axios.get(
      constant.INTEREST_API_URL + "/getById?id=" + id,
      constant.config
    );
  }
}

export default new InterestService();
