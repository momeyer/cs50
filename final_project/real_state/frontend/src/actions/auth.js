import axios from "axios";
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS } from "./types";

export const loadUser = () => (dispatch, getState) => {
  console.log("----- load User CALLED ----- ", dispatch);
  dispatch({ type: USER_LOADING });

  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .get("/api/auth/user", config)
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
      .catch( ( err ) => {
        dispatch( {type: AUTH_ERROR});
    });
};

export const login = (username, password ) => (dispatch) => {
  console.log("----- LOGIN ----- ", dispatch);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
    
  const body = JSON.stringify({username, password})

  axios
    .post("/api/auth/login",body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
      .catch( ( err ) => {
        dispatch({type:LOGIN_FAIL});
    });
};
