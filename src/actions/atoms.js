import {syncActionTemplate, FETCH, pollingStartTemplate, pollingStopTemplate, PUSH} from './sync'
import {obj, convertPermsToObj} from "../util";

const paramMapper = (payload, params) => {
    return {value: payload, groupUUID: params.group_id, atomUUID: params.atom_id}
};

const groupsParams = ["atomGroups", "lookupGroups", FETCH, paramMapper, (getState, params) => {
    return obj(getState().entities.atoms.atomGroups, params.groupUUID, params.atomUUID);
}];
export const fetchGroups = syncActionTemplate(...groupsParams);
export const pollGroupsStart = pollingStartTemplate(...groupsParams);
export const pollGroupsStop = pollingStopTemplate(...groupsParams);

const valueParams = ["atomValues", "readAtom", FETCH, paramMapper, (getState, params) => {
    return obj(getState().entities.atoms.atomValues, params.groupUUID, params.atomUUID);
}];
export const fetchValue = syncActionTemplate(...valueParams);
export const pollValueStart = pollingStartTemplate(...valueParams);
export const pollValueStop = pollingStopTemplate(...valueParams);
valueParams[2] = PUSH;
valueParams[1] = "writeAtom";
export const pushValue = syncActionTemplate(...valueParams);

const nameParams = ["atomNames", "getAtomName", FETCH, paramMapper, (getState, params) => {
    return obj(getState().entities.atoms.atomNames, params.groupUUID, params.atomUUID);
}];
export const fetchName = syncActionTemplate(...nameParams);
export const pollNameStart = pollingStartTemplate(...nameParams);
export const pollNameStop = pollingStopTemplate(...nameParams);
//todo this is not availible yet
// nameParams[2] = PUSH;
// export const pushName = syncActionTemplate(...nameParams);

const permsParams = ["atomPerms", "getAtomPermissions", FETCH,(payload, params) => {
    return {value: convertPermsToObj(payload), groupUUID: params.group_id, atomUUID: params.atom_id}
}, (getState, params) => {
    return obj(getState().entities.atoms.atomPerms, params.groupUUID, params.atomUUID);
}];
export const fetchPerms = syncActionTemplate(...permsParams);
export const pollPermsStart = pollingStartTemplate(...permsParams);
export const pollPermsStop = pollingStopTemplate(...permsParams);
permsParams[2] = PUSH;
permsParams[1] = "setAtomPermissions";
export const pushPerms = syncActionTemplate(...permsParams);