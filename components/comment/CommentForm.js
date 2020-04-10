
import { useState, useEffect, useContext } from 'react'
import Alert from '../../components/Alert'
import CommentContext from '../../context/comment/commentContext'
import AlertContext from '../../context/alert/alertContext'


const CommentForm = ({ blogId }) => {

    const commentContext = useContext(CommentContext)
    const alertContext = useContext(AlertContext)

    const { addComment, commentError, commentSuccess } = commentContext

    const [values, setValues] = useState({
        username: '',
        email: '',
        body: '',
        error: '',
        success: '',
        formData: '',
        blogId
    })
    const { username, email, body, formData } = values

    useEffect(() => {
        console.log('a')
        setValues({
            ...values,
            username: '',
            email: '',
            body: '',
            error: '',
            success: '',
            blogId,
            formData: new FormData()
        })
    }, [commentSuccess])


    const handleChange = name => e => {
        const value = e.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value, formData })
    }

    const submitComment = e => {
        e.preventDefault()
        formData.set('blogId', blogId)
        addComment(formData)
    }

    const showMessage = () => {
        if (commentError) {
            return (
                <div className={`alert alert-danger`} role="alert">{commentError}</div>
            )
        } else if (commentSuccess) {
            return (
                <div className={`alert alert-success`} role="alert">Thanks for your comment!</div>
            )
        }
    }

    const clearForm = () => {
        setValues({
            ...values,
            username: '',
            email: '',
            body: '',
            error: '',
            success: '',
            formData: '',
            blogId
        })
    }

    return (
        <div id="respond" className="clearfix">
            <h3>Leave a <span>Comment</span></h3>
            {showMessage()}
            <form className="clearfix" action="#" method="post" id="commentform" onSubmit={submitComment}>

                <div className="col_one_third">
                    <label htmlFor="username">Name <span className="text-danger">*</span></label>
                    <input type="text" name="username" id="username" value={username} size="22" tabIndex="1" className="sm-form-control" onChange={handleChange('username')} />
                </div>

                <div className="col_one_third">
                    <label htmlFor="email">Email <span className="text-danger">*</span></label>
                    <input type="text" name="email" id="email" value={email} size="22" tabIndex="2" className="sm-form-control" onChange={handleChange('email')} />
                </div>

                <div className="clear"></div>

                <div className="col_full">
                    <label htmlFor="body">Comment <span className="text-danger">*</span></label>
                    <textarea name="body" cols="58" rows="7" tabIndex="4" className="sm-form-control" value={body} onChange={handleChange('body')}></textarea>
                </div>

                <div className="col_full nobottommargin">
                    <button name="submit" type="submit" id="submit-button" tabIndex="5" value="Submit" className="button button-3d nomargin" onClick={submitComment}>Submit Comment</button>
                </div>

            </form>

        </div>
    )
}

export default CommentForm