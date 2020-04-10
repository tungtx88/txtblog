import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'
import NavBar from './NavBar/NavBar'
import {useState, useEffect} from 'react'
import useBodyClass from '../helpers/useBodyClassName'

import '.././node_modules/nprogress/nprogress.css'

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

const Header = () => {
  const [className, setClassName] = useState('')

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      if (bodyHasClass('device-xl') || bodyHasClass('device-lg')) {
        setClassName(' sticky-header')
      } else if (bodyHasClass('device-sm') || bodyHasClass('device-xs') || bodyHasClass('device-md')) {
        setClassName(' responsive-sticky-header')
      }
    } else {
      setClassName('')
    }
    
  }

  const bodyHasClass = className => {
    return document.body.classList.contains(className)
  }

  return (
    <header id="header" className={`full-header${className}`}>
      <div id="header-wrap">
        <div className="container clearfix">
          <div id="primary-menu-trigger"><i className="icon-reorder"></i></div>
          <div id="logo">
            <Link href="/">
              <a className="standard-logo" data-dark-logo="/static/images/logo-dark.png"><img src="/static/images/logo.png" alt="Canvas Logo" /></a>
            </Link>
            <Link href="/">
              <a className="retina-logo" data-dark-logo="/static/images/logo-dark@2x.png"><img src="/static/images/logo@2x.png" alt="Canvas Logo" /></a>
            </Link>
          </div>
          <NavBar />
        </div>
      </div>
    </header>
  );
}

export default Header;