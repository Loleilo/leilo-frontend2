import axios from 'axios'
import actionTemplate from './action'
import {API_ENDPOINT, CLIENT_API_VERSION} from "../consts";
import SyncReturnError from "../errors/SyncReturnError";
import createCatcher from '../errors/errorCatcher'

export const PENDING = "PENDING";
export const FULFILLED = "FULFILLED";
export const REJECTED = "REJECTED";

export const FETCH = "FETCH";
export const PUSH = "PUSH";

export const POLL = "POLL";

export const START = "START";
export const STOP = "STOP";

export function pollingStartTemplate(objName, apiCall, action, customMapper = (result) => {
    return {value: result}
}, stateMapper) {
    return function (params, pollInterval) {
        return function (dispatch, getState) {
            const mappedParams = customMapper(undefined, params);
            dispatch(actionTemplate(POLL, objName, START, mappedParams));
            const pollFunc = () => {
                if (!stateMapper(getState, mappedParams).polling)
                    return;
                dispatch(syncActionTemplate(objName, apiCall, FETCH, customMapper));
                setTimeout(pollFunc, pollInterval);
            };
            pollFunc();
        }
    }
}

export function pollingStopTemplate(objName, apiCall, customMapper = (result) => {
    return {value: result}
}) {
    return function (params) {
        return actionTemplate(POLL, objName, STOP, customMapper(undefined, params));
    }
}

//gotta love that 3rd order function
export function syncActionTemplate(objName, apiCall, action = FETCH, customMapper = (result) => {
    return {value: result}
}) {
    return function (params) {
        return function (dispatch) {
            dispatch(actionTemplate(action, objName, PENDING, customMapper(undefined, params)));
            postPromise(apiCall, params).then((result) => {
                dispatch(actionTemplate(action, objName, FULFILLED, customMapper(result, params)))
            }).catch(createCatcher(dispatch)).catch((err) => {
                dispatch(actionTemplate(action, objName, REJECTED, {lastError: err}))
            })
        }
    };
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