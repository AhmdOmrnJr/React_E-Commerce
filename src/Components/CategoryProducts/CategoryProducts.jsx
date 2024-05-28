import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import useApi from '../../Hooks/useApi'
import Product from '../Product/Product'

export default function CategoryProducts() {

  let params = useParams()
  let [categoryDetails, setCategoryDetails] = useState({})
  let [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getCategoryDetails(params.id)
  }, [])

  async function getCategoryDetails(categoryId) {
    setIsLoading(true)
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories/' + categoryId)
    setIsLoading(false)
    console.log(data.data)
    setCategoryDetails(data.data)
  }

  let [product] = useApi('products')




  return <>
    <div>
      {isLoading ? <h1 className='vh-100 d-flex justify-content-center align-items-center'> <i className='fas fa-spinner fa-spin'></i></h1> : null}
        {/* <h2 className='text-main'>{categoryDetails.name}</h2> */}
      <div className="row">
        {product.map((product) => {
          if (product.category._id == params.id) {
            return <Product key={product._id} product={product} />
          }
        })}
      </div>
    </div>
  </>
}


