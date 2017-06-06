import * as states from './states'

export function createFetchSyncReducer(objName, valueReducer = (state, action) => action.payload.value) {
    return function (state = {
        loaded: false,
        syncState: states.READING,
        polling: false,
    }, action) {
        switch (action.type) {
            case `FETCH_${objName}_PENDING`:
                return {
                    ...state,
                    syncState: states.READING,
                };
            case `FETCH_${objName}_FULFILLED`:
                return {
                    ...state,
                    syncState: states.READY,
                    loaded: true,
                    value: valueReducer(state.value, action),
                    lastError: undefined,
                };
            case `FETCH_${objName}_REJECTED`:
                return {
                    ...state,
                    syncState: states.ERROR,
                    lastError: action.payload.lastError,
                };
            case `POLL_${objName}_START`:
                return {
                    ...state,
                    polling: true,
                };
            case `POLL_${objName}_STOP`:
                return {
                    ...state,
                    polling: false,
                };
            default:
                return state;
        }
    };
}

export function createPushFetchSyncReducer(objName, valueReducer = (state, action) => action.payload.value) {
    return function (state = {
        loaded: false,
        syncState: states.READING,
    }, action) {
        switch (action.type) {
            case `FETCH_${objName}_PENDING`:
                return {
                    ...state,
                    syncState: states.READING,
                };
            case `FETCH_${objName}_FULFILLED`:
                return {
                    ...state,
                    syncState: states.READY,
                    loaded: true,
                    value: valueReducer(state.value, action),
                    lastError: undefined,
                };
            case `FETCH_${objName}_REJECTED`:
                return {
                    ...state,
                    syncState: states.ERROR,
                    lastError: action.payload.lastError,
                };
            case `PUSH_${objName}_PENDING`:
                return {
                    ...state,
                    syncState: states.WRITING,
                };
            case `PUSH_${objName}_FULFILLED`:
                return {
                    ...state,
                    syncState: states.READY,
                    loaded: true,
                };
            case `PUSH_${objName}_REJECTED`:
                return {
                    ...state,
                    syncState: states.ERROR,
                    lastError: action.payload.lastError,
                };
            case `POLL_${objName}_START`:
                return {
                    ...state,
                    polling: true,
                };
            case `POLL_${objName}_STOP`:
                return {
                    ...state,
                    polling: false,
                };
            default:
                return state;
        }
    };
}