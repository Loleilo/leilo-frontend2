import {syncActionTemplate, FETCH} from './syncAction'

export const fetchUsers = syncActionTemplate("groupUsers", "lookupUsers", FETCH, (payload, params) => {
    return {value: payload, uuid: params.group_id}
});

export const fetchAtomPerms = syncActionTemplate("groupAtomPerms", "getAtomPermissions", FETCH, (payload, params) => {
    return {value: payload, groupUUID: params.group_id, atomUUID: params.atom_id}
});

export const fetchAtomsList = syncActionTemplate("groupAtomsList", "listAtoms", FETCH, (payload, params) => {
    return {value: payload, uuid: params.group_id}
});