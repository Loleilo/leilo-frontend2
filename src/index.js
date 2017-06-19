import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import registerServiceWorker from './registerServiceWorker';
import App from "./components/App"
import injectTapEventPlugin from 'react-tap-event-plugin';
import {BrowserRouter} from "react-router-dom";

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));

registerServiceWorker();

//run unit tests
// import {runAll} from './tests'
// runAll();