// import React from 'react'
// import ReactDOM from 'react-dom'
// import {Provider} from 'react-redux'
import store from './store'
// import registerServiceWorker from './registerServiceWorker';
//
// import App from "./components/App"

import * as user from './actions/user'
import * as groups from './actions/groups'
import * as states from "./reducers/states";

// ReactDOM.render(
//     <Provider store={store}>
//         <App/>
//     </Provider>
//     , document.getElementById('root'));
//
// registerServiceWorker();

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

});