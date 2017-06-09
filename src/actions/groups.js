import {syncActionTemplate, FETCH, pollingStopTemplate, pollingStartTemplate, PUSH} from './sync'

const paramMapper = (payload, params) => {
    return {value: payload, uuid: params.group_id}
};

const usersParams = ["groupUsers", "lookupUsers", FETCH, paramMapper, (getState, params) => {
    return getState().entities.groups.groupUsers[params.uuid];
}];
export const fetchUsers = syncActionTemplate(...usersParams);
export const pollUsersStart = pollingStartTemplate(...usersParams);
export const pollUsersStop = pollingStopTemplate(...usersParams);

const atomsListParams = ["groupAtomsList", "listAtoms", FETCH, paramMapper, (getState, params) => {
    return getState().entities.groups.groupAtomsList[params.uuid];
}];
export const fetchAtomsList = syncActionTemplate(...atomsListParams);
export const pollAtomsListStart = pollingStartTemplate(...atomsListParams);
export const pollAtomsListStop = pollingStopTemplate(...atomsListParams);

const groupPermsParams = ["groupPerms", "getGroupPermissions", FETCH, paramMapper, (getState, params) => {
    return getState().entities.user.groupPerms[params.uuid];
}];
export const fetchGroupPerms = syncActionTemplate(...groupPermsParams);
export const pollGroupPermsStart = pollingStartTemplate(...groupPermsParams);
export const pollGroupPermsStop = pollingStopTemplate(...groupPermsParams);
groupPermsParams[1] = "setGroupPermissions";
groupPermsParams[2] = PUSH;
export const pushGroupPerms = syncActionTemplate(...groupPermsParams);