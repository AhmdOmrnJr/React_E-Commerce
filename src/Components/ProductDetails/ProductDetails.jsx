import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'
import Slider from "react-slick";

export default function ProductDetails() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    let params = useParams()
    let [productDetails, setProductDetails] = useState({})
    let [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getProductDetails(params.id)
    }, [])

    async function getProductDetails(productId) {
        setIsLoading(true)
        let res = await axios.get('https://ecommerce.routemisr.com/api/v1/products/' + productId)
        setIsLoading(false)
        console.log(res)
        // setProductDetails(data.data)
    }

    return <>
<Helmet>
  <title>{productDetails?.title}</title>
</Helmet>


        {isLoading ?


            <div className='d-flex justify-content-center align-items-center my-5 py-5'>
                <i className='fas fa-spin fa-spinner fa-2x'></i>
            </div>


            : <>

            <div className='row  align-items-center py-5'>
                <div className='col-md-3'>
                    `                    <Slider {...settings}>
                        {productDetails.images?.map((img, index) => {
                            return <img key={index} src={img} />
                        })}
                    </Slider>                   `
                </div>
                <div className='col-md-9'>
                    <h2 className='mt-2'>{productDetails?.title}</h2>
                    <h5 className='font-sm text-main mt-2'>{productDetails?.category?.name}</h5>
                    <p className='mt-2'>{productDetails?.description}</p>
                    <p className='d-flex justify-content-between'>
                        <span>{productDetails?.price} EGP</span>
                        <span>
                            <i className='fas fa-star rating-color me-1'></i>
                            {productDetails?.ratingsAverage}
                        </span>
                    </p>
                    <button className='btn bg-main w-100 text-white'>Add to cart</button>
                </div>
            </div>
            </>
        }
    </>

}
