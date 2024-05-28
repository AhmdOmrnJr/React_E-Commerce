import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

export default function CategotySlider() {

    let [category, setCategory] = useState([])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 5,
    };

    useEffect(() => {
        getAllCategories()
    }, [])

    async function getAllCategories() {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
        console.log(data.data)
        setCategory(data.data)
    }

    return (
        <div className="mb-5">
            <Slider {...settings}>
                {category.map((category, id) => {

                    return <div key={category._id}>
                        <img className='w-100' height={150} src={category.image} alt={category.name} />
                        <h5 className='font-sm text-main'>{category.name}</h5>
                    </div>
                })}
            </Slider>
        </div>
    )
}
