import {syncActionTemplate, FETCH} from './syncAction'

export const fetchGroups = syncActionTemplate("atomGroups", "lookupGroups", FETCH, (payload, params) => {
    return {value: payload, uuid: params.atom_id}
});

export const fetchValue = syncActionTemplate("atomValues", "readAtom",FETCH, (payload, params) => {
    return {value: payload, uuid: params.atom_id}
});