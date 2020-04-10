import Head from 'next/head'
import Link from 'next/link'
import NProgress from 'nprogress'
import { withRouter } from 'next/router'
import Layout from '../../components/Layout'
import { useState } from 'react'
import { listBlogsWithCategoriesAndTags } from '../../actions/blog'
import BlogList from '../../components/blog/BlogList'
import PageTitle from '../../components/PageTitle/PageTitle'
import { APP_NAME, DOMAIN, FB_APP_ID } from '../../config'
import '../../node_modules/nprogress/nprogress.css'



const Blogs = ({ blogs, totalBlogs, router, blogLimit, blogSkip, blogSize }) => {
    const [limit, setLimit] = useState(blogLimit)
    const [skip, setSkip] = useState(blogSkip)
    const [size, setSize] = useState(blogSize)
    const [totalSize, setTotalSize] = useState(totalBlogs)
    const [loadedBlogs, setLoadedBlogs] = useState([...blogs])

    const breadCrumbLinks = [
        {
            href: '/blogs',
            name: 'blogs'
        }
    ]

    const head = () => (
        <Head>
            <title>
                SEO BLOG | {APP_NAME}
            </title>
            <meta
                name="description"
                content="seo blog website"
            />
            <link rel="canonical" href={`${DOMAIN}${router.path_name}`} />
            <meta property="og:title" content={`Lastest website abc | ${APP_NAME}`} />
            <meta property="og:description" content={`Description Lastest website abc | ${APP_NAME}`} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.path_name}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content="/static/images/seoblog.jpg" />
            <meta property="og:image:secure_url" content="/static/images/seoblog.jpg" />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    )

    const pagNext = () => {
        NProgress.start()
        let toSkip = skip + limit
        listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setLoadedBlogs([...data.blogs])
                setSize(data.size)
                setSkip(toSkip)
                NProgress.done()
            }
        })
    }

    const pagPrev = () => {
        NProgress.start()
        let toSkip = skip - limit
        if (toSkip < 0) {
            toSkip = 0
        }
        listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setLoadedBlogs([...data.blogs])
                setSize(data.size)
                setSkip(toSkip)
                NProgress.done()
            }
        })
    }

    const showNextButton = () => {
        if (totalSize > 0 && totalSize > (skip + limit)) {
            return (
                <Link href="">
                    <a className="btn btn-outline-dark float-right" onClick={pagNext}>Newer &rarr;</a>
                </Link>
            )
        }
    }

    const showPrevButton = () => {
        if (skip > 0) {
            return (
                <Link href="">
                    <a className="btn btn-outline-secondary float-left" onClick={pagPrev}>&larr; Older</a>
                </Link>
            )
        }
    }

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <PageTitle heading="Blog List" subHeading="Blog List Page" bcLinks={breadCrumbLinks} />
                    <section id="content">
                        <div className="content-wrap">
                            <div className="container clearfix">
                                <div id="posts" className="small-thumbs">
                                    <BlogList blogs={loadedBlogs} cardType="left"/>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        {showPrevButton()}
                                        {showNextButton()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </Layout>
        </React.Fragment>
    )
}

export async function getStaticProps() {
    let skip = 0
    let limit = 5
    let totalBlogs = 0

    await listBlogsWithCategoriesAndTags(0, 0).then(data => {
        if (data.error) {
            console.log(data.error)
        } else {
            totalBlogs = data.size
        }
    })

    return await listBlogsWithCategoriesAndTags(skip, limit).then(data => {
        if (data.error) {
            console.log(data.error)
        } else {
            return {
                props: {
                    blogs: data.blogs,
                    categories: data.categories,
                    tags: data.tags,
                    blogSkip: skip,
                    blogLimit: limit,
                    blogSize: data.size,
                    totalBlogs
                }
            }
        }
    })

}

export default withRouter(Blogs)