import {applyMiddleware, compose, createStore} from 'redux'

import reducer from "./reducers"
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {syncHistory} from 'redux-simple-router'
import createHistory from 'history/createBrowserHistory'

export const history = createHistory();

const reduxRouter = syncHistory(history);

const middleware = applyMiddleware(reduxRouter, thunk, logger);

//todo remove when development is done
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(reducer, composeEnhancers( middleware));