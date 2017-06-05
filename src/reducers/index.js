import {combineReducers} from 'redux'
import errors from './errors'
import entitiesReducer from './entities'

export default combineReducers({
    errors: errors,
    entities: entitiesReducer
});