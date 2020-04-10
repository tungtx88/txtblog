import Layout from '../../components/Layout'
import Link from 'next/link'
import Private from '../../components/auth/Private'

const UserIndex = () => {
    return (
        <Layout>
            <Private>
                <h2>Index Page</h2>
                <Link href="/signup">
                    signup
                </Link>
            </Private>
        </Layout>
    )
}

export default UserIndex
