import Link from 'next/link'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import { isAuth, getCookie } from '../../actions/auth'
import { list, removeBlog } from '../../actions/blog'
import { API } from '../../config'
import moment from 'moment'
import renderHTML from 'react-render-html'
import NProgress from 'nprogress'
import '../../node_modules/nprogress/nprogress.css'

const BlogRead = () => {
    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState([])
    const [auth, setAuth] = useState(isAuth())
    const token = getCookie('token')

    useEffect(() => {
        loadBlogs()
        return () => { }
    }, [])

    const loadBlogs = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setBlogs(data)
            }
        })
    }

    const loadEditButton = (blog) => {
        if (auth && auth.role === 0) {
            return <Link href={`/user/crud/blog/${blog.slug}`}>
                <a>Update</a>
            </Link>
        } else if (auth && auth.role === 1) {
            return <Link href={`/admin/crud/${blog.slug}`}>
                <a className="btn btn-sm btn-warning mr-2">Update</a>
            </Link>
        }
    }

    const deleteblog = slug => {
        NProgress.start()
        removeBlog(slug, token).then(data => {
            if (data.error) {
                NProgress.done()
                console.log(data.error)
            } else {
                setMessage(data.message)
                loadBlogs()
                NProgress.done()
            }
        })
    }

    const deleteConfirm = slug => {
        let answer = window.confirm('Do you want to delete this blog?')
        if (answer) {
            deleteblog(slug)
        }
    }

    const showAllBlogs = () => {
        return blogs.map((blog, i) => (
            <div className="media mt-5 mb-5">
                <img className="mr-4" src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} style={{maxHeight: "250px", width: "250px"}}/>
                <div className="media-body">
                    <h5 className="mt-0">{blog.title}</h5>
                    {renderHTML(blog.excerpt)}
                    {loadEditButton(blog)}
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(blog.slug)}>Delete</button>
                </div>
            </div>
            // <div className="mt-4" key={i}>
            //     <h3>{blog.title}</h3>
            //     <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} className="img-fluid" style={{maxHeight: "200px"}}/>
            //     <p className="font-italic">
            //         Written by {blog.postedBy.name} | Published on {moment(blog.updatedAt).fromNow()}
            //     </p>
            //     <div>{renderHTML(blog.excerpt)}</div>
            //     {loadEditButton(blog)}
            //     <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(blog.slug)}>Delete</button>
            // </div>
        ))
    }

    const showMessage = () => {
        if (message && message.length > 0) {
            setTimeout(() => {
                setMessage('')
            }, 1500);
            return (
                <div className="alert alert-warning">{message}</div>
            )
        }
    }

    return (
        <React.Fragment>
            <div className="col-md-12">
                {showMessage()}
                {showAllBlogs()}
            </div>
        </React.Fragment>
    )
}

export default BlogRead