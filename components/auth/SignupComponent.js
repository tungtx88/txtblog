import {useState, useEffect} from 'react'
import {signup, isAuth} from '../../actions/auth'
import Router from 'next/router'

const SignupComponent = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })

    const {name, email, password, error, loading, message, showForm} = values

    useEffect(() => {
        isAuth() && Router.push(`/`)
    },[])

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : null)
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : null)
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : null)

    const SignupForm = () => {
        const handleSubmit = (e) => {
            e.preventDefault()
            setValues({...values, loading: true, error: false})
            const user = {name, email, password};
            signup(user)
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error})
                } else {
                    setValues({
                        ...values, 
                        name: '', 
                        email: '', 
                        password: '', 
                        error: '', 
                        loading: false, 
                        message: 'Sign up successfully', 
                        showForm: false
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
                    <input value={name} onChange={handleChange('name')} type="text" className="form-control" placeholder="Type your name" />
                </div>

                <div className="form-group">
                    <input value={email} onChange={handleChange('email')} type="email" className="form-control" placeholder="Type your email" />
                </div>

                <div className="form-group">
                    <input value={password} onChange={handleChange('password')} type="password" className="form-control" placeholder="Type your password" />
                </div>

                <div>
                    <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        )
    }
    
    return (
        <React.Fragment>
            {showLoading()}
            {showError()}
            {showMessage()}
            {showForm && SignupForm()}
        </React.Fragment>
    )
}

export default SignupComponent