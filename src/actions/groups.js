import {syncActionTemplate, FETCH, pollingStopTemplate, pollingStartTemplate, PUSH} from './sync'
import {obj, convertPermsToObj} from "../util";

const paramMapper = (payload, params) => {
    return {value: payload, uuid: params.group_id}
};

const usersParams = ["groupUsers", "lookupUsers", FETCH, paramMapper, (getState, params) => {
    return obj(getState().entities.groups.groupUsers,params.uuid);
}];
export const fetchUsers = syncActionTemplate(...usersParams);
export const pollUsersStart = pollingStartTemplate(...usersParams);
export const pollUsersStop = pollingStopTemplate(...usersParams);

const atomsListParams = ["groupAtomsList", "listAtoms", FETCH, paramMapper, (getState, params) => {
    return obj(getState().entities.groups.groupAtomsList,params.uuid);
}];
export const fetchAtoms = syncActionTemplate(...atomsListParams);
export const pollAtomsStart = pollingStartTemplate(...atomsListParams);
export const pollAtomsStop = pollingStopTemplate(...atomsListParams);

const groupPermsParams = ["groupPerms", "getGroupPermissions", FETCH, (payload, params) => {
    return {value: convertPermsToObj(payload), uuid: params.group_id}
}, (getState, params) => {
    return obj(getState().entities.groups.groupPerms,params.uuid);
}];
export const fetchPerms = syncActionTemplate(...groupPermsParams);
export const pollPermsStart = pollingStartTemplate(...groupPermsParams);
export const pollPermsStop = pollingStopTemplate(...groupPermsParams);
groupPermsParams[1] = "setGroupPermissions"; //todo add a backmapper
groupPermsParams[2] = PUSH;
export const pushPerms = syncActionTemplate(...groupPermsParams);

const groupNameParams = ["groupNames", "getGroupName", FETCH, paramMapper, (getState, params) => {
    return obj(getState().entities.groups.groupNames,params.uuid);
}];
export const fetchName = syncActionTemplate(...groupNameParams);
export const pollNameStart = pollingStartTemplate(...groupNameParams);
export const pollNameStop = pollingStopTemplate(...groupNameParams);