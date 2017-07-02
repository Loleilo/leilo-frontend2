import {combineReducers} from 'redux'
import errors from './errors'
import entitiesReducer from './entities'
import {routeReducer} from "redux-simple-router";
import {createFetchSyncReducer} from "./sync";

export default combineReducers({
    errors: errors,
    entities: entitiesReducer,
    routing: routeReducer,
    dashboard: createFetchSyncReducer("dashboard"),
});