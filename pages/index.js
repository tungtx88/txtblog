import Layout from '../components/Layout'
import Head from 'next/head'
import Slider from '../components/Slider/Slider'
import BlogList from '../components/blog/BlogList'
import { useState } from 'react'
import Link from 'next/link'
import { listBlogsWithCategoriesAndTags } from '../actions/blog'
import { APP_NAME, DOMAIN, FB_APP_ID } from '../config'

const Index = ({ blogs }) => {
    const [loadedBlogs, setLoadedBlogs] = useState([...blogs])
    const head = () => (
        <Head>
            <title>
                SEO BLOG | {APP_NAME}
            </title>
            <meta
                name="description"
                content="seo blog website"
            />
            <link rel="canonical" href={`${DOMAIN}`} />
            <meta property="og:title" content={`Lastest website abc | ${APP_NAME}`} />
            <meta property="og:description" content={`Description Lastest website abc | ${APP_NAME}`} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content="/static/images/seoblog.jpg" />
            <meta property="og:image:secure_url" content="/static/images/seoblog.jpg" />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    )
    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <Slider />
                    <section id="content">
                        <div className="content-wrap">
                            <div className="container clearfix">
                                <div className="heading-block center">
                                    <h1>Recent Articles</h1>
                                    <span>We almost blog regularly about this &amp; that.</span>
                                </div>
                                <div id="posts">
                                    <BlogList blogs={loadedBlogs} />
                                </div>
                                <div className="text-center">
                                    <Link href="/blogs">
                                        <a className="btn btn-outline-secondary">View All Blogs</a>
                                    </Link>
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
    return await listBlogsWithCategoriesAndTags(skip, limit).then(data => {
        if (data.error) {
            console.log(data.error)
        } else {
            return {
                props: {
                    blogs: data.blogs
                }
            }
        }
    })
}
export default Index