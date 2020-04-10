import { useEffect, useContext } from 'react'
import CommentContext from '../../context/comment/commentContext'
import moment from 'moment'

const CommentList = ({ blogId }) => {
    const commentContext = useContext(CommentContext)
    const { comment, getComment } = commentContext

    useEffect(() => {
        getComment(blogId)
    }, [])


    const renderCommentBlocks = () => {
        return comment.map((c, i) => (
            <li className="comment even thread-even depth-1" id="li-comment-1" key={i}>

                <div id="comment-1" className="comment-wrap clearfix">

                    <div className="comment-meta">

                        <div className="comment-author vcard">

                            <span className="comment-avatar clearfix">
                                <img alt='' src='http://0.gravatar.com/avatar/ad516503a11cd5ca435acc9bb6523536?s=60' className='avatar avatar-60 photo avatar-default' height='60' width='60' /></span>

                        </div>

                    </div>

                    <div className="comment-content clearfix">

                        <div className="comment-author">{c.username}<span><a href="#" title="Permalink to this comment">{moment(c.updatedAt).fromNow()}</a></span></div>

                        <p>{c.body}</p>

                        {/* <a className='comment-reply-link' href='#'><i className="icon-remove"></i></a> */}

                    </div>

                    <div className="clear"></div>

                </div>

            </li>
        ))
    }

    const renderComment = () => {
        if (comment.length > 0) {
            return (
                <React.Fragment>
                    <h3 id="comments-title"><span>{comment.length}</span> Comment{comment.length > 1 ? 's' : ''}</h3>
                    <ol className="commentlist clearfix">
                        {renderCommentBlocks()}
                    </ol>
                    <div className="clear"></div>
                </React.Fragment>
            )
        }
    }
    return (
        <React.Fragment>
            {renderComment()}
        </React.Fragment>
    )
}

export default CommentList