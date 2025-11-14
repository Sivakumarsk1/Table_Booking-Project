import Cookies from "js-cookie";

export const SET_TOKEN = "SET_TOKEN";
export const LOGOUT = "LOGOUT";

// Action to set token in Redux and Cookies
export const setToken = (token) => {
  Cookies.set("authToken", token, { expires: 1 }); // Store in cookie (expires in 1 day)
  return {
    type: SET_TOKEN,
    payload: token
  };
};

// Action to logout and clear token
export const logout = () => {
  Cookies.remove("authToken"); // Remove token from cookies
  return {
    type: LOGOUT
  };
};
