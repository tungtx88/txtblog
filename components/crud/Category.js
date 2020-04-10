import {useState, useEffect} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {isAuth, getCookie} from '../../actions/auth'
import {create, getCategories, singleCategory, removeCategory} from '../../actions/category'

const Category = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        categories: [],
        removed: false,
        reload: false
    })

    const {name, error, success, categories, removed, reload} = values
    const token = getCookie('token')

    useEffect(() => {
        loadCategories()
    },[reload])

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setValues({...values, categories: data})
            }
        })
    }

    const showCategories = () => {
        return categories.map(category => {
            return (
                <button onClick = {(e) => clickHandler(e, category.slug)} title="Double click to delete" key={category.name} className="btn btn-outline-primary mr-1 ml-1 mt-3">
                    {category.name}
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
        let answer = window.confirm('Are you sure want to delete this category ?')
        if (answer) {
            deleteCategory(slug)
        }
    }

    const deleteCategory = slug => {
        removeCategory(slug, token).then(data => {
            if (data.error) {
                setValues({...values, error: data.error, success: false})
            } else {
                setValues({...values, error: false, success: false, name:'', removed: true, reload: !reload})
                hideStatusText()
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
                hideStatusText()
            }
        })
    }

    const hideStatusText = (s = 1500) => {
        window.setTimeout(() => {
            setValues({...values, success: false, name:'', removed: '', error: false})
        }, s)
    }

    const handleChange = e => {
        setValues({...values, name: e.target.value, error: false, success: false, removed: ''})
    }

    const newCategoryForm = () => {
        return (
            <React.Fragment>
            <h3>Categories</h3>
            <form onSubmit={clickSubmit}>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" className="form-control" onChange={handleChange} value={name} required/>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
            </React.Fragment>
        )
    }

    const showSucess = () => {
        if(success) {
            return <p className="text-success">Category is created</p>
        }
    }

    const showError = () => {
        if(error) {
            return <p className="text-danger">Category is exist</p>
        }
    }

    const showRemoved = () => {
        if(removed) {
            return <p className="text-danger">Category is removed</p>
        }
    }

    // const mouseMoveHandler = e => {
    //     setValues({...values, error: false, success: false, removed: ''})
    // }

    return <React.Fragment>
        {showSucess()}
        {showError()}
        {showRemoved()}
        {newCategoryForm()}
        <div>{showCategories()}</div>
    </React.Fragment>
}

export default Category