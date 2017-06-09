import {PERM_CONFIG, PERM_READ, PERM_WRITE} from "./consts";

export function arr(obj, idxs) {
    let currObj = obj;
    for (let i = 1; i < arguments.length; i++) {
        if (currObj === undefined)
            currObj = {};
        currObj = currObj[arguments[i]];
    }
    if (currObj === undefined)
        currObj = {};
    return currObj;
}

export function convertPermsToObj(perms) {
    return {
        read: (perms & PERM_READ) !== 0,
        write: (perms & PERM_WRITE) !== 0,
        config: (perms & PERM_CONFIG) !== 0,
    }
}

export function convertObjToPerms(obj) {
    let perms = 0;
    if (obj.read)
        perms |= PERM_READ;
    if (obj.write)
        perms |= PERM_WRITE;
    if (obj.config)
        perms |= PERM_CONFIG;
    return perms;
}