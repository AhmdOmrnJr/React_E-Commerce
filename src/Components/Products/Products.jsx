import React from 'react'
import useApi from '../../Hooks/useApi'
import Product from '../Product/Product'

export default function Products() {

  let [products, isLoading] = useApi('products')

  return <>
    {isLoading ? <h1 className='vh-100 d-flex justify-content-center align-items-center'> <i className='fas fa-spinner fa-spin'></i></h1> : null}
    <div className='row'>
      {products.map((product) => {
        return <Product key={product._id} product={product} />
      })}
    </div>
  </>
}
