import {combineReducers} from 'redux'
import {createFetchListReducer} from "../list";

export default combineReducers({
    groupUsers: createFetchListReducer("groupUsers"),
    groupAtomsList: createFetchListReducer("groupAtomsList"),
    groupPerms: createFetchListReducer("groupPerms"),
    groupNames: createFetchListReducer("groupNames"),
})