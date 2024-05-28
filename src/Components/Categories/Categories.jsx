import React, { useState } from 'react'
import useApi from '../../Hooks/useApi'
import { Link, Outlet } from 'react-router-dom';


export default function Categories() {

  let [categories, isLoading] = useApi('categories')

  console.log(categories);



  return <>
    {isLoading ? <h1 className='vh-100 d-flex justify-content-center align-items-center'> <i className='fas fa-spinner fa-spin'></i></h1> : null}
    <div className='row'>
      <div className="col-md-2">
        {categories.map((category) => {
          return <div key={category._id}  >
            <div className="product overflow-hidden p-2 cursor-pointer">
              <Link className='cursor-pointer' to={'categories/' + category._id} >
                {/* <img className='w-100' height={250} src={category.image} alt={category.name} /> */}
                <h5 className='font-sm text-main'>{category.name}</h5>
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


