import Link from 'next/link'
import Router from 'next/router'
import {withRouter} from 'next/router'
import { useState, useEffect, useContext } from 'react'
import { isAuth, signout } from '../../actions/auth'
import { APP_NAME } from '../../config'
import "../../helpers/superfish"
import "../../node_modules/superfish/src/css/superfish.css"
import "../../node_modules/superfish/src/css/superfish-navbar.css"
import ThemeContext from '../../context/theme/themeContext'
import useBodyClassName from '../../helpers/useBodyClassName'

const NavBar = ({router}) => {
    const themeContext = useContext(ThemeContext)
    const { body, search, addBodyClassName, removeBodyClassName, showSearchForm } = themeContext
    const [loggedIn, setLoggedIn] = useState({})
    const [searchVisible, setSearchVisible] = useState(search.show)
    const [searchText, setSearchText] = useState("")
    const [currentPage, setCurrentPage] = ("/")

    useEffect(() => {
        if (isAuth()) {
            setLoggedIn(isAuth())
        } else {
            setLoggedIn({})
        }
        setSearchVisible(search.show)
    
        window.jQuery('#primary-menu').superfish({
            pathClass: 'current',
        })
        window.jQuery('#primary-menu-trigger,#overlay-menu-close').off('click').on('click', function () {
            if (window.jQuery('#primary-menu').find('ul.mobile-primary-menu').length > 0) {
                window.jQuery('#primary-menu > ul.mobile-primary-menu, #primary-menu > div > ul.mobile-primary-menu').toggleClass('d-block');
            } else {
                window.jQuery('#primary-menu > ul, #primary-menu > div > ul').toggleClass('d-block');
            }
            window.jQuery('body').toggleClass("primary-menu-open");
            return false;
        });
        return function cleanup() {
            window.jQuery('#primary-menu').superfish('destroy')
        }
    }, [search.show])

    const signOutHandler = () => {
        setLoggedIn({})
        return signout(() => Router.replace('/signin'))
    }

    const renderNavUserLinks = () => {
        if (typeof loggedIn.role === 'undefined') {
            return (
                <React.Fragment>
                    <li className={router.pathname === '/signin' ? 'current' : ''}>
                        <Link href="/signin">
                            <a><div>Sign In</div></a>
                        </Link>
                    </li>
                    {/* <li className={router.pathname === '/signup' ? 'current' : ''}>
                        <Link href="/signup">
                            <a><div>Sign Up</div></a>
                        </Link>
                    </li> */}
                </React.Fragment>

            )
        } else {
            let userPath = '/user'
            if (loggedIn.role === 1) {
                userPath = '/admin'
            }
            return (
                <React.Fragment>
                    <li className={router.pathname === '/admin' ? 'current' : ''}>
                        <Link href={`${userPath}`}>
                            <a><div>Dashboard</div></a>
                        </Link>
                    </li>
                    <li onClick={() => signOutHandler()}>
                        <a style={{cursor: 'pointer'}}><div>Sign Out</div></a>
                    </li>
                </React.Fragment>

            )
        }
    }
    const setBodyClass = e => {
        e.preventDefault()
        if (!searchVisible) {
            addBodyClassName('top-search-open')
            showSearchForm(true)
            setSearchVisible(true)
        } else {
            removeBodyClassName('top-search-open')
            showSearchForm(false)
            setSearchVisible(false)
        }
    }
    const searchSubmit = e => {
        e.preventDefault()
        if (searchText.length > 0) {
            Router.replace(`/blogs/search?search=${searchText}`)
        }
    }

    const searchChangeHandler = e => {
        setSearchText(e.target.value)
    }

    return (
        <div>
            <nav id="primary-menu">
                {useBodyClassName(body.className)}
                <ul>
                    <li className={router.pathname === '/' ? 'current' : ''}>
                        <Link href="/">
                            <a><div>Home</div></a>
                        </Link>
                    </li>
                    <li className={router.pathname === '/blogs' ? 'current' : ''}>
                        <Link href="/blogs">
                            <a><div>Blogs</div></a>
                        </Link>
                    </li>
                    {renderNavUserLinks()}
                </ul>
                <div id="top-search">
                    <Link href="">
                        <a id="top-search-trigger" onClick={setBodyClass}><i className="icon-search3"></i><i className="icon-line-cross"></i></a>
                    </Link>
                    <form onSubmit={searchSubmit}>
                        <input type="text" className="form-control" value={searchText} onChange={searchChangeHandler} placeholder="Type &amp; Hit Enter.." />
                    </form>
                </div>
            </nav>
        </div>
    )
}

export default withRouter(NavBar)