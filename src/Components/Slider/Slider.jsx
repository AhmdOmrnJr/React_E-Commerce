import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const MySlider = () => {
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return <>

   
      <div>
      
        <Slider {...settings}>
        <div>
            <img  src={require('../../images/slider-2.jpeg') } className="w-100" style={{'height':'300px'}}></img>
          </div>
          <div>
            <img  src={require('../../images/slider-image-2.jpeg')} className="w-100" style={{'height':'300px'}}></img>
          </div>
          <div>
            <img  src={require('../../images/slider-image-3.jpeg')} className="w-100" style={{'height':'300px'}}></img>
          </div>
          <div>
            <img src={require('../../images/grocery-banner-2.jpeg')} className="w-100" style={{'height':'300px'}}></img>
          </div>
       
       
          
          
        </Slider>
      </div>
    
  
    </>;
}



export default MySlider;