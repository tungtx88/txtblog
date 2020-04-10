import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'
import BlogCreate from '../../../components/crud/BlogCreate'
import Link from 'next/link'
import PageTitle from '../../../components/PageTitle/PageTitle'

const CategoryTag = () => {
    const breadCrumbLinks = [
        {
            href: '/admin',
            name: 'dashboard'
        },
        {
            href: '/admin/crud/blogs',
            name: 'blogs'
        },
        {
            href: '',
            name: 'Create new blog'
        }
    ]
    return (
        <Layout>
            <Admin>
                <PageTitle heading="Create Blog" subHeading="Create Blog Page" bcLinks={breadCrumbLinks} />
                <section id="content">
                    <div className="content-wrap">
                        <div className="container clear-fix">
                            <div className="row">
                                <div className="col-md-12 pt-3 pb-3">
                                    {/* <h2>Create new blog</h2> */}
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-5">
                                        <Link href="/admin/crud/blogs">
                                            <a><i className="icon-arrow-left"></i> <span className="ml-1">Back to blog list</span></a>
                                        </Link>
                                    </div>
                                    <BlogCreate />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Admin>
        </Layout>
    )
}

export default CategoryTag
