import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function Address() {

    let {cartId} = useParams()

    async function Order(shippingAddress) {
        let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
            shippingAddress
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        })

        window.location.href = response.data.session.url
    }


    let formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: '',
        },
        onSubmit: Order

    })


    return (

        <form className='w-75 m-auto my-5' onSubmit={formik.handleSubmit}>

            <label htmlFor="details">Details:</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} type="text" id='details' name='details' className='form-control mb-3' />

            <label htmlFor="phone">Phone:</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" id='phone' name='phone' className='form-control mb-3' />

            <label htmlFor="city">City:</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} type="text" id='city' name='city' className='form-control mb-3' />

            <button onClick={Order} type="submit" className='btn bg-main text-white px-3 ms-auto d-block'>Order</button>


        </form>
    )
}
