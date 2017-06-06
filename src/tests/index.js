import * as user from '../actions/user'
import * as groups from '../actions/groups'
import * as atoms from '../actions/atoms'
import * as states from "../reducers/states";

import store from '../store';

const REQ_DELAY = 2000;
const POL_DELAY = 4000;
const POL_INT = 700;

function delayPromise(duration) {
    return function (...args) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(...args);
            }, duration)
        });
    };
}

//todo make user actions test use promise delays
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
    })
}

export function groupActionsTest() {
    return Promise.resolve(Promise.resolve(() => {
        console.log("Group Actions Test");
    }).then(() => {
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
    }))
}

//todo sometimes request doesn't update fast enough, so it thinks its logged out
export function atomActionsTest() {
    return Promise.resolve(Promise.resolve(() => {
        console.log("Atom Actions Test")
    }).then(() => {
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
    }))
}

export function actionsTest() {
    return Promise.resolve(Promise.resolve(() => {
        console.log("actions test")
    })
        .then(groupActionsTest())
        .then(atomActionsTest()))
}

export function userPollingTest() {
    return Promise.resolve(Promise.resolve(() => {
        console.log("user polling test")
    }).then(() => {
        store.dispatch(user.login({username: "lol", password: "pass"}));
    }).then(delayPromise(REQ_DELAY)).then(() => {
        const action = user.pollGroupsListStart(POL_INT);
        store.dispatch(action);
    }).then(delayPromise(POL_DELAY)).then(() => {
        store.dispatch(user.pollGroupsListStop());
        const cG = store.getState().entities.user.groupsList.value[0];
        store.dispatch(user.pollGroupPermsStart(POL_INT, {group_id: cG}));
        return cG;
    }).then(delayPromise(POL_DELAY)).then((cG) => {
        store.dispatch(user.pollGroupPermsStop({group_id: cG}));
    }).then(delayPromise(REQ_DELAY)).then(() => {
        store.dispatch(user.logout());
    }))
}

export function groupPollingTest() {
    return Promise.resolve(Promise.resolve(() => {
        console.log("group polling test")
    }).then(() => {
        store.dispatch(user.login({username: "lol", password: "pass"}));
    }).then(delayPromise(REQ_DELAY)).then(() => {
        store.dispatch(user.fetchGroupsList());
    }).then(delayPromise(REQ_DELAY)).then(() => {
        store.dispatch(user.pollGroupsListStop());
        const cG = store.getState().entities.user.groupsList.value[0];
        store.dispatch(groups.pollUsersStart(POL_INT, {group_id: cG}));
        return cG;
    }).then(delayPromise(POL_DELAY)).then((cG) => {
        store.dispatch(groups.pollUsersStop({group_id: cG}));
        store.dispatch(groups.pollAtomsListStart(POL_INT, {group_id: cG}));
        return cG;
    }).then(delayPromise(POL_DELAY)).then((cG) => {
        store.dispatch(groups.pollAtomsListStop({group_id: cG}));
        const cA = store.getState().entities.groups.groupAtomsList[cG].value[0];
        store.dispatch(groups.pollAtomPermsStart(POL_INT, {group_id: cG, atom_id: cA}));
        return [cG, cA];
    }).then(delayPromise(POL_DELAY)).then((stuff) => {
        const cG = stuff[0];
        const cA = stuff[1];
        store.dispatch(groups.pollAtomPermsStop({group_id: cG, atom_id: cA}));
    }).then(delayPromise(REQ_DELAY)).then(() => {
        store.dispatch(user.logout());
    }))
}

export function atomPollingTest() {
    return Promise.resolve(Promise.resolve(() => {
        console.log("Atom Actions Test")
    }).then(() => {
        store.dispatch(user.login({username: "lol", password: "pass"}));
    }).then(delayPromise(REQ_DELAY)).then(() => {
        store.dispatch(user.fetchGroupsList());
    }).then(delayPromise(REQ_DELAY)).then(() => {
        const cG = store.getState().entities.user.groupsList.value[0];
        store.dispatch(groups.fetchAtomsList({group_id: cG}));
        return cG;
    }).then(delayPromise(REQ_DELAY)).then((cG) => {
        const cA = store.getState().entities.groups.groupAtomsList[cG].value[0];
        store.dispatch(atoms.pollValueStart(POL_INT, {group_id: cG, atom_id: cA}));
        return [cG, cA];
    }).then(delayPromise(REQ_DELAY)).then((stuff) => {
        const cG = stuff[0];
        const cA = stuff[1];
        store.dispatch(atoms.pollValueStop({group_id: cG, atom_id: cA}));
        store.dispatch(atoms.pollGroupsStart(POL_INT, {group_id: cG, atom_id: cA}));
        return [cG, cA];
    }).then(delayPromise(REQ_DELAY)).then((stuff) => {
        const cG = stuff[0];
        const cA = stuff[1];
        store.dispatch(atoms.pollGroupsStop({group_id: cG, atom_id: cA}));
    }).then(delayPromise(REQ_DELAY)).then(() => {
        store.dispatch(user.logout());
    }))
}

export function pollingTest() {
    // userPollingTest();
    // groupPollingTest();
    return atomPollingTest();
}

export function runAll() {
    // userActionsTest();
   // actionsTest();
      pollingTest()
        .catch((err) => {
            console.error("Tests failed. Error: " + err.message + " location " + err.stack)
        });
}