export default function (state = [], action) {
    switch (action.type) {
        case "ERROR_OCCURRED":
            return [...state, action.payload];
        case "ERROR_HANDLED":
            return state.slice(1);
        default:
            return state;
    }
}