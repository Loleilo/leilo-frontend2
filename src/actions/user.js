import {postPromise, actionTemplate} from './syncAction'

export function login(params) {
    return function (dispatch) {
        dispatch({type: "LOGIN_PENDING"});
        postPromise("login", params).then(() => {
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

export const fetchGroupsList = actionTemplate("groupsList", "listGroups");

export const fetchGroupPerms = actionTemplate("userGroupPerms", "getGroupPermissions");

//todo this doesn't even need to be part of state (i think)
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