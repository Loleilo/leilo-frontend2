import {combineReducers} from 'redux'
import {createFetchListReducer} from '../list'

export default combineReducers({
    atomGroups: createFetchListReducer('atomGroups'),
    atomValues: createFetchListReducer('atomValues'),
})