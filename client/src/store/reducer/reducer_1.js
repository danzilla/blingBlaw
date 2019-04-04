// Reducers 
// 3 | Action_Type -> Action_Creator -> Reducers 

// import ACTION Types
//import * as ACTION_TYPES from '../action/actionsType'
import {combineReducers} from 'redux'
import actionName from './reduxStateReducer'
//import { actionName } from '../action/action';

const rootReducer = combineReducers({
    reduxState: actionName
})

export default rootReducer