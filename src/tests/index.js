import * as user from '../actions/user'
import * as groups from '../actions/groups'
import * as atoms from '../actions/atoms'
import * as states from "../reducers/states";

import store from '../store';

const REQ_DELAY = 2000;

function delayPromise(duration) {
    return function (...args) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(...args);
            }, duration)
        });
    };
}

export function userActionsTest() {
    console.log("User Actions Test");
    store.dispatch(user.login({username: "lol", password: "pass"}));

    let step = 1;
    let cG;
    store.subscribe(() => {
        if (step === 1 && store.getState().entities.user.loginState === states.LOGGED_IN) {
            step++;
            store.dispatch(user.fetchGroupsList());
        }
        if (step === 2 && store.getState().entities.user.groupsList.syncState === states.READY) {
            step++;
            cG = store.getState().entities.user.groupsList.value[0];
            store.dispatch(user.fetchGroupPerms({group_id: cG}));
        }
        if (step === 3 && store.getState().entities.user.userGroupPerms[cG] === states.READY) {
            step++;
            store.dispatch(user.logout());
        }
    });
}

export function groupActionsTest() {
    console.log("Group Actions Test");
    Promise.resolve().then(() => {
        store.dispatch(user.login({username: "lol", password: "pass"}));
    }).then(delayPromise(REQ_DELAY)).then(() => {
        store.dispatch(user.fetchGroupsList());
    }).then(delayPromise(REQ_DELAY)).then(() => {
        const cG = store.getState().entities.user.groupsList.value[0];
        store.dispatch(groups.fetchUsers({group_id: cG}));
        return cG;
    }).then(delayPromise(REQ_DELAY)).then((cG) => {
        store.dispatch(groups.fetchAtomsList({group_id: cG}));
        return cG;
    }).then(delayPromise(REQ_DELAY)).then((cG) => {
        const cA = store.getState().entities.groups.groupAtomsList[cG].value[0];
        store.dispatch(groups.fetchAtomPerms({group_id: cG, atom_id: cA}));
        return cG;
    }).then(delayPromise(REQ_DELAY)).then(() => {
        store.dispatch(user.logout());
    });
}

//todo sometimes request doesn't update fast enough, so it thinks its logged out
export function atomActionsTest() {
    console.log("Atom Actions Test");
    Promise.resolve().then(() => {
        store.dispatch(user.login({username: "lol", password: "pass"}));
    }).then(delayPromise(REQ_DELAY)).then(() => {
        store.dispatch(user.fetchGroupsList());
    }).then(delayPromise(REQ_DELAY)).then(() => {
        const cG = store.getState().entities.user.groupsList.value[0];
        store.dispatch(groups.fetchAtomsList({group_id: cG}));
        return cG;
    }).then(delayPromise(REQ_DELAY)).then((cG) => {
        const cA = store.getState().entities.groups.groupAtomsList[cG].value[0];
        store.dispatch(atoms.fetchValue({group_id: cG, atom_id: cA}));
        return [cA, cG];
    }).then(delayPromise(REQ_DELAY)).then((stuff) => {
        store.dispatch(atoms.fetchGroups({group_id: stuff[1], atom_id: stuff[0]}));
    }).then(delayPromise(REQ_DELAY)).then(() => {
        store.dispatch(user.logout());
    });
}

export function runAll() {
    userActionsTest();
    groupActionsTest();
    atomActionsTest();
}