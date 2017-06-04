import {createFetchSyncReducer, createPushFetchSyncReducer} from  'reducers/sync'

function createFetchListReducer(objName, actionMapper = (action, newState, oldState) => {
    newState[action.payload.uuid] = createFetchSyncReducer(objName)(oldState[action.payload.uuid], action);
}) {
    return function (state = {}, action) {
        const splitType = action.type.split('_');
        if (splitType.length >= 2)
            if (action.type[1] === objName)
                return actionMapper(action, {
                    ...state
                }, state);
        return state;
    };
}

//todo fix this later
// function createPushFetchListReducer(objName, actionMapper = (action, newState, oldState) => {
//     newState[action.payload.uuid] = createPushFetchSyncReducer(objName)(oldState[action.payload.uuid], action);
// }) {
//     return function (state = {}, action) {
//         const splitType = action.type.split('_');
//         if (splitType.length === 3)
//             if (action.type[1] === objName) {
//                 switch (action.type[0]) {
//                     case "ADD":
//                     default:
//                         return actionMapper(action, {
//                             ...state
//                         }, state);
//                 }
//             }
//         return state;
//     };
// }

export {createFetchListReducer}