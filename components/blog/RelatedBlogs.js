import RelatedBlogCard from './RelatedBlogCard'

const RelatedBlogs = ({ blogs }) => {
    const renderBlogs = () => {
        if (blogs.length > 0) {
            let halfwayPoint = Math.ceil(blogs.length / 2)
            let col1 = blogs.slice(0, halfwayPoint)
            let col2 = blogs.slice(halfwayPoint)
            
            return (
                <React.Fragment>
                    <div className="col_half nobottommargin">
                        {
                            col1.map((b, i) => {
                                return <RelatedBlogCard blog={b} key={i} />
                            })
                        }
                    </div>

                    <div className="col_half nobottommargin col_last">
                        {
                            col2.map((b, i) => {
                                return <RelatedBlogCard blog={b} key={i} />
                            })
                        }
                    </div>
                </React.Fragment>
            )
        }
    }
    return (
        <React.Fragment>
            <h4>Related Posts:</h4>
            <div className="related-posts clearfix">
                {renderBlogs()}
            </div>
        </React.Fragment>
    )
}

export default RelatedBlogs