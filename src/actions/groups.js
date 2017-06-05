import {syncActionTemplate, FETCH, pollingStopTemplate, pollingStartTemplate} from './syncAction'

const usersParams = ["groupUsers", "lookupUsers", FETCH, (payload, params) => {
    return {value: payload, uuid: params.group_id}
}, (getState, params) => {
    return getState().entities.groups.groupUsers[params.uuid];
}];
export const fetchUsers = syncActionTemplate(...usersParams);
export const pollUsersStart = pollingStartTemplate(...usersParams);
export const pollUsersStop = pollingStopTemplate(...usersParams);

const atomPermsParams = ["groupAtomPerms", "getAtomPermissions", FETCH, (payload, params) => {
    return {value: payload, groupUUID: params.group_id, atomUUID: params.atom_id}
}, (getState, params) => {
    return getState().entities.groups.groupAtomPerms[params.groupUUID][params.atomUUID];
}];
export const fetchAtomPerms = syncActionTemplate(...atomPermsParams);
export const pollAtomPermsStart = pollingStartTemplate(...atomPermsParams);
export const pollAtomPermsStop = pollingStopTemplate(...atomPermsParams);

const atomsListParams = ["groupAtomsList", "listAtoms", FETCH, (payload, params) => {
    return {value: payload, uuid: params.group_id}
}, (getState, params) => {
    return getState().entities.groups.groupAtomsList[params.uuid];
}];
export const fetchAtomsList = syncActionTemplate(...atomsListParams);
export const pollAtomsListStart = pollingStartTemplate(...atomsListParams);
export const pollAtomsListStop = pollingStopTemplate(...atomsListParams);