import {syncActionTemplate, FETCH, pollingStartTemplate, pollingStopTemplate} from './syncAction'

const groupsParams = ["atomGroups", "lookupGroups", FETCH, (payload, params) => {
    return {value: payload, uuid: params.atom_id}
}, (getState, params) => {
    return getState().entities.atoms.atomGroups[params.uuid];
}];
export const fetchGroups = syncActionTemplate(...groupsParams);
export const pollGroupsStart = pollingStartTemplate(...groupsParams);
export const pollGroupsStop = pollingStopTemplate(...groupsParams);

const valueParams = ["atomValues", "readAtom", FETCH, (payload, params) => {
    return {value: payload, uuid: params.atom_id}
}, (getState, params) => {
    return getState().entities.atoms.atomValues[params.uuid];
}];
export const fetchValue = syncActionTemplate(...valueParams);
export const pollValueStart = pollingStartTemplate(...valueParams);
export const pollValueStop = pollingStopTemplate(...valueParams);