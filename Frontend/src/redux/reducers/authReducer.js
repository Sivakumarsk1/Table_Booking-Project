import { SET_TOKEN, LOGOUT } from "../actions/authAction";
import Cookies from "js-cookie";

const initialState = {
  token: Cookies.get("authToken") || null  // Get token from cookies on page reload
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };

    case LOGOUT:
      return {
        ...state,
        token: null
      };

    default:
      return state;
  }
};

export default authReducer;
