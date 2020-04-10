const Footer = () => {
    return (
        <footer id="footer" className="dark">
            <div className="container">
                <div className="footer-widgets-wrap clearfix">
                    <div className="col_two_third">
                        <div className="col_one_third">
                            <div className="widget clearfix">
                                <img src="../../static/images/footer-widget-logo.png" alt="" className="footer-logo" />
                                <p>We believe in <strong>Simple</strong>, <strong>Creative</strong> &amp; <strong>Flexible</strong> Design Standards.</p>
                                <div style={{ backgroundImage: `url('../../static/images/world-map.png')`, backgroundRepeat: 'no-repeat center center', backgroundSize: '100%' }}>
                                    <address>
                                        <strong>Headquarters:</strong><br />
										795 Folsom Ave, Suite 600<br />
										San Francisco, CA 94107<br />
                                    </address>
                                    <abbr title="Phone Number"><strong>Phone:</strong></abbr> (91) 8547 632521<br />
                                    <abbr title="Fax"><strong>Fax:</strong></abbr> (91) 11 4752 1433<br />
                                    <abbr title="Email Address"><strong>Email:</strong></abbr> info@canvas.com
								</div>
                            </div>
                        </div>

                        <div className="col_one_third">

                            <div className="widget widget_links clearfix">

                                <h4>Blogroll</h4>

                                <ul>
                                    <li><a href="http://codex.wordpress.org/">Documentation</a></li>
                                    <li><a href="http://wordpress.org/support/forum/requests-and-feedback">Feedback</a></li>
                                    <li><a href="http://wordpress.org/extend/plugins/">Plugins</a></li>
                                    <li><a href="http://wordpress.org/support/">Support Forums</a></li>
                                    <li><a href="http://wordpress.org/extend/themes/">Themes</a></li>
                                    <li><a href="http://wordpress.org/news/">WordPress Blog</a></li>
                                    <li><a href="http://planet.wordpress.org/">WordPress Planet</a></li>
                                </ul>

                            </div>

                        </div>

                        <div className="col_one_third col_last">

                            <div className="widget clearfix">
                                <h4>Recent Posts</h4>

                                <div id="post-list-footer">
                                    <div className="spost clearfix">
                                        <div className="entry-c">
                                            <div className="entry-title">
                                                <h4><a href="#">Lorem ipsum dolor sit amet, consectetur</a></h4>
                                            </div>
                                            <ul className="entry-meta">
                                                <li>10th July 2014</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="spost clearfix">
                                        <div className="entry-c">
                                            <div className="entry-title">
                                                <h4><a href="#">Elit Assumenda vel amet dolorum quasi</a></h4>
                                            </div>
                                            <ul className="entry-meta">
                                                <li>10th July 2014</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="spost clearfix">
                                        <div className="entry-c">
                                            <div className="entry-title">
                                                <h4><a href="#">Debitis nihil placeat, illum est nisi</a></h4>
                                            </div>
                                            <ul className="entry-meta">
                                                <li>10th July 2014</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="col_one_third col_last">
                        <div className="widget subscribe-widget clearfix">
                            <h5><strong>Subscribe</strong> to Our Newsletter to get Important News, Amazing Offers &amp; Inside Scoops:</h5>
                            <div className="widget-subscribe-form-result"></div>
                            <form id="widget-subscribe-form" action="include/subscribe.php" method="post" className="nobottommargin">
                                <div className="input-group divcenter">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="icon-email2"></i></div>
                                    </div>
                                    <input type="email" id="widget-subscribe-form-email" name="widget-subscribe-form-email" className="form-control required email" placeholder="Enter your Email" />
                                    <div className="input-group-append">
                                        <button className="btn btn-success" type="submit">Subscribe</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="widget clearfix" style={{ marginBottom: '-20px' }}>

                            <div className="row">

                                <div className="col-lg-6 clearfix bottommargin-sm">
                                    <a href="#" className="social-icon si-dark si-colored si-facebook nobottommargin" style={{ marginRight: '10px' }}>
                                        <i className="icon-facebook"></i>
                                        <i className="icon-facebook"></i>
                                    </a>
                                    <a href="#"><small style={{ display: 'block', marginTop: '3px' }}><strong>Like us</strong><br />on Facebook</small></a>
                                </div>
                                <div className="col-lg-6 clearfix">
                                    <a href="#" className="social-icon si-dark si-colored si-rss nobottommargin" style={{ marginRight: '10px' }}>
                                        <i className="icon-rss"></i>
                                        <i className="icon-rss"></i>
                                    </a>
                                    <a href="#"><small style={{ display: 'block', marginTop: '3px' }}><strong>Subscribe</strong><br />to RSS Feeds</small></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="copyrights">
                <div className="container clearfix">
                    <div className="col_half">
                        Copyrights &copy; 2014 All Rights Reserved by Canvas Inc.<br />
                        <div className="copyright-links"><a href="#">Terms of Use</a> / <a href="#">Privacy Policy</a></div>
                    </div>
                    <div className="col_half col_last tright">
                        <div className="fright clearfix">
                            <a href="#" className="social-icon si-small si-borderless si-facebook">
                                <i className="icon-facebook"></i>
                                <i className="icon-facebook"></i>
                            </a>

                            <a href="#" className="social-icon si-small si-borderless si-twitter">
                                <i className="icon-twitter"></i>
                                <i className="icon-twitter"></i>
                            </a>

                            <a href="#" className="social-icon si-small si-borderless si-gplus">
                                <i className="icon-gplus"></i>
                                <i className="icon-gplus"></i>
                            </a>

                            <a href="#" className="social-icon si-small si-borderless si-pinterest">
                                <i className="icon-pinterest"></i>
                                <i className="icon-pinterest"></i>
                            </a>

                            <a href="#" className="social-icon si-small si-borderless si-vimeo">
                                <i className="icon-vimeo"></i>
                                <i className="icon-vimeo"></i>
                            </a>

                            <a href="#" className="social-icon si-small si-borderless si-github">
                                <i className="icon-github"></i>
                                <i className="icon-github"></i>
                            </a>

                            <a href="#" className="social-icon si-small si-borderless si-yahoo">
                                <i className="icon-yahoo"></i>
                                <i className="icon-yahoo"></i>
                            </a>

                            <a href="#" className="social-icon si-small si-borderless si-linkedin">
                                <i className="icon-linkedin"></i>
                                <i className="icon-linkedin"></i>
                            </a>
                        </div>
                        <div className="clear"></div>
                        <i className="icon-envelope2"></i> info@canvas.com <span className="middot">&middot;</span> <i className="icon-headphones"></i> +91-11-6541-6369 <span className="middot">&middot;</span> <i className="icon-skype2"></i> CanvasOnSkype
					</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
