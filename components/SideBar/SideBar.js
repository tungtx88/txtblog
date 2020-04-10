const SideBar = () => {
    return (
        <div className="sidebar nobottommargin col_last clearfix">
            <div className="sidebar-widgets-wrap">
                <div className="widget clearfix">
                    <h4>Recent Blogs</h4>
                    <div className="tabs nobottommargin clearfix" id="sidebar-tabs">
                        <div className="tab-container">
                            <div className="tab-content clearfix" id="tabs-1">

                                <div id="popular-post-list-sidebar">

                                    <div className="spost clearfix">
                                        <div className="entry-image">
                                            <a href="#" className="nobg"><img className="rounded-circle" src="static/images/magazine/small/3.jpg" alt="" /></a>
                                        </div>
                                        <div className="entry-c">
                                            <div className="entry-title">
                                                <h4><a href="#">Debitis nihil placeat, illum est nisi</a></h4>
                                            </div>
                                            <ul className="entry-meta">
                                                <li><i className="icon-comments-alt"></i> 35 Comments</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="spost clearfix">
                                        <div className="entry-image">
                                            <a href="#" className="nobg"><img className="rounded-circle" src="static/images/magazine/small/2.jpg" alt="" /></a>
                                        </div>
                                        <div className="entry-c">
                                            <div className="entry-title">
                                                <h4><a href="#">Elit Assumenda vel amet dolorum quasi</a></h4>
                                            </div>
                                            <ul className="entry-meta">
                                                <li><i className="icon-comments-alt"></i> 24 Comments</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="spost clearfix">
                                        <div className="entry-image">
                                            <a href="#" className="nobg"><img className="rounded-circle" src="static/images/magazine/small/1.jpg" alt="" /></a>
                                        </div>
                                        <div className="entry-c">
                                            <div className="entry-title">
                                                <h4><a href="#">Lorem ipsum dolor sit amet, consectetur</a></h4>
                                            </div>
                                            <ul className="entry-meta">
                                                <li><i className="icon-comments-alt"></i> 19 Comments</li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="widget clearfix">

                    <h4>Tag Cloud</h4>
                    <div className="tagcloud">
                        <a href="#">general</a>
                        <a href="#">videos</a>
                        <a href="#">music</a>
                        <a href="#">media</a>
                        <a href="#">photography</a>
                        <a href="#">parallax</a>
                        <a href="#">ecommerce</a>
                        <a href="#">terms</a>
                        <a href="#">coupons</a>
                        <a href="#">modern</a>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default SideBar