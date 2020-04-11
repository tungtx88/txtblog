import { useReducer } from 'react'
import ThemeContext from './themeContext'
import ThemeReducer from './themeReducer'
import { API } from '../../config'

import {
    ADD_BODY_CLASSNAME,
    REMOVE_BODY_CLASSNAME,
    SHOW_SEARCH_FORM
} from '../types'

const ThemeState = props => {
    const initialState = {
        body: {
            className: []
        },
        search: {
            show: false
        },
        navbar: {
            show: true
        }
    }

    const [state, dispatch] = useReducer(ThemeReducer, initialState)


    // Add body className
    const addBodyClassName = className => {
        dispatch({ type: ADD_BODY_CLASSNAME, payload: className })
    }

    // Remove body className
    const removeBodyClassName = className => {
        dispatch({ type: REMOVE_BODY_CLASSNAME, payload: className })
    }

    // Show search form
    const showSearchForm = show => {
        dispatch({ type: SHOW_SEARCH_FORM, payload: show })
    }

    return (
        <ThemeContext.Provider
            value={{
                body: state.body,
                search: state.search,
                navbar: state.navbar,
                addBodyClassName,
                removeBodyClassName,
                showSearchForm
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeState