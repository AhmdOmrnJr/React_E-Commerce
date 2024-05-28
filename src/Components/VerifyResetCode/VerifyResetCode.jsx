import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'


export default function VerifyResetCode() {

  let navigate = useNavigate()
  let [errorMessage, setErrorMessage] = useState('')
  let [isLoading, setisLoading] = useState(false)

  async function resetPassword() {
    setErrorMessage('')
    setisLoading(true)

    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', formik.values).catch((err) => {
      setErrorMessage = (err.response.data.message)
      // setisLoading(true)
    })
    console.log(data)
    if (data.status == "Success") {
      setisLoading(false)
      navigate('/resetpassword')
    }
  }


  let validationSchema = Yup.object({
    resetCode: Yup.string().required('Enter code'),
  })


  let formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    onSubmit: resetPassword,
    validationSchema
  })

  return <>
    <div className='w-75 m-auto my-5'>
      <h1>Reset code had been sent to your e-mail</h1>
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="resetCode">Reset code:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.resetCode} type="text" id='resetCode' name='resetCode' className='form-control mb-3' />
        {formik.errors.resetCode && formik.touched.resetCode ? <div className='alert alert-danger'>{formik.errors.resetCode}</div> : null}

        {errorMessage? <div className='alert alert-danger'>{errorMessage}</div> : null}

        {isLoading ? 
        <button disabled type="button" className='btn bg-main text-white px-3 ms-auto d-block'><i className='fas fa-spin fa-spinner'></i></button>
        :
        <button disabled={!(formik.isValid && formik.dirty)} type="submit" className='btn bg-main text-white px-3 ms-auto d-block'>Send code</button>}


      </form>
    </div>
  </>
}
