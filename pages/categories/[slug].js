import Head from 'next/head'
import Link from 'next/link'
import {withRouter} from 'next/router'
import Layout from '../../components/Layout'
import { useState, useEffect } from 'react'
import { singleCategoryBlogs } from '../../actions/category'
import PageTitle from '../../components/PageTitle/PageTitle'
import { API, APP_NAME, DOMAIN, FB_APP_ID } from '../../config'
import CardImageLeft from '../../components/blog/CardImageLeft'
import NProgress from 'nprogress'
import '../../node_modules/nprogress/nprogress.css'

const Category = ({ category, blogs, query, router, blogLimit, blogSkip, blogSize }) => {
    const [limit, setLimit] = useState(blogLimit)
    const [skip, setSkip] = useState(blogSkip)
    const [size, setSize] = useState(blogSize)
    const [totalSize, setTotalSize] = useState(0)
    const [loadedBlogs, setLoadedBlogs] = useState([...blogs])

    useEffect(() => {
        getTotalBlogs()
        return () => { }
    }, [])

    const breadCrumbLinks = [
        {
            href: '/blogs',
            name: 'blogs',
        },
        {
            href: '/categories',
            name: 'category'
        }
    ]

    const head = () => (
        <Head>
            <title>
                {category.name} | {APP_NAME}
            </title>
            <meta
                name="description"
                content={category.name}
            />
            <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
            <meta property="og:title" content={`${category.name} | ${APP_NAME}`} />
            <meta property="og:description" content={`Category ${category.name} | ${APP_NAME}`} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content="/static/images/seoblog.jpg" />
            <meta property="og:image:secure_url" content="/static/images/seoblog.jpg" />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    )

    const getTotalBlogs = () => {
        singleCategoryBlogs(query.slug, 0, 0).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setTotalSize(data.size)
            }
        })
    }

    const showAllBlogs = () => {
        return loadedBlogs.map((b, i) => {
            return (
                <article key={i}>
                    <CardImageLeft blog={b} />
                </article>
            )
        })
    }

    const pagNext = () => {
        NProgress.start()
        let toSkip = skip + limit
        singleCategoryBlogs(query.slug, toSkip, limit).then(data => {
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
        singleCategoryBlogs(query.slug, toSkip, limit).then(data => {
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
                    <PageTitle heading={category.name} subHeading="List News By Category" bcLinks={breadCrumbLinks}/>
                    <section id="content">
                        <div className="content-wrap">
                            <div className="container clearfix">
                                <div id="posts" className="small-thumbs">
                                    {showAllBlogs()}
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

Category.getInitialProps = ({ query }) => {
    let skip = 0
    let limit = 2
    return singleCategoryBlogs(query.slug, skip, limit).then(data => {
        if (data.error) {
            console.log(data.error)
        } else {
            return {
                category: data.category,
                blogs: data.blogs,
                // totalBlogs: data.size,
                blogSkip: skip,
                blogLimit: limit,
                blogSize: data.size,
                query
            }
        }
    })
}



export default withRouter(Category)