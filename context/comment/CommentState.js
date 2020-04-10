import { useReducer } from 'react'
import CommentContext from './commentContext'
import CommentReducer from './commentReducer'
import { createComment, listComment } from '../../actions/comment'

import {
    GET_COMMENT,
    ADD_COMMENT,
    COMMENT_ERROR,
    REMOVE_COMMENT_WARNING,
} from '../types'

const CommentState = props => {
    const initialState = {
        comment: [],
        loading: false,
        error: null,
        success: false
    }

    const [state, dispatch] = useReducer(CommentReducer, initialState)

    const addComment = async (comment) => {
        await createComment(comment).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                dispatch({
                    type: ADD_COMMENT,
                    payload: data
                })
                setTimeout(() => {
                    dispatch({
                        type: REMOVE_COMMENT_WARNING
                    })
                }, 2000)
            }
        })
    }

    const getComment = async (blogId) => {
        await listComment(blogId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                dispatch({
                    type: GET_COMMENT,
                    payload: data
                })
            }
        })
    }

    const setError = (error) => {
        dispatch({
            type: COMMENT_ERROR,
            payload: error
        })

        setTimeout(() => {
            dispatch({
                type: REMOVE_COMMENT_WARNING
            })
        }, 2000)
    }

    return (
        <CommentContext.Provider
            value={{
                comment: state.comment,
                commentLoading: state.loading,
                commentError: state.error,
                commentSuccess: state.success,
                addComment,
                getComment
            }}
        >
            {props.children}
        </CommentContext.Provider>
    )
}

export default CommentState