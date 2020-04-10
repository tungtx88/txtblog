import {useState, useEffect} from 'react'
import {signin, authenticate, isAuth} from '../../actions/auth'
import Router from 'next/router'

const SigninComponent = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })

    const {email, password, error, loading, message, showForm} = values

    useEffect(() => {
        isAuth() && Router.push(`/`)
    }, [])

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : null)
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : null)
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : null)

    const SigninForm = () => {
        const handleSubmit = (e) => {
            e.preventDefault()
            setValues({...values, loading: true, error: false})
            const user = {email, password};
            signin(user)
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error})
                } else {
                    // save user token to cookie

                    //save user info to local storage

                    //authenticate user
                    authenticate(data, ()=>{
                        if (isAuth() && isAuth().role === 1) {
                            Router.push(`/admin`)
                        } else {
                            Router.push(`/user`)
                        }
                    })
                }
            })
        }
        const handleChange = (name) => (e) => {
            setValues({
                ...values,
                error: false,
                [name] : e.target.value
            })
        }
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input value={email} onChange={handleChange('email')} type="email" className="form-control" placeholder="Type your email" />
                </div>

                <div className="form-group">
                    <input value={password} onChange={handleChange('password')} type="password" className="form-control" placeholder="Type your password" />
                </div>

                <div>
                    <button className="button button-3d button-black nomargin" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        )
    }

    return (
        <React.Fragment>
            {showLoading()}
            {showError()}
            {showMessage()}
            {showForm && SigninForm()}
        </React.Fragment>
    )
}

export default SigninComponent