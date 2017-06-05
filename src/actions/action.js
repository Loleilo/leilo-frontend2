export default function(action, obj, state, payload) {
    return {
        type: `${action}_${obj}_${state}`,
        payload: payload,
    }
}