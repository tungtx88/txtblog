import {useState, useEffect} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {isAuth, getCookie} from '../../actions/auth'
import {create, getTags, singleTag, removeTag} from '../../actions/tag'

const Tag = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        tags: [],
        removed: false,
        reload: false
    })

    const {name, error, success, tags, removed, reload} = values
    const token = getCookie('token')

    useEffect(() => {
        loadTags()
    },[reload])

    const loadTags = () => {
        getTags().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setValues({...values, tags: data})
            }
        })
    }

    const showTags = () => {
        return tags.map(tag => {
            return (
                <button onClick = {(e) => clickHandler(e, tag.slug)} title="Double click to delete" key={tag.name} className="btn btn-outline-primary mr-1 ml-1 mt-3">
                    {tag.name}
                </button>
            )
        })
    }

    let clicks = [];
    let timeout;
    const clickHandler = (event, slug) => {
        event.preventDefault()
        clicks.push(new Date().getTime());
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => {
            if (clicks.length > 1 && clicks[clicks.length - 1] - clicks[clicks.length - 2] < 250) {
                deleteConfirm(slug);
            }
        }, 250);
    }

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure want to delete this Tag ?')
        if (answer) {
            deleteTag(slug)
        }
    }

    const deleteTag = slug => {
        removeTag(slug, token).then(data => {
            if (data.error) {
                setValues({...values, error: data.error, success: false})
            } else {
                setValues({...values, error: false, success: false, name:'', removed: true, reload: !reload})
            }
        })
    }

    const clickSubmit = e => {
        e.preventDefault()
        // e.stopPropagation()
        create({name}, token).then(data => {
            if (data.error) {
                setValues({...values, error: data.error, success: false})
            } else {
                setValues({...values, error: false, success: true, name:'', removed: false, reload: !reload})
            }
        })
    }

    const handleChange = e => {
        setValues({...values, name: e.target.value, error: false, success: false, removed: ''})
    }

    const newTagForm = () => {
        return (
            <React.Fragment>
            <h3>Tags</h3>
            <form onSubmit={clickSubmit}>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" className="form-control" onChange={handleChange} value={name} required/>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary" onClick={clickSubmit}>Create</button>
                </div>
            </form>
            </React.Fragment>
        )
    }

    const showSucess = () => {
        if(success) {
            return <p className="text-success">Tag is created</p>
        }
    }

    const showError = () => {
        if(error) {
            return <p className="text-danger">Tag is exist</p>
        }
    }

    const showRemoved = () => {
        if(removed) {
            return <p className="text-danger">Tag is removed</p>
        }
    }

    // const mouseMoveHandler = e => {
    //     setValues({...values, error: false, success: false, removed: ''})
    // }

    return <React.Fragment>
        {showSucess()}
        {showError()}
        {showRemoved()}
        {newTagForm()}
        <div>{showTags()}</div>
    </React.Fragment>
}

export default Tag