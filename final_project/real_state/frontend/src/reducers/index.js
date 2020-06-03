import { combineReducers } from "redux";
import houses from './houses.js'

export default combineReducers( {
    housesReducer: houses, 
} );
