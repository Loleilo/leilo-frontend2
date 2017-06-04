import {combineReducers} from 'redux'

import userReducer from './user'
import groupsReducer from './groups'
import atomsReducer from './atoms'

const tmp = combineReducers({
    user: userReducer,
    groups: groupsReducer,
    atoms: atomsReducer,
});

export default function (state, action) {
    if (action.type === "LOGOUT_FULFILLED") {
        //clear data (not sure if this works)
        return tmp({}, action);
    }
    return tmp(state, action);
}