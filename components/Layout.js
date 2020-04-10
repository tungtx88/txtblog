import Header from './Header'
import Footer from './Footer'
import { useEffect, useState } from 'react'
import useBodyClass from '../helpers/useBodyClassName'
import Fade from '@material-ui/core/Fade';

const Layout = ({ children }) => {
    const [cName, setCName] = useState('')
    const [inProp, setInProp] = useState(false);
    let className = cName
    let _isMounted = false;
    useEffect(() => {
        _isMounted = true
        if (_isMounted) {
            setInProp(true)
            require(['jrespond'], function (jRes) {
                var mediaQueries = jRes([
                    {
                        label: 'smallest',
                        enter: 0,
                        exit: 575
                    }, {
                        label: 'handheld',
                        enter: 576,
                        exit: 767
                    }, {
                        label: 'tablet',
                        enter: 768,
                        exit: 991
                    }, {
                        label: 'laptop',
                        enter: 992,
                        exit: 1199
                    }, {
                        label: 'desktop',
                        enter: 1200,
                        exit: 10000
                    }
                ]);

                mediaQueries.addFunc([{
                    breakpoint: 'desktop',
                    enter: function () { setCName('xl') },
                    exit: function () { setCName('') }
                }, {
                    breakpoint: 'laptop',
                    enter: function () { setCName('lg') },
                    exit: function () { setCName('') }
                }, {
                    breakpoint: 'tablet',
                    enter: function () { setCName('md') },
                    exit: function () { setCName('') }
                }, {
                    breakpoint: 'handheld',
                    enter: function () { setCName('sm') },
                    exit: function () { setCName('') }
                }, {
                    breakpoint: 'smallest',
                    enter: function () { setCName('xs') },
                    exit: function () { setCName('') }
                }]);

            });
        }
    }, [])


    return (
        <React.Fragment>
            {useBodyClass([`device-${className}`])}
            <div id="wrapper" className="clearfix">
                <Header />
                <Fade in={inProp} timeout={1500}>
                    {children}
                </Fade>
                <Footer />
            </div>
        </React.Fragment>
    )
}

export default Layout