import {applyMiddleware, compose, createStore} from 'redux'

import reducer from "./reducers"
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {syncHistory} from 'redux-simple-router'
import createHistory from 'history/createBrowserHistory'

export const history = createHistory();

const reduxRouter = syncHistory(history);

let middleware2 = [reduxRouter, thunk,];
if (process.env.NODE_ENV !== 'production')
    middleware2 = [reduxRouter, thunk, logger];

const middleware = applyMiddleware(...middleware2);

let composeEnhancers=(input)=>{return input};
if (process.env.NODE_ENV !== 'production')
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(reducer, composeEnhancers(middleware));