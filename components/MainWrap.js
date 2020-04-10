import { useContext } from 'react'
import ThemeContext from '../context/theme/themeContext'

const MainWrap = ({ children }) => {
    const themeContext = useContext(ThemeContext)
    const { body, removeBodyClassName, showSearchForm } = themeContext
    return (
        <div >
            { children }
        </div>
    )
}

export default MainWrap