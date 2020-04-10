import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { useState, useEffect, useContext } from 'react'
import Layout from '../../components/Layout'
import RelatedBlogs from '../../components/blog/RelatedBlogs'
import CommentList from '../../components/comment/CommentList'
import CommentForm from '../../components/comment/CommentForm'
import PageTitle from '../../components/PageTitle/PageTitle'
import { singleBlog, listRelated, prevBlog, nextBlog } from '../../actions/blog'
import { API, APP_NAME, DOMAIN, FB_APP_ID } from '../../config'
import moment from 'moment'
import renderHTML from 'react-render-html'


const SingleBlog = ({ blog, query, router }) => {
    const [related, setRelated] = useState([])
    const [prev, setPrev] = useState({})
    const [next, setNext] = useState({})

    const loadRelated = () => {
        listRelated({ blog }).then(data => {
            if (data) {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setRelated(data)
                }
            } else {
                setRelated([])
            }
        })
    }

    const loadPrevBlog = () => {
        prevBlog({ blog }).then(data => {
            if (data) {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setPrev(data)
                }
            } else {
                setPrev({})
            }
        })
    }

    const loadNextBlog = () => {
        nextBlog({ blog }).then(data => {
            if (data) {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setNext(data)
                }
            } else {
                setNext({})
            }
        })
    }

    const loadPrevLink = () => {
        if (prev.slug) {
            return <Link href={`/blogs/${prev.slug}`}><a>&lArr; {prev.title}</a></Link>
        }
    }

    const loadNextLink = () => {
        if (next.slug) {
            return <Link href={`/blogs/${next.slug}`}><a>{next.title} &rArr;</a></Link>
        }
    }


    useEffect(() => {
        loadRelated()
        loadPrevBlog()
        loadNextBlog()
        return () => { }
    }, [router])

    const head = () => {
        return (
            <Head>
                <title>
                    {blog.title} | {APP_NAME}
                </title>
                <meta
                    name="description"
                    content={blog.mdesc}
                />
                <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
                <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
                <meta property="og:description" content={`${blog.mdesc}`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
                <meta property="og:site_name" content={`${APP_NAME}`} />

                <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
                <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`} />
                <meta property="og:image:type" content="image/jpg" />
                <meta property="fb:app_id" content={`${FB_APP_ID}`} />
            </Head>
        )
    }

    const showBlogCategories = blog => {
        return blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a>{(i ? ', ' : '') + c.name}</a>
            </Link>
        ))
    }

    const showBlogTags = blog => {
        return blog.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a>{t.name}</a>
            </Link>
        ))
    }

    const breadCrumbLinks = [
        {
            href: '/blogs',
            name: 'blogs'
        },
        {
            href: '',
            name: 'Single Blog'
        }
    ]

    return <React.Fragment>
        {head()}
        <Layout>
            <main>
                <PageTitle heading="Single Blog" subHeading="Single Blog Page" bcLinks={[...breadCrumbLinks]} />
                <section id="content">
                    <div className="content-wrap">
                        <div className="container clearfix">
                            <div className="single-post nobottommargin">
                                <div className="entry clearfix">
                                    <div className="entry-title">
                                        <h2>{blog.title}</h2>
                                    </div>

                                    <ul className="entry-meta clearfix">
                                        <li><i className="icon-calendar3"></i> {moment(blog.updatedAt).fromNow()}</li>
                                        <li><a href="#"><i className="icon-user"></i> {blog.postedBy.name}</a></li>
                                        <li><i className="icon-folder-open"></i>{showBlogCategories(blog)}</li>
                                        {/* <li><a href="#"><i className="icon-comments"></i> 43 Comments</a></li>
                                        <li><a href="#"><i className="icon-camera-retro"></i></a></li> */}
                                    </ul>

                                    <div className="entry-image bottommargin">
                                        <a><img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} /></a>
                                    </div>

                                    <div className="entry-content notopmargin">
                                        {renderHTML(blog.body)}
                                    </div>

                                    <div className="tagcloud clearfix bottommargin">
                                        {showBlogTags(blog)}
                                    </div>

                                    <div className="clear"></div>

                                    <div className="si-share noborder clearfix">
                                        <span>Share this Post:</span>
                                        <div>
                                            <a href="#" className="social-icon si-borderless si-facebook">
                                                <i className="icon-facebook"></i>
                                                <i className="icon-facebook"></i>
                                            </a>
                                            <a href="#" className="social-icon si-borderless si-twitter">
                                                <i className="icon-twitter"></i>
                                                <i className="icon-twitter"></i>
                                            </a>
                                            <a href="#" className="social-icon si-borderless si-pinterest">
                                                <i className="icon-pinterest"></i>
                                                <i className="icon-pinterest"></i>
                                            </a>
                                            <a href="#" className="social-icon si-borderless si-gplus">
                                                <i className="icon-gplus"></i>
                                                <i className="icon-gplus"></i>
                                            </a>
                                            <a href="#" className="social-icon si-borderless si-rss">
                                                <i className="icon-rss"></i>
                                                <i className="icon-rss"></i>
                                            </a>
                                            <a href="#" className="social-icon si-borderless si-email3">
                                                <i className="icon-email3"></i>
                                                <i className="icon-email3"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="post-navigation clearfix">

                                <div className="col_half nobottommargin">
                                    {loadPrevLink()}
                                </div>

                                <div className="col_half col_last tright nobottommargin">
                                    {loadNextLink()}
                                </div>

                            </div>

                            <div className="line"></div>

                            <RelatedBlogs blogs={related} />
                            
                            <div id="comments" className="clearfix">
                                <CommentList blogId={blog._id} />
                                <CommentForm blogId={blog._id} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    </React.Fragment>
}

SingleBlog.getInitialProps = ({ query }) => {
    return singleBlog(query.slug).then(data => {
        if (data.error) {
            console.log(data.error)
        } else {
            return { blog: data, query }
        }
    })
}

export default withRouter(SingleBlog)