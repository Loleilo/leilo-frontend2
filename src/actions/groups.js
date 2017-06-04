import {postPromise, syncAction} from 'syncAction'
import {REJECTED, PENDING, FULFILLED} from 'syncAction'
import {FETCH, PUSH} from 'syncAction'

export function fetchGroupUsers() {
    const objName = "groupUsers";
    return function (dispatch) {
        dispatch(syncAction(FETCH, objName, PENDING));
        postPromise("lookupUsers").then((result) => {
            dispatch(syncAction(FETCH, objName, FULFILLED, result))
        }).catch((err) => {
            dispatch(syncAction(FETCH, objName, REJECTED, {lastError: err}))
        })
    }
}