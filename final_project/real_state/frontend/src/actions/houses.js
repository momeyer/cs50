import axios from "axios";
import {
  GET_HOUSES,
  UPDATE_HOUSE_SEARCH,
  UPDATE_SEARCH_FILTER,
  POST_REQUEST,
  UPDATE_SELECTED,
  GET_LIKED_HOUSES,
  SAVE_HOUSE
} from "./types.js";

// GET HOUSES
export const getHouses = () => (dispatch) => {
  axios
    .get("/api/marketplace/")
    .then((res) => {
      dispatch({
        type: GET_HOUSES,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getLikedHouses = (userId) => (dispatch) => {
  axios
    .get("/api/liked/")
    .then( ( res ) => {
      dispatch({
        type: GET_LIKED_HOUSES,
        payload: res.data.filter((data) => data.user_id === parseInt(userId)),
      });
    })
    .catch((err) => console.log(err));
};


export const saveHouse = (user_and_house_ids) => (dispatch) => {
  axios
    .post("/api/liked/", user_and_house_ids)
    .then((res) => {
      dispatch({
        type: SAVE_HOUSE,
        payload: res.data,
      });
    })
    .catch((err) => alert("error saving house"));
};


// UPDATE_HOUSE_SEARCH
export const updateHouseSearch = (search) => (dispatch) => {
  axios
    .get("/api/marketplace/")
    .then((res) => {
      dispatch({
        type: UPDATE_HOUSE_SEARCH,
        payload: res.data,
        search: search,
      });
    })
    .catch((err) => console.log(err));
};

// UPDATE_SEARCH_FILTER
export const updateSearchFilter = (filter) => (dispatch) => {
  axios
    .get("/api/marketplace/")
    .then((res) => {
      dispatch({
        type: UPDATE_SEARCH_FILTER,
        payload: res.data,
        filter: filter,
      });
    })
    .catch((err) => console.log(err));
};

export const updateSelected = (house) => (dispatch) => {
  dispatch({
    type: UPDATE_SELECTED,
    payload: house,
  });
};

export const sendRequest = (request) => (dispatch) => {
  axios
    .post("/api/request/", request)
    .then((res) => {
      dispatch({
        type: POST_REQUEST,
        payload: res.data,
      });
    })
    .catch((err) => alert("try again"));
};


