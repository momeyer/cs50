import { GET_HOUSES, UPDATE_HOUSE_FILTER } from "../actions/types.js";

const initialState = {
  houses: [],
  search: "",
  modalInformation: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_HOUSES:
      return {
        ...state,
        houses: action.payload,
      };
    case UPDATE_HOUSE_FILTER:
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
}
