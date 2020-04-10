import { useContext } from 'react'
import ThemeContext from '../context/theme/themeContext'

const MainWrap = ({ children }) => {
    const themeContext = useContext(ThemeContext)
    const { body, removeBodyClassName, showSearchForm } = themeContext
    const clickBody = e => {
        e.preventDefault()
        if (body.className.indexOf('top-search-open') !== -1) {
            removeBodyClassName('top-search-open')
            showSearchForm(false)
        }
    }
    return (
        <div onClick={clickBody}>
            { children }
        </div>
    )
}

export default MainWrap