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
    price: 50000000,
    built: 0,
    size: 0,
    home_type: [],
  },
};

function applyFilter(house, search, filter) {
  if (search === house.city && house.bedroom >= filter.bed) {
    console.log(house);
  }
  if (search !== "") {
    var includeNewHouse =
      house.bedroom >= filter.bed &&
      house.bathroom >= filter.bath &&
      house.year >= filter.built &&
      house.price <= filter.price &&
      house.size >= filter.size &&
      house.city === search;
  } else {
    var includeNewHouse =
      house.bedroom >= filter.bed &&
      house.bathroom >= filter.bath &&
      house.size >= filter.size &&
      house.price <= filter.price &&
      house.year >= filter.built;
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
    default:
      return state;
  }
}
