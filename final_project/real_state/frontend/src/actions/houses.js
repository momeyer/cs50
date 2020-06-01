import axios from "axios";
import { GET_HOUSES } from "./types.js";

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
