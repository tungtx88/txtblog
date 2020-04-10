import Card from './Card'
import CardImageLeft from './CardImageLeft'

const BlogList = ({ blogs, cardType }) => {
    const showAllBlogs = () => {
        return blogs.map((b, i) => {
            return (
                <article key={i}>
                    {cardType === 'left' && (<CardImageLeft blog={b} />)}
                    {cardType !== 'left' && (<Card blog={b} />)}
                </article>
            )
        })
    }
    return (
        <React.Fragment>
            {showAllBlogs()}
        </React.Fragment>
    )
}

export default BlogList