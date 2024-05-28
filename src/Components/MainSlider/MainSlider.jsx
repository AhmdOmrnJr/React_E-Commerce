import React from 'react'
import Slider from "react-slick";
import img1 from "../../Assets/images/slider-image-1.jpeg"
import img2 from "../../Assets/images/slider-image-2.jpeg"
import img3 from "../../Assets/images/slider-image-3.jpeg"
import img4 from "../../Assets/images/grocery-banner.png"
import img5 from "../../Assets/images/grocery-banner-2.jpeg"
export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (

        <div className="container">
            <div className="main-slider mt-5 mb-5">
                <div className='row'>
                    <div className='col-md-9 p-0'>
                        <Slider {...settings}>
                            <img className='w-100' height={400} src={img1} alt="" />
                            <img className='w-100' height={400} src={img2} alt="" />
                            <img className='w-100' height={400} src={img3} alt="" />
                        </Slider>
                    </div>
                    <div className='col-md-3 p-0'>
                        <img className='w-100' height={200} src={img4} alt="" />
                        <img className='w-100' height={200} src={img5} alt="" />
                    </div>
                </div>
            </div>
        </div>

    )
}
