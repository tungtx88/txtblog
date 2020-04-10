import fetch from 'isomorphic-fetch'
import {API} from '../config'
import queryString from 'query-string'

export const createComment = (comment) => {
    return fetch(`${API}/comment`, {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        body: comment
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const listComment = (blogId) => {
    return fetch(`${API}/comments`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({blogId})
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export default createComment