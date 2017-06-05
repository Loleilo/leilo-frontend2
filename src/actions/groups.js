import {actionTemplate, FETCH} from './syncAction'

export const fetchUsers = actionTemplate("groupUsers", "lookupUsers", FETCH, (payload, params) => {
    return {value: payload, uuid: params.group_id}
});

export const fetchAtomPerms = actionTemplate("groupAtomPerms", "getAtomPermissions", FETCH, (payload, params) => {
    return {value: payload, groupUUID: params.group_id, atomUUID: params.atom_id}
});

export const fetchAtomsList = actionTemplate("groupAtomsList", "listAtoms", FETCH, (payload, params) => {
    return {value: payload, uuid: params.group_id}
});