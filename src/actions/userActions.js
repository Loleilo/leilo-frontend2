import axios from 'axios'
import {API_ENDPOINT} from 'src/consts'

export function login() {
    return function (dispatch, username, password) {
        axios.post(API_ENDPOINT, {
            username: username,
            password: password,
        }).then((response) => {
            if(response.returnCode===0)
                dispatch({type: "LOGIN_FULFILLED"});
            else
                throw new Error("");
        }).catch((err) => {
            dispatch({type: "LOGIN_REJECTED", payload: {lastError: err}})
        })
    }
}