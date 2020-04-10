import { useState, useRef, useEffect } from 'react'
import { withRouter } from 'next/router'
import { isAuth, getCookie } from '../../actions/auth'
import { getCategories } from '../../actions/category'
import { getTags } from '../../actions/tag'
import { createBlog } from '../../actions/blog'
import BlogEditor from './BlogEditor'
import { showFormSubmitError, showFormSubmitSuccess } from '../../helpers/formMessages'
import NProgress from 'nprogress'
import '../../node_modules/nprogress/nprogress.css'


const BlogCreate = ({ router }) => {
    const editorRef = useRef()
    const blogFromLS = () => {
        if (typeof window === 'undefined') {
            return null
        }
        if (localStorage.getItem('blog') && typeof localStorage.getItem('blog') !== 'undefined') {
            return localStorage.getItem('blog')
        } else {
            return null
        }
    }
    const [body, setBody] = useState(blogFromLS(false))
    const [img, setImg] = useState(null)
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false
    })
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [checked, setChecked] = useState([])
    const [tagChecked, setTagChecked] = useState([])


    const { title, error, sizeError, success, formData, hidePublishButton } = values
    const token = getCookie('token')

    useEffect(() => {
        setValues({ ...values, formData: new FormData() }),
            initCategories(),
            initTags()
        return () => { }
    }, [router])

    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setCategories(data)
            }
        })
    }

    const initTags = () => {
        getTags().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setTags(data)
            }
        })
    }

    const handleToggle = c => {
        setValues({ ...values, error: false })
        const clickedCategory = checked.indexOf(c)
        const all = [...checked]
        if (clickedCategory === -1) {
            all.push(c)
        } else {
            all.splice(clickedCategory, 1)
        }
        setChecked(all)
        formData.set('categories', all)
    }

    const handleTagToggle = t => {
        setValues({ ...values, error: false })
        const clickedTag = tagChecked.indexOf(t)
        const all = [...tagChecked]
        if (clickedTag === -1) {
            all.push(t)
        } else {
            all.splice(clickedTag, 1)
        }
        setTagChecked(all)
        formData.set('tags', all)
    }

    const handleChange = name => e => {
        if (name === 'photo') {
            if (event.target.files[0]) {
                setImg(URL.createObjectURL(event.target.files[0]))
            }
        }
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value, formData, error: '' })
    }

    const handleBody = e => {
        setBody(e)
        formData.set('body', e)
        if (typeof window !== 'undefined') {
            localStorage.setItem('blog', e)
        }
    }

    const showCategories = () => {
        return categories && categories.map((c, i) => {
            return (
                <li className="list-unstyled" key={i}>
                    <input onChange={() => handleToggle(c._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{c.name}</label>
                </li>
            )
        })
    }

    const showTags = () => {
        return tags && tags.map((t, i) => {
            return (
                <li className="list-unstyled" key={i}>
                    <input onChange={() => handleTagToggle(t._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{t.name}</label>
                </li>
            )
        })
    }

    const publishBlog = e => {
        e.preventDefault()
        setBody(body)
        formData.set('body', body)
        createBlog(formData, token).then(data => {
            NProgress.start()
            if (data.error) {
                console.log(data.error)
                setValues({ ...values, error: data.error })
                setImg(null)
                NProgress.done()
            } else {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('blog')
                }
                editorRef.current.handleSetEditorContent('')
                setBody(null)
                setValues({ ...values, title: '', error: '', success: `A new blog title ${data.title} is created` })
                setTimeout(() => {
                    setValues({ ...values, title: '', success: '' })
                }, 2000)
                setImg(null)
                NProgress.done()
            }
        })

    }

    const createBlogForm = () => {
        return (
            <form onSubmit={publishBlog}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
                </div>

                <div className="form-group">
                    <BlogEditor ref={editorRef} onChange={handleBody} placeholder="Write something ..." />
                </div>

                <div>
                    <button className="btn btn-primary" onClick={publishBlog}>Publish</button>
                </div>
            </form>
        )
    }

    const renderPreviewImage = () => {
        if (img !== null) {
            return <img src={`${img}`} alt="" className="img-fluid d-block" style={{ maxHeight: '120px' }} />
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    <div>
                        {showFormSubmitError(error)}
                        {showFormSubmitSuccess(success)}
                    </div>
                    {createBlogForm()}
                </div>
                <div className="col-md-4">
                    <div className="form-group pb-2">
                        <h5>Featured Image</h5>
                        <hr />
                        {renderPreviewImage()}
                        <small className="text-muted">Max size: 1mb</small><br />
                        <label className="btn btn-outline-info" style={{ fontSize: '0.80rem' }}>Upload featured image
                            <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                        </label>
                    </div>
                    <div>
                        <h5>Categories</h5>
                        <hr />
                        <ul style={{ maxHeight: '100px', overflowY: 'scroll' }}>{showCategories()}</ul>
                    </div>


                    <div>
                        <h5>Tags</h5>
                        <hr />
                        <ul style={{ maxHeight: '100px', overflowY: 'scroll' }}>{showTags()}</ul>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default withRouter(BlogCreate)