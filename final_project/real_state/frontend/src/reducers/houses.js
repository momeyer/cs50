import {
  GET_HOUSES,
  UPDATE_HOUSE_SEARCH,
  UPDATE_SEARCH_FILTER,
  POST_REQUEST
} from "../actions/types.js";

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

console.log(">>", filters);
const initialState = {
  houses: [],
  search: "",
  filter: filters,
};

function applyFilter(house, search, filter) {
  if (search !== "") {
    var includeNewHouse =
      house.bedroom >= filter.bed &&
      house.bathroom >= filter.bath &&
      house.year >= filter.built &&
      house.price <= filter.price &&
      house.size >= filter.size &&
      house.offer_type === filter.offer_type;
  } else {
    var includeNewHouse =
      house.bedroom >= filter.bed &&
      house.bathroom >= filter.bath &&
      house.size >= filter.size &&
      house.price <= filter.price &&
      house.year >= filter.built &&
      house.offer_type === filter.offer_type;
  }
  if (filter.home_type.length > 0) {
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
          applyFilter(house, action.search, state.filter)
        ),
      };
    case UPDATE_SEARCH_FILTER:
      return {
        ...state,
        filter: action.filter,
        houses: action.payload.filter((house) =>
          applyFilter(house, state.search, action.filter)
        ),
      };
    case POST_REQUEST:
      console.log(action.payload)
      return { ...state };
    default:
      return state;
  }
}
