import axios from "axios";
import { GET_HOUSES, UPDATE_HOUSE_FILTER, UPDATE_INFORMATION_MODAL, GET_HOUSE_INFORMATION } from "./types.js";

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

// UPDATE_HOUSE_FILTER
export const updateHouseFilter = ( searchFilter ) => ( {
  type: UPDATE_HOUSE_FILTER,
  payload: searchFilter,
} )

// UPDATE_INFORMATION_MODAL
export const updateInformationModal = ( houseId ) => ( {
  type: UPDATE_INFORMATION_MODAL,
  payload: houseId,
} )
