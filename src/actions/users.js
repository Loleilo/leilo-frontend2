import {postPromise, syncAction} from './syncAction'
import {REJECTED, PENDING, FULFILLED} from './syncAction'
import {FETCH} from './syncAction'

export function login(username, password) {
    return function (dispatch) {
        dispatch({type: "LOGIN_PENDING"});
        postPromise("login", {
            username: username,
            password: password,
        }).then(() => {
            dispatch({type: "LOGIN_FULFILLED"})
        }).catch((err) => {
            dispatch({type: "LOGIN_REJECTED", payload: {lastError: err}})
        })
    }
}

export function logout() {
    return function (dispatch) {
        dispatch({type: "LOGOUT_PENDING"});
        postPromise("killSession").then(() => {
            dispatch({type: "LOGOUT_FULFILLED"})
        }).catch((err) => {
            dispatch({type: "LOGOUT_REJECTED", payload: {lastError: err}})
        })
    }
}

export function fetchGroupsList() {
    const objName = "groupsList";
    return function (dispatch) {
        dispatch(syncAction(FETCH, objName, PENDING));
        postPromise("listGroups").then((result) => {
            dispatch(syncAction(FETCH, objName, FULFILLED, result))
        }).catch((err) => {
            dispatch(syncAction(FETCH, objName, REJECTED, {lastError: err}))
        })
    }
}

export function fetchGroupPerms(groupid) {
    const objName = "userGroupPerms";
    return function (dispatch) {
        dispatch(syncAction(FETCH, objName, PENDING, {uuid: groupid}));
        postPromise({group_id: groupid}).then((result) => {
            dispatch(syncAction(FETCH, objName, FULFILLED, {uuid: groupid, value: result}))
        }).catch((err) => {
            dispatch(syncAction(FETCH, objName, REJECTED, {uuid: groupid, lastError: err}))
        })
    }
}

//todo this doesn't even need to be part of state
// export function pushGroupPerms(groupid, perms) {
//     const objName = "userGroupPerms";
//     return function (dispatch) {
//         dispatch(syncAction(PUSH, objName, PENDING, {uuid: groupid}));
//         postPromise({group_id: groupid}).then((result) => {
//             dispatch(syncAction(PUSH, objName, FULFILLED, {uuid: groupid, value: result}))
//         }).catch((err) => {
//             dispatch(syncAction(PUSH, objName, REJECTED, {uuid: groupid, lastError: err}))
//         })
//     }
// }