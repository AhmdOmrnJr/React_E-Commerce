import React from 'react'
import NotFoundImg from '../../Assets/images/error.svg'
export default function NotFound() {
  return (
    <div >
        <img className='w-500 d-block m-auto py-5 ' src={NotFoundImg} alt="Not_found_image" />
    </div>
  )
}
