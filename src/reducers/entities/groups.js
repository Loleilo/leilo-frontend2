import {combineReducers} from 'redux'
import {createListReducer} from 'reducers/uuidList'
import {createSyncReducer} from 'reducers/syncReducer'

const singeGroupAtomPermsReducer = createSyncReducer("groupAtomPerms");

const groupAtomPermsMapper = function (action, newState, oldState) {
    newState[action.payload.groupUUID][action.payload.atomUUID] = singeGroupAtomPermsReducer(oldState[action.payload.groupUUID][action.payload.atomUUID], action);
};

export default combineReducers({
    groupUsers: createListReducer("groupUsers"),
    groupsList: createSyncReducer("groupsList"),
    groupAtomPerms: createListReducer("groupAtomPerms", groupAtomPermsMapper),
})