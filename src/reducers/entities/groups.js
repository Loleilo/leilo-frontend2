import {combineReducers} from 'redux'
import {createFetchListReducer} from "../list";
import {createFetchSyncReducer} from "../sync";
import {guard} from "../../util";

const singleGroupAtomPermsReducer = createFetchSyncReducer("groupAtomPerms");

const groupAtomPermsMapper = function (action, newState, oldState) {
    newState[action.payload.groupUUID] = guard(newState[action.payload.groupUUID]);
    newState[action.payload.groupUUID][action.payload.atomUUID] = singleGroupAtomPermsReducer(guard(oldState[action.payload.groupUUID])[action.payload.atomUUID], action);
};

export default combineReducers({
    groupUsers: createFetchListReducer("groupUsers"),
    groupAtomPerms: createFetchListReducer("groupAtomPerms", groupAtomPermsMapper),
    groupAtomsList: createFetchListReducer("groupAtomsList"),
})