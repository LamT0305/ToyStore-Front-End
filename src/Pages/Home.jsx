import React from 'react';
import "../layouts/home.css"
const HomePage = () => {
    return (
        <>
            <div className="fashion_section">
                <div id="main_slider" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="container">
                                <h1 className="fashion_taital">Man & Woman Fashion</h1>
                                <div className="fashion_section_2">
                                    <div className="row">
                                        <div className="col-lg-4 col-sm-4">
                                            <div className="box_main">
                                                <h4 className="shirt_text">Man T-shirt</h4>
                                                <p className="price_text">
                                                    Price <span style={{ color: '#262626' }}>$30</span>
                                                </p>
                                                <div className="tshirt_img">
                                                    <img src={'./images/tshirt-img.png'} alt="Man T-shirt" />
                                                </div>
                                                <div className="btn_main">
                                                    <div className="buy_bt">
                                                        <a href="#">Buy Now</a>
                                                    </div>
                                                    <div className="seemore_bt">
                                                        <a href="#">See More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Repeat the code for other product items */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Repeat the code for other carousel items */}
                    </div>
                    <a className="carousel-control-prev" href="#main_slider" role="button" data-slide="prev">
                        <i className="fa fa-angle-left"></i>
                    </a>
                    <a className="carousel-control-next" href="#main_slider" role="button" data-slide="next">
                        <i className="fa fa-angle-right"></i>
                    </a>
                </div>
            </div>
            
        </>
    );
};

export default HomePage;
