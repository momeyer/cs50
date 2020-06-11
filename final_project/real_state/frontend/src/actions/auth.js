import axios from "axios";
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from "./types";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: AUTH_ERROR });
    });
};



export const login = (username, password ) => (dispatch) => {
 
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
        alert("try again or register");
        dispatch({type:LOGIN_FAIL});
    });
};



export const logout = () => ( dispatch, getState ) => {
  
  axios
    .post("/api/auth/logout/",null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch( ( err ) => {
      alert('error')
    });
};


export const tokenConfig = getState => {

  const token = getState().authReducer.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config

}


export const registerUser = ({username, password, email}) => (dispatch) => {

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username, password, email });

  axios
    .post("/api/auth/register", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      alert("try again");
      dispatch({ type: REGISTER_FAIL });
    });
};
