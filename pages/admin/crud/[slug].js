import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'
import BlogUpdate from '../../../components/crud/BlogUpdate'
import Link from 'next/link'
import PageTitle from '../../../components/PageTitle/PageTitle'

const Blog = () => {
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
            name: 'Update blog'
        }
    ]
    return (
        <Layout>
            <Admin>
                <PageTitle heading="Update Blog" subHeading="Update Blog Page" bcLinks={breadCrumbLinks} />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 pt-3 pb-3">
                            {/* <h2 className="mb-1">Update blog</h2> */}
                        </div>
                        <div className="col-md-12">
                            <div className="mb-5">
                                <Link href="/admin/crud/blogs">
                                    <a><i className="icon-arrow-left"></i> <span className="ml-1">Back to blog list</span></a>
                                </Link>
                            </div>

                            <BlogUpdate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default Blog
