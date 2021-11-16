import axios from "axios";
import * as constant from "../constants";

class ProfileService {
  updateProfile(profileDetails) {
    return axios.post(
      constant.PROFILE_API_URL + "/save",
      profileDetails,
      constant.config
    );
  }

  getById(userId) {
    return axios.get(
      constant.PROFILE_API_URL + "/getById?id=" + userId,
      constant.config
    );
  }

  getByProfileNumber(profileNumber) {
    return axios.get(
      constant.PROFILE_API_URL +
        "/getByProfileNumber?profileNumber=" +
        profileNumber,
      constant.config
    );
  }

  uploadPhotos(formData) {
    return axios.post(
      constant.PROFILE_API_URL + "/photos",
      formData,
      constant.config
    );
  }

  deletePhoto(formData) {
    return axios.post(
      constant.PROFILE_API_URL + "/deletePhoto",
      formData,
      constant.config
    );
  }
}

export default new ProfileService();
