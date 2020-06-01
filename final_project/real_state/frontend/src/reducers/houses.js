import { GET_HOUSES } from "../actions/types.js";

const initialState = {
  houses: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_HOUSES:
      return {
        ...state,
        houses: action.payload,
      };
    default:
      return state;
  }
}
