import axios, { all } from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingScren from '../LoadingScreen/LoadingScren';

const Brands = () => {
    const [allbrands, setallbrands] = useState(null)
    async function getAllBrands(){
    let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    console.log(data.data);
    setallbrands(data.data)
    }
    useEffect(()=>{
 getAllBrands()
    },[])
    return <>
    {allbrands?<div className="container">
        <div className="row align-items-center">
            <div className="col-md-3">
                <div className="title">
                    <h3 className='fw-bold'>Our Brands</h3>
                    <p className='text-center text-info '>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, aliquam.</p>
                </div>
            </div>
            
            {allbrands.map(function (brands,index) {
                return <div key={index} className="col-md-3">
            <Link to={`/brandbroduct/${brands._id}`}>
            <div className="brand">
                  <img src={brands.image} className="w-100" alt={brands.name}></img>
                  <h4 className='text-center text-info pt-3'>{brands.name}</h4>
                  
                </div>
            </Link>
            </div>
               
            })}
        </div>

    </div>:<LoadingScren/>}
    </>;
}



export default Brands;