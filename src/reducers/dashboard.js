import {combineReducers} from 'redux'
import {createFetchSyncReducer} from "./sync";
import {createFetchListReducer} from "./list";

export default combineReducers({
    layout: createFetchSyncReducer("layout"),
    widgets: createFetchListReducer("widgets"),
})