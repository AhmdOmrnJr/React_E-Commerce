import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function ForgotPasswords() {

  let navigate = useNavigate()
  let [errorMessage, setErrorMessage] = useState('')
  let [isLoading, setisLoading] = useState(false)

  async function sendCode() {
    setErrorMessage('')
    setisLoading(true)

    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', formik.values).catch((err) => {
      setErrorMessage = (err.response.data.message)
      // setisLoading(true)
    })
    console.log(data)
    if (data.statusMsg == "success") {
      setisLoading(false)
      navigate('/verifyresetcode')
    }
  }


  let validationSchema = Yup.object({
    email: Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter valid email'),
  })


  let formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: sendCode,
    validationSchema
  })

  return <>
    <div className='w-75 m-auto my-5'>
      <h1>Login now:</h1>
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="email">Email:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id='email' name='email' className='form-control mb-3' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}

        {errorMessage? <div className='alert alert-danger'>{errorMessage}</div> : null}

        {isLoading ? 
        <button disabled type="button" className='btn bg-main text-white px-3 ms-auto d-block'><i className='fas fa-spin fa-spinner'></i></button>
        :
        <button disabled={!(formik.isValid && formik.dirty)} type="submit" className='btn bg-main text-white px-3 ms-auto d-block'>Send code</button>}


      </form>
    </div>
  </>
}
