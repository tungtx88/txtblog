import Layout from '../../components/Layout'
import Link from 'next/link'
import Admin from '../../components/auth/Admin'

const AdminIndex = () => {
    return (
        <Layout>
            <Admin>
                <section id="content">
                    <div className="content-wrap">
                        <div className="container clearfix">
                            <div className="row">
                                <div className="col-md-12">
                                    <h2>Admin Dashboard</h2>
                                </div>
                                <div className="col-md-4">
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <Link href="/admin/crud/category-tag">
                                                <a>Create Category</a>
                                            </Link>
                                        </li>
                                        <li className="list-group-item">
                                            <Link href="/admin/crud/blog">
                                                <a>Create Blog</a>
                                            </Link>
                                        </li>
                                        <li className="list-group-item">
                                            <Link href="/admin/crud/blogs">
                                                <a>Managing Blogs</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-8">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Admin>
        </Layout>
    )
}

export default AdminIndex
