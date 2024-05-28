import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { authContext } from '../Contexts/AuthContext'

export default function Login() {
  let navigate = useNavigate()
  let [errorMessage, setErrorMessage] = useState('')
  let [isLoading, setisLoading] = useState(false)
  let {setIsUserLoggedIn} = useContext(authContext)

  async function login() {
    setErrorMessage('')
    setisLoading(true)

    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formik.values).catch((err) => {
      setErrorMessage = (err.response.data.message)
      // setisLoading(true)
    })
    console.log(data)
    if (data.message == "success") {
      setisLoading(false)
      localStorage.setItem("token", data.token)
      setIsUserLoggedIn(true)
      navigate('/home')
    }
  }


  let validationSchema = Yup.object({
    email: Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter valid email'),
    password: Yup.string().required('Password is required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'must have at least one number, at least one special character and must be greater than 8 characters and max 18 characters'),

  })


  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    /// validate ======>     = validate: validate
    onSubmit: login,
    validationSchema
  })

  return <>
    <div className='w-75 m-auto my-5'>
      <h1>Login now:</h1>
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="email">Email:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id='email' name='email' className='form-control mb-3' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}

        <label htmlFor="password">Password:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" id='password' name='password' className='form-control mb-3' />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}

        {errorMessage? <div className='alert alert-danger'>{errorMessage}</div> : null}

        {isLoading ? 
        <button disabled type="button" className='btn bg-main text-white px-3 ms-auto d-block'><i className='fas fa-spin fa-spinner'></i></button>
        :
        <button disabled={!(formik.isValid && formik.dirty)} type="submit" className='btn bg-main text-white px-3 ms-auto d-block'>login</button>}

      <Link className='text-main' to={'/forgotpassword'}>Forgot Password ...</Link>
      <br />
      <Link className='text-main' to={'/register'}>Register now ...</Link>

      </form>
    </div>
  </>
}
