import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import registerServiceWorker from './registerServiceWorker';
import App from "./components/App"
import injectTapEventPlugin from 'react-tap-event-plugin';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();

//run unit tests
// import {runAll} from './tests'
// runAll();