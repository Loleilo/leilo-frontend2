import {actionTemplate, FETCH} from './syncAction'

export const fetchGroups = actionTemplate("atomGroups", "lookupGroups", FETCH, (payload, params) => {
    return {value: payload, uuid: params.atom_id}
});

export const fetchValue = actionTemplate("atomValues", "readAtom",FETCH, (payload, params) => {
    return {value: payload, uuid: params.atom_id}
});