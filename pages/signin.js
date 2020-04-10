import Layout from '../components/Layout'
import SigninComponent from '../components/auth/SigninComponent'

const Signin = () => {
    return (
        <Layout>
            <section id="content">
                <div className="content-wrap">
                    <div className="container clearfix">
                        <h2 className="text-center pt-4 pb-4">Sign In Page</h2>
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <SigninComponent />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </Layout>
    )
}

export default Signin