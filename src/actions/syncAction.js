import axios from 'axios'
import {API_ENDPOINT, CLIENT_API_VERSION} from "../consts";

export const PENDING = "PENDING";
export const FULFILLED = "FULFILLED";
export const REJECTED = "REJECTED";

export const FETCH = "FETCH";
export const PUSH = "PUSH";

export function postPromise(call, params={}) {
    return axios.post(API_ENDPOINT,
        {
            version: CLIENT_API_VERSION,
            call: call,
            params: params
        }).then((response) => {
        response = response.data;
        if (response.returnCode === 0)
            return response.returnData;
        else
            throw new Error("Non-zero return code: Error code " + response.returnCode + " - " + response.returnData);
    })
}

export function syncAction(action, obj, state, payload) {
    return {
        type: `${action}_${obj}_${state}`,
        payload: payload
    }
}