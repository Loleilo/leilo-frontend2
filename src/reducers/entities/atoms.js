import {combineReducers} from 'redux'
import {createFetchListReducer} from '../list'
import {createFetchSyncReducer} from "../sync";
import { arr} from "../../util";

function createMapper(reducer) {
    return function (action, newState, oldState) {
        newState[action.payload.groupUUID] = arr(newState,action.payload.groupUUID);
        newState[action.payload.groupUUID][action.payload.atomUUID] = reducer(arr(oldState, action.payload.groupUUID, action.payload.atomUUID), action);
    }
}

export default combineReducers({
    atomGroups: createFetchListReducer('atomGroups', createMapper(createFetchSyncReducer("atomGroups"))),
    atomValues: createFetchListReducer('atomValues', createMapper(createFetchSyncReducer("atomValues"))), //fix this to write later
    atomNames: createFetchListReducer('atomNames', createMapper(createFetchSyncReducer("atomNames"))),
    atomPerms: createFetchListReducer("atomPerms", createMapper(createFetchSyncReducer("atomPerms"))),
})