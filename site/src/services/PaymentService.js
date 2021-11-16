import axios from "axios";
import * as constant from "../constants";

class PaymentService {
  makePayment(paymentDetails) {
    return axios.post(
      constant.PAYMENT_API_URL + "/payment",
      paymentDetails,
      constant.config
    );
  }

  getById(paymentId) {
    return axios.get(
      constant.PAYMENT_API_URL + "/" + paymentId,
      constant.config
    );
  }
}

export default new PaymentService();
