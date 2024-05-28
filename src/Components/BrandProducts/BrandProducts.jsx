import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Product from '../Product/Product'
import useApi from '../../Hooks/useApi'

export default function BrandProducts() {

    let params = useParams()
    let [brandDetails, setBrandDetails] = useState({})
    let [isLoading, setIsLoading] = useState(false)
  
    useEffect(() => {
      getBrandDetails(params.id)
    }, [])
  
    async function getBrandDetails(brandId) {
      setIsLoading(true)
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands/' + brandId)
      setIsLoading(false)
      console.log(data.data)
      setBrandDetails(data.data)
    }
  
    let [product] = useApi('products')


    return <>
    <div>
      {isLoading ? <h1 className='vh-100 d-flex justify-content-center align-items-center'> <i className='fas fa-spinner fa-spin'></i></h1> : null}
      {/* <h2 className='text-main'>{brandDetails.name}</h2> */}
      <div className="row">
        {product.map((product) => {
          if (product.brand._id == params.id) {
            return <Product key={product._id} product={product} />
          }
        })}
      </div>
    </div>
  </>
}
