import {postPromise, syncActionTemplate, pollingStartTemplate, pollingStopTemplate, FETCH} from './sync'
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
    return function (dispatch, getState) {
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

const loginStateParams = ["loginState", "isLoggedIn", FETCH, (payload) => {
    if (payload) return {value: LOGGED_IN};
    else return {value: LOGGED_OUT};
}, (getState) => {
    return getState().entities.user.loginState
}];
export const fetchLoginState = syncActionTemplate(...loginStateParams);
export const pollLoginStateStart = pollingStartTemplate(...loginStateParams);
export const pollLoginStateStop = pollingStopTemplate(...loginStateParams);

const groupsListParams = ["groupsList", "listGroups", FETCH, undefined, (getState) => {
    return getState().entities.user.groupsList
}];
export const fetchGroupsList = syncActionTemplate(...groupsListParams);
export const pollGroupsListStart = pollingStartTemplate(...groupsListParams);
export const pollGroupsListStop = pollingStopTemplate(...groupsListParams);