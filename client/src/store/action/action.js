// Actions Creator
// 2 - JS
// Call Action types into ACTION_CREATOR

import * as ACTION_TYPES from './actionsType'

export function actionName (reduxState){
    return{
        type: "ACTION_NAME",
        payload: reduxState
    }
}