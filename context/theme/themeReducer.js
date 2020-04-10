import {
    ADD_BODY_CLASSNAME,
    REMOVE_BODY_CLASSNAME,
    SHOW_SEARCH_FORM,
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case ADD_BODY_CLASSNAME:
            return {
                ...state,
                body: { ...state.body, className: [...state.body.className, action.payload] }
            }
        case REMOVE_BODY_CLASSNAME:
            return {
                ...state,
                body: { ...state.body, className: state.body.className.filter(val => val != action.payload) }
            }
        case SHOW_SEARCH_FORM:
            return {
                ...state,
                search: { ...state.search, show: action.payload }
            }
        default:
            return state
    }
}