import { useEffect } from 'react'
import '../../helpers/jquery'

const Slider = () => {
    useEffect(() => {
        window.jQuery('#slider').flexslider({
            animation: "slide",
            controlNav: false,
            customDirectionNav: window.jQuery('.customNav div')
        });

    }, [])
    return (
        <section id="slider" className="slider-element swiper_wrapper clearfix">
            <ul className="slides">
                <li style={{backgroundImage: `url('static/images/slider/swiper/1.jpg')`}} className="swiper-slide">
                    <img src="" className="img-fluid"/>
                </li>
                <li style={{backgroundImage: `url('static/images/slider/swiper/2.jpg')`}} className="swiper-slide">
                    <img src="" className="img-fluid"/>
                </li>
                <li style={{backgroundImage: `url('static/images/slider/swiper/3.jpg')`}} className="swiper-slide">
                    <img src="" className="img-fluid"/>
                </li>
            </ul>
            <div className="customNav">
                <div className="slider-arrow-left flex-prev"><i className="icon-angle-left"></i></div>
                <div className="slider-arrow-right flex-next"><i className="icon-angle-right"></i></div>
            </div>
        </section>
    )
}

export default Slider