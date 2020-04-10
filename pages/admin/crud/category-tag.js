import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'
import Category from '../../../components/crud/Category'
import Tag from '../../../components/crud/Tag'
import PageTitle from '../../../components/PageTitle/PageTitle'
import Link from 'next/link'

const CategoryTag = () => {
    const breadCrumbLinks = [
        {
            href: '/admin',
            name: 'dashboard'
        },
        {
            href: '/admin/crud/category-tag',
            name: 'Categories and tags'
        }
    ]
    return (
        <Layout>
            <Admin>
                <PageTitle heading="Create Categories and Tags" subHeading="Categories and Tags Page" bcLinks={breadCrumbLinks} />
                <section id="content">
                    <div className="content-wrap">
                        <div className="container clearfix">
                            <div className="row">
                                <div className="col-md-12 pt-2 pb-4">
                                    {/* <h2>Manager Categories and Tags</h2> */}
                                    <Link href="/admin">
                                        <a><i className="icon-arrow-left"></i> <span className="ml-1">Back to dashboard</span></a>
                                    </Link>
                                </div>
                                <div className="col-md-6">
                                    <Category />
                                </div>
                                <div className="col-md-6">
                                    <Tag />
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
