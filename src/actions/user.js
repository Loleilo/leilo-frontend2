import {postPromise, syncActionTemplate, pollingStartTemplate, pollingStopTemplate} from './sync'
import {LOGGED_IN, LOGGED_OUT} from "../reducers/states";

export function login(params) {
    return function (dispatch, getState) {
        if (getState().entities.user.loginState.value !== LOGGED_OUT)
            return;
        dispatch({type: "LOGIN_PENDING"});
        postPromise("login", params).then(() => {
            dispatch({type: "LOGIN_FULFILLED"})
        }).catch((err) => {
            dispatch({type: "LOGIN_REJECTED", payload: {lastError: err}})
        })
    }
}

export function logout() {
    return function (dispatch,getState) {
        if (getState().entities.user.loginState.value !== LOGGED_IN)
            return;
        dispatch({type: "LOGOUT_PENDING"});
        postPromise("killSession").then(() => {
            dispatch({type: "LOGOUT_FULFILLED"})
        }).catch((err) => {
            dispatch({type: "LOGOUT_REJECTED", payload: {lastError: err}})
        })
    }
}

const groupsListParams = ["groupsList", "listGroups", undefined, undefined, (getState) => {
    return getState().entities.user.groupsList
}];
export const fetchGroupsList = syncActionTemplate(...groupsListParams);
export const pollGroupsListStart = pollingStartTemplate(...groupsListParams);
export const pollGroupsListStop = pollingStopTemplate(...groupsListParams);