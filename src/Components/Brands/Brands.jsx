import React from 'react'
import useApi from '../../Hooks/useApi'
import { Link, Outlet } from 'react-router-dom';

export default function Brands() {


  let [brands, isLoading] = useApi('brands')

  console.log(brands);



  return <>
    {isLoading ? <h1 className='vh-100 d-flex justify-content-center align-items-center'> <i className='fas fa-spinner fa-spin'></i></h1> : null}
    <div className='row vh-100'>
      <div className='h-75 col-md-2 overflow-y-scroll'>
        {brands.map((brand) => {
          return <div key={brand._id} >
            <div className="product overflow-hidden p-2 cursor-pointer ">
              <Link className='cursor-pointer' to={'brands/' + brand._id} >
                {/* <img className='w-100'  src={brand.image} alt={brand.name} /> */}
                <h5 className='font-sm text-main'>{brand.name}</h5>
              </Link>
            </div>
          </div>
        })}
      </div>
      <div className="col-md-10 ps-3 py-3">
        <Outlet />
      </div>
    </div>
  </>
}