import {
  GET_HOUSES,
  UPDATE_HOUSE_SEARCH,
  UPDATE_SEARCH_FILTER,
  POST_REQUEST
} from "../actions/types.js";

function checkFilters ( house, filter ) {
    return (house.bedroom >= filter.bed &&
      house.bathroom >= filter.bath &&
      house.year >= filter.built &&
      house.price <= filter.price &&
      house.size >= filter.size &&
      house.offer_type === filter.offer_type);
  }

var filters =
  JSON.parse(localStorage.getItem("filters")) != null
    ? JSON.parse(localStorage.getItem("filters"))
    : {
        bed: 0,
        bath: 0,
        size: 0,
        built: 0,
        price: 500000000,
        home_type: [],
        offer_type: "Rent",
      };

const initialState = {
  houses: [],
  search: "",
  filter: filters,
};


function applyFilter(house, filter) {
  var includeNewHouse = checkFilters(house, filter)
  
  if ( filter.home_type.length > 0 )
  {
    includeNewHouse =
      includeNewHouse && filter.home_type.includes(house.property_type);
  }

  return includeNewHouse;
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
        houses: action.payload.filter((house) =>
          applyFilter(house, state.filter)
        ),
      };
    case UPDATE_SEARCH_FILTER:
      return {
        ...state,
        filter: action.filter,
        houses: action.payload.filter((house) =>
          applyFilter(house, action.filter)
        ),
      };
    case POST_REQUEST:
      return { ...state };
    default:
      return state;
  }
}
