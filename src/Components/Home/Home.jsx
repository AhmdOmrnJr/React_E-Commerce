import React, { useEffect, useState } from 'react'
import "./Home.module.css"
import axios from 'axios'
import Product from '../Product/Product'
import MainSlider from '../MainSlider/MainSlider'
import CategotySlider from '../CategorySlider/CategotySlider'
import { useQuery } from 'react-query'
import { Helmet } from 'react-helmet'

export default function Home() {

  // const [products, setProducts] = useState([])

  // useEffect(() => {
  //   getAllProducts()
  // }, [])


  // async function getAllProducts() {
  //   const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  //   console.log(data.data)
  //   setProducts(data.data)
  // }

  function getAllProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  let { data, isFetching, isLoading } = useQuery("products", getAllProducts, {
    // cacheTime: 5000,
  })

  console.log(data?.data.data);

  return <>

<Helmet>
  <title>Home</title>
</Helmet>

    {/* <div>
      <MainSlider />
      <CategotySlider />
      <div className="row">
        {data?.data.data.map((product) => {
          return <Product key={product._id} product={product} />
        })}
      </div>
    </div> */}

    {!isLoading
      ?
      <div>
        <MainSlider />
        <CategotySlider />
        <div className="row">
          {data?.data.data.map((product) => {
            return <Product key={product._id} product={product} />
          })}
        </div>
      </div>
      : 
      <>
      <div className="text-center">
        <i className='fas fa-spinner fa-spin fa-2x py-5 my-5'></i>
      </div>
      </>
    }
  </>

}