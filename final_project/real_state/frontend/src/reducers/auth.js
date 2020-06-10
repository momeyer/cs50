import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from "../actions/types.js";
import store from "../store.js";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      console.log("----- user loading ----- ");
      return {
        ...state,
        isLoading: true,
      };

    case USER_LOADED:
      console.log("-----   user loaded ----- ");
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        ...action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
      console.log("----- error ----- ");
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: null,
        isLoading: false,
        toke: null,
      };

    default:
      return state;
  }
}
