import { API } from '../../config'
import Link from 'next/link'
import moment from 'moment'
import renderHTML from 'react-render-html'
import smartTrim from '../../helpers/smartTrim'
const RelatedBlogCard = ({ blog }) => {
    return (
        <React.Fragment>
            <div className="mpost clearfix">
                <div className="entry-image">
                    <Link href={`/blogs/${blog.slug}`}>
                        <a><img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} /></a>
                    </Link>
                </div>
                <div className="entry-c">
                    <div className="entry-title">
                        <h4>
                            <Link href={`/blogs/${blog.slug}`}>
                                <a>{blog.title}</a>
                            </Link>

                        </h4>
                    </div>
                    <ul className="entry-meta clearfix">
                        <li><i className="icon-calendar3"></i> {moment(blog.updatedAt).fromNow()}</li>
                        {/* <li><a href="#"><i className="icon-comments"></i> 12</a></li> */}
                    </ul>
                    <div className="entry-content">
                        {blog.body && renderHTML(smartTrim(blog.body, 150, '', ' ...'))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default RelatedBlogCard