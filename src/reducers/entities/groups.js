import {combineReducers} from 'redux'
import {createFetchListReducer} from "../list";
import {createFetchSyncReducer} from "../sync";

const singeGroupAtomPermsReducer = createFetchSyncReducer("groupAtomPerms");

const groupAtomPermsMapper = function (action, newState, oldState) {
    newState[action.payload.groupUUID][action.payload.atomUUID] = singeGroupAtomPermsReducer(oldState[action.payload.groupUUID][action.payload.atomUUID], action);
};

export default combineReducers({
    groupUsers: createFetchListReducer("groupUsers"),
    groupAtomPerms: createFetchListReducer("groupAtomPerms", groupAtomPermsMapper),
})