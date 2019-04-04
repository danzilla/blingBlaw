export default function(state = [], action) {
    switch (action.type) {

    case 'ACTION_NAME':
        return action.payload
    default:
        return state
    }
}