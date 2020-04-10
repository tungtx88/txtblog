import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'
import BlogRead from '../../../components/crud/BlogRead'
import Link from 'next/link'
import PageTitle from '../../../components/PageTitle/PageTitle'

const CategoryTag = () => {
    const breadCrumbLinks = [
        {
            href: '/admin',
            name: 'dashboard'
        },
        {
            href: '',
            name: 'Blogs'
        }
    ]
    return (
        <Layout>
            <Admin>
                <PageTitle heading="Blogs" subHeading="Managing Blogs Page" bcLinks = {breadCrumbLinks}/>
                <section id="content">
                    <div className="content-wrap">
                        <div className="container clear-fix">
                            <div className="row">
                                <div className="col-md-12">
                                    <Link href="/admin/crud/blog">
                                        <a><i className="icon-plus"></i> <span className="ml-1">Add new blog</span></a>
                                    </Link>
                                    <BlogRead />
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