import {
    GET_COMMENT,
    ADD_COMMENT,
    COMMENT_ERROR,
    COMMENT_SUCCESS,
    REMOVE_COMMENT_WARNING
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case GET_COMMENT:
            console.log(action.payload)
            return {
                ...state,
                comment: action.payload,
                error: ''
            }
        case ADD_COMMENT:
            return {
                ...state,
                comment: [action.payload, ...state.comment],
                success: true
            }
        case COMMENT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case REMOVE_COMMENT_WARNING:
            return {
                ...state,
                error: '',
                success: false
            }
        default:
            return state
    }
}