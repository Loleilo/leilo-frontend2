import {postPromise, syncActionTemplate, pollingStartTemplate, FETCH, pollingStopTemplate} from './syncAction'

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

const groupsListParams = ["groupsList", "listGroups", undefined, undefined, (getState)=>{
    return getState().entities.user.groupsList
}];
export const fetchGroupsList = syncActionTemplate(...groupsListParams);
export const pollGroupsListStart = pollingStartTemplate(...groupsListParams);
export const pollGroupsListStop = pollingStopTemplate(...groupsListParams);

const groupPermsParams = ["userGroupPerms", "getGroupPermissions", FETCH, (payload, params) => {
    return {value: payload, uuid: params.group_id}
}, (getState, params)=>{
    return getState().entities.user.userGroupPerms[params.uuid];
}];
export const fetchGroupPerms = syncActionTemplate(...groupsListParams);
export const pollGroupPermsStart = pollingStartTemplate(...groupsListParams);
export const pollGroupPermsStop = pollingStopTemplate(...groupsListParams);