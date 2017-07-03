import {combineReducers} from 'redux'
import {createFetchListReducer} from '../list'
import {createFetchSyncReducer} from "../sync";
import { obj} from "../../util";

function createMapper(reducer) {
    return function (action, newState, oldState) {
        newState[action.payload.groupUUID] = obj(newState,action.payload.groupUUID);
        newState[action.payload.groupUUID][action.payload.atomUUID] = reducer(obj(oldState, action.payload.groupUUID, action.payload.atomUUID), action);
    }
}

export default combineReducers({
    atomGroups: createFetchListReducer('atomGroups', createMapper(createFetchSyncReducer("atomGroups"))),
    atomValues: createFetchListReducer('atomValues', createMapper(createFetchSyncReducer("atomValues"))),
    atomNames: createFetchListReducer('atomNames', createMapper(createFetchSyncReducer("atomNames"))),
    atomPerms: createFetchListReducer("atomPerms", createMapper(createFetchSyncReducer("atomPerms"))),
})