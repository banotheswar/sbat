export const BASE_URL = "http://localhost/sbatMatrimony/";
// export const BASE_URL = "http://matrimony.tribandtech.com/";
export const USER_API_URL = BASE_URL + "server/user";
export const LOGIN_API_URL = BASE_URL + "server/login";
export const PROFILE_API_URL = BASE_URL + "server/profile";
export const LISTING_API_URL = BASE_URL + "server/listing";
export const INTEREST_API_URL = BASE_URL + "server/interest";
export const CONTACTUS_API_URL = BASE_URL + "server/contactUs";
export const AVATAR_PATH = BASE_URL + "server/writable/uploads/avatar/";
export const HOROSCOPE_PATH = BASE_URL + "server/writable/uploads/horoscope/";
export const PHOTO1_PATH = BASE_URL + "server/writable/uploads/photo1/";
export const PHOTO2_PATH = BASE_URL + "server/writable/uploads/photo2/";
export const PAYMENT_API_URL = BASE_URL + "server/payment";
// export const CAPTCHA_SITE_KEY = "6LdhP6EcAAAAAPhCm6DPr5Mq6RE1N4RAb0HAUeEZ"; //server (temp)
export const CAPTCHA_SITE_KEY = "6LenQ_0UAAAAANQFoQ7JdbzMuPVvYWppoxiT2_zb"; //localhost
export const CAPTCHA_SECRET_KEY = "6LdhP6EcAAAAAKIN5NiUDEE8XViFXrKan5yOxAOP";
export const CHECKOUT_APPROVED_URL =
  PAYMENT_API_URL + "/success/"; /*must add uniqueID here */
export const CHECKOUT_DECLINED_URL =
  PAYMENT_API_URL + "/failed/"; /*must add uniqueID here */
export const FALLBACK_IMAGE = "/assets/images/fallback.png";
export const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
};

export const avatarProps = {
  name:
    sessionStorage.getItem("userName") +
    "_" +
    sessionStorage.getItem("userId") +
    "_" +
    "avatar",
  action: BASE_URL + "server/payment/avatar",
  headers: {
    authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
};
