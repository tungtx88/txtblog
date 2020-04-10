import Head from 'next/head'
import Link from 'next/link'
import NProgress from 'nprogress'
import { withRouter, useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { useState, useEffect } from 'react'
import { listSearch } from '../../actions/blog'
import CardImageLeft from '../../components/blog/CardImageLeft'
import PageTitle from '../../components/PageTitle/PageTitle'
import { APP_NAME, DOMAIN, FB_APP_ID } from '../../config'
import '../../node_modules/nprogress/nprogress.css'

const Search = ({ router }) => {
    const [limit, setLimit] = useState(3)
    const [skip, setSkip] = useState(0)
    const [totalSize, setTotalSize] = useState(0)
    const [size, setSize] = useState(0)
    const [loadedBlogs, setLoadedBlogs] = useState([])
    const [searchDone, setSearchDone] = useState(false)


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

    const getSearchResult = async () => {
        if (router.query.search) {
            await listSearch({ search: router.query.search, skip: 0, limit: 0 }).then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setTotalSize(data.size)
                }
            })

            await listSearch({ search: router.query.search, skip, limit }).then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setLoadedBlogs([...data.blogs])
                    setSize(data.size)
                    setSearchDone(true)
                }
            })


        } else {
            setTotalSize(0)
            setSize(0)
            setSearchDone(false)
        }
    }

    useEffect(() => {
        getSearchResult()
    }, [router])

    const breadCrumbLinks = [
        {
            href: '/blogs',
            name: 'blogs'
        },
        {
            href: '/search',
            name: 'search'
        }
    ]

    const pagNext = () => {
        if (router.query.search) {
            NProgress.start()
            let toSkip = skip + limit
            listSearch({ search: router.query.search, skip: toSkip, limit }).then(data => {
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
    }

    const pagPrev = () => {
        NProgress.start()
        let toSkip = skip - limit
        if (toSkip < 0) {
            toSkip = 0
        }
        listSearch({ search: router.query.search, skip: toSkip, limit }).then(data => {
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

    const showAllBlogs = () => {
        if (router.query.search) {
            if (size === 0 && searchDone === false) {
                return (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )
            } else {
                if (size === 0 && searchDone === true) {
                    return <p>{`Blog not found`}</p>
                }
                return loadedBlogs.map((b, i) => {
                    return (
                        <React.Fragment key={i}>
                            <p>{`Found ${size} blog${(size > 1 ) ? 's :': ' :'}`}</p>
                            <article>
                                <CardImageLeft blog={b} />
                            </article>
                        </React.Fragment>
                    )
                })
            }
        } else {
            return <p>{`Blog not found`}</p>
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
                    <PageTitle heading="Search" subHeading="Search Page" bcLinks={breadCrumbLinks} />
                    <section id="content">
                        <div className="content-wrap">
                            <div className="container clearfix">
                                <div id="posts" class="small-thumbs">
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

export default withRouter(Search)