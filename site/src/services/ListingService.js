import axios from "axios";
import * as constant from "../constants";

class ListingService {
  fetchProfilesForUser(userId, profileName, tagDetails) {
    var endPoint = "";

    if (tagDetails === null) {
      if (profileName === "") {
        endPoint = "/getById?id=" + userId;
      } else {
        endPoint =
          "/getByIdAndProfileName?id=" + userId + "&name=" + profileName;
      }
      return axios.get(constant.LISTING_API_URL + endPoint, constant.config);
    } else {
      return axios.post(
        constant.LISTING_API_URL + "/getListByTags",
        tagDetails,
        constant.config
      );
    }
  }

  checkDesirable(profileUserId, viewerId) {
    return axios.get(
      constant.LISTING_API_URL +
        "/checkDesirable?id=" +
        profileUserId +
        "&viewer=" +
        viewerId,
      constant.config
    );
  }
}

export default new ListingService();
