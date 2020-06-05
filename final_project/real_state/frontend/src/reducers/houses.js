import {
  GET_HOUSES,
  UPDATE_HOUSE_SEARCH,
  UPDATE_SEARCH_FILTER,
} from "../actions/types.js";

const initialState = {
  houses: [],
  search: "",
  filter: {
    bed: 0,
    bath: 0,
    price:0,
  },
};

function applyFilter(house, search, filter ){
  var newHouses;
  if ( search !== "" )
  {
    newHouses =
      house.bedroom >= filter.bed &&
      house.bathroom >= filter.bath &&
      house.price >= filter.price &&
      house.city === search;
  }
  else
  {
    newHouses = house.bedroom >= filter.bed && house.bathroom >= filter.bath;
  }
  
  return newHouses
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_HOUSES:
      return {
        ...state,
        houses: action.payload,
      };
    case UPDATE_HOUSE_SEARCH:
      return {
        ...state,
        search: action.search,
        houses: action.payload.filter((house) => applyFilter(house, action.search, state.filter)),
      };
    
    case UPDATE_SEARCH_FILTER:
      return {
        ...state,
        filter: action.filter,
        houses: action.payload.filter((house) => applyFilter(house, state.search, action.filter)),
      };
    default:
      return state;
  }
}
