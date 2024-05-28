import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { authContext } from '../Contexts/AuthContext'

export default function Register() {
  let navigate = useNavigate()
  let [errorMessage, setErrorMessage] = useState("")
  let [isLoading, setisLoading] = useState(false)
  // let {isUserLoggedIn} = useContext(authContext)

  async function register() {
    setErrorMessage('')
    setisLoading(true)

    const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formik.values).catch((err) => {
      console.log(err.response.data.message)
      setErrorMessage = (err.response.data.message)
      setisLoading(false)
    })
    // console.log(data)
    if (data.message == "success") {
      navigate('/login')
    }
    setisLoading(false)
  }


  let validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'Min length 3 characters').max(20, 'Max length 20 characters'),
    email: Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter valid email'),
    password: Yup.string().required('Password is required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'must have at least one number, at least one special character and must be greater than 8 characters and max 18 characters'),
    rePassword: Yup.string().required('RePassword is required').oneOf([Yup.ref('password')], 'Password and RePassword must be identical'),
    phone: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/, 'Enter a valid Egypyian phone number')
  })


  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    /// validate ======>     = validate: validate

    onSubmit: register,
    validationSchema
  })

  return <>
    <div className='w-75 m-auto my-5'>
      <h1>Register now:</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" id='name' name='name' className='form-control mb-3' />
        {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : null}

        <label htmlFor="email">Email:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id='email' name='email' className='form-control mb-3' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}

        <label htmlFor="password">Password:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" id='password' name='password' className='form-control mb-3' />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}

        <label htmlFor="rePassword">Re-Password:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" id='rePassword' name='rePassword' className='form-control mb-3' />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : null}

        <label htmlFor="phone">Phone:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" id='phone' name='phone' className='form-control mb-3' />
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : null}

        {errorMessage ? <div className='alert alert-danger'>{errorMessage}</div> : null}

        {isLoading ?
          <button disabled type="button" className='btn bg-main text-white px-3 ms-auto d-block'><i className='fas fa-spin fa-spinner'></i></button>
          :
          <button disabled={!(formik.isValid && formik.dirty)} type="submit" className='btn bg-main text-white px-3 ms-auto d-block'>Register</button>}


      </form>
    </div>
  </>
}


// function validate(values) {
//   let errors = {}

//   if (values.name == "") {
//     errors.name = 'Name is required'
//   } else if (values.name.length < 3) {
//     errors.name = 'Min length 3 characters'
//   } else if (values.name.length > 20) {
//     errors.name = 'Max length 20 characters'
//   }

//   if (values.email == "") {
//     errors.email = 'Email is required'
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Enter valid email'
//   }

//   if (values.password == "") {
//     errors.password = 'Password is required'
//   } else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(values.password)) {
//     errors.password = 'must have at least one number, at least one special character and must be greater than 8 characters and max 18 characters'
//   }

//   if (values.rePassword == "") {
//     errors.rePassword = 'rePassword is required'
//   } else if (values.password != values.rePassword) {
//     errors.rePassword = 'Password and rePassword must be identical'
//   }

//   if (values.phone == "") {
//     errors.phone = 'phone is required'
//   } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
//     errors.phone = 'Enter a valid Egypyian phone number'
//   }

//   return errors

// }