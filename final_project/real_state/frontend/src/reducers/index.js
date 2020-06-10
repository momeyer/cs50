import { combineReducers } from "redux";
import houses from './houses.js'
import auth from './auth'

export default combineReducers( {
    housesReducer: houses,
    authReducer:auth,

} );
