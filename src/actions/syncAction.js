import axios from 'axios'
import syncAction from './action'
import {API_ENDPOINT, CLIENT_API_VERSION} from "../consts";
import SyncReturnError from "../errors/SyncReturnError";
import createCatcher from '../errors/errorCatcher'

export const PENDING = "PENDING";
export const FULFILLED = "FULFILLED";
export const REJECTED = "REJECTED";

export const FETCH = "FETCH";
export const PUSH = "PUSH";


//gotta love that 3rd order function
export function syncActionTemplate(objName, apiCall, action = FETCH, customMapper = (result)=>{return {value:result}}) {
    return function (params) {
        return function (dispatch) {
            dispatch(syncAction(action, objName, PENDING, customMapper(undefined, params)));
            postPromise(apiCall, params).then((result) => {
                dispatch(syncAction(action, objName, FULFILLED, customMapper(result, params)))
            }).catch(createCatcher(dispatch)).catch((err) => {
                dispatch(syncAction(action, objName, REJECTED, {lastError: err}))
            })
        }
    }
}

export function postPromise(call, params = {}) {
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
            throw new SyncReturnError(response);
    })
}