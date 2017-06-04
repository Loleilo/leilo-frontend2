export const PENDING = "PENDING";
export const FULFILLED = "FULFILLED";
export const REJECTED = "REJECTED";

export const FETCH="FETCH";
export const PUSH="PUSH";

export const syncAction = function (action, obj, state, payload) {
    return {
        type: `${action}_${obj}_${state}`,
        payload: payload
    }
};