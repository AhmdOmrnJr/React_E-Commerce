import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingScren from '../LoadingScreen/LoadingScren';
import { Link, useParams } from 'react-router-dom';


const BrandBroduct = () => {
    const [allProduct, setallProduct] = useState(null)
    const{id}=useParams()
    async function getBrandBroduct(){
  try {
    const{data}= await axios.get('https://ecommerce.routemisr.com/api/v1/products',{
        params:{'brand':id}
    })
    setallProduct(data.data)
  } catch (error) {
    console.log("Eroor:"+error);
    
  }
    }
    useEffect(() => {
      getBrandBroduct()
    }, [])
    return <>
    {allProduct? <div className="container">
        <div className="row">
          {allProduct.length==0?<h2 className='text-center text-warning fw-bold p-5'>No Product Avaialablr Right Now</h2>:allProduct.map(function(pro,idx){
                return   <div key={idx} className="col-md-3">
                 <Link to={`/proDetails/${pro.id}`}>
                <div className="item bg-primary text-white rounded-3 position-relative">
                  <img src={pro.imageCover} className="w-100" alt={pro.title}/>
                  <h6 className='text-center fw-bold'>{pro.title.slice(0,pro.title.indexOf(' ',10))}</h6>
                  <h6>{pro.category.name}</h6>
                  <h6>Price:{pro.priceAfterDiscount? <>
                   <span className='text-decoration-line-through'>{pro.price}</span>
                   <span className='ms-3'>{pro.priceAfterDiscount}</span>
                  </>:<span>{pro.price}</span>}</h6>

                  <div className='position-absolute top-0 end-0 bg-info'>{pro.ratingsAverage}</div>
                </div></Link>
            </div>
            })}
            
        </div>
    </div>:<LoadingScren/>}
   
    </>;
}



export default BrandBroduct;