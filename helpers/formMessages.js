export const showFormSubmitError = (error) => {
    return <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>{error}</div>
    
}

export const showFormSubmitSuccess = (success) => {
    return <div className="alert alert-success" style={{display: success ? '' : 'none'}}>{success}</div>
}