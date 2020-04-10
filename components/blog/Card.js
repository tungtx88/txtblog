import Link from 'next/link'
import renderHTML from 'react-render-html'
import moment from 'moment'
import { API } from '../../config'

const Card = ({ blog, blogType }) => {
    const showBlogCategories = blog => {
        return blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a>{(i ? ', ' : '') + c.name}</a>
            </Link>
        ))
    }

    const renderBlogExcerpt = (content) => {
        if (content && content.length > 0) {
            return renderHTML(content)
        }
    }

    const blogLink = `/blogs/${blog.slug}`
    return (
        <React.Fragment>
            <div className="entry clearfix">

                <div className="entry-image">
                    <Link href={blogLink}>
                        <a data-lightbox="image"><img className="image_fade" src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} /></a>
                    </Link>
                </div>

                <div className="entry-title">
                    <h2>
                        <Link href={blogLink}>
                            <a>{blog.title}</a>
                        </Link>
                    </h2>
                </div>
                <ul className="entry-meta clearfix">
                    <li><i className="icon-calendar3"></i> {moment(blog.updatedAt).fromNow()}</li>
                    <li><a href="#"><i className="icon-user"></i> {blog.postedBy.name}</a></li>
                    <li><i className="icon-folder-open"></i>
                        {showBlogCategories(blog)}
                    </li>
                    {/* <li><a href="blog-single.html#comments"><i className="icon-comments"></i> 13 Comments</a></li>
                    <li><a href="#"><i className="icon-camera-retro"></i></a></li> */}
                </ul>
                <div className="entry-content">
                    {renderBlogExcerpt(blog.excerpt)}
                    <Link href={blogLink}>
                        <a className="more-link">Read More</a>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Card