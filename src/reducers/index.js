import {combineReducers} from 'redux'
import errors from './errors'
import entitiesReducer from './entities'
import dashboardReducer from './dashboard'
import {routeReducer} from "redux-simple-router";

export default combineReducers({
    errors: errors,
    entities: entitiesReducer,
    routing: routeReducer,
    dashboard: dashboardReducer,
});