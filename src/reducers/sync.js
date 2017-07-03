import * as states from './states'

export function createFetchSyncReducer(objName, valueReducer = (state, action) => action.payload.value) {
    return function (state, action) {
        state = {
            loaded: false,
            syncState: states.READY,
            polling: 0,
            pollInterval: Number.POSITIVE_INFINITY,
            ...state,
        };
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
                    polling: state.polling ? state.polling + 1 : 1,
                    pollInterval: Math.min(state.pollInterval, action.payload.pollInterval),
                };
            case `POLL_${objName}_STOP`:
                return {
                    ...state,
                    polling: state.polling && state.polling > 0 ? state.polling - 1 : 0,
                };
            default:
                return state;
        }
    };
}

export function createPushFetchSyncReducer(objName, valueReducer = (state, action) => action.payload.value) {
    return function (state = {
        loaded: false,
        syncState: states.READY,
        polling: 0,
        pollInterval: Number.POSITIVE_INFINITY,
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
                    value: valueReducer(state.value, action),
                    syncState: states.WRITING,
                };
            case `PUSH_${objName}_FULFILLED`:
                return {
                    ...state,
                    syncState: states.READY,
                    value: valueReducer(state.value, action),
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
                    polling: state.polling ? state.polling + 1 : 1,
                    pollInterval: Math.min(state.pollInterval, action.payload.pollInterval),
                };
            case `POLL_${objName}_STOP`:
                return {
                    ...state,
                    polling: state.polling && state.polling > 0 ? state.polling - 1 : 0,
                };
            default:
                return state;
        }
    };
}