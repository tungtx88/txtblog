import Layout from '../../components/Layout'
import Admin from '../../components/auth/Admin'
import BlogRead from '../../components/crud/BlogRead'
import Link from 'next/link'
import PageTitle from '../../components/PageTitle/PageTitle'

const CategoryTag = () => {
    const breadCrumbLinks = [
        {
            href: '/admin',
            name: 'dashboard'
        }
    ]
    return (
        <Layout>
            <Admin>
                <PageTitle heading="Dashboard" subHeading="Managing Blogs Page" bcLinks={breadCrumbLinks} />
                <section id="content">
                    <div className="content-wrap">
                        <div className="container clear-fix">
                            <div className="row">
                                <div className="col-md-12">
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <Link href="/admin/crud/blog">
                                                <a className="nav-link"><i className="icon-plus"></i> <span className="ml-1">Add new blog</span></a>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="/admin/crud/category-tag">
                                                <a className="nav-link"><i className="icon-plus"></i> <span className="ml-1">Add categories & tags</span></a>
                                            </Link>
                                        </li>
                                    </ul>
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