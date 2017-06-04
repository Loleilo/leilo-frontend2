import {combineReducers} from 'redux'
import {createListReducer} from 'reducers/uuidList'

export default combineReducers({
    atomGroups: createListReducer('atomGroups'),
    atomValues: createListReducer('atomValues'),
})