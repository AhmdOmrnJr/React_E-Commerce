import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import $ from 'jquery'
import { useNavigate } from 'react-router-dom';
import Login from './../Login/Login';
const Register = () => {
    let user={
        name:'',
        email:'',
        phone:'',
        password:'',
        rePassword:''   
     }
     const navigate=useNavigate()
    async function registerNewUser(obj){
      
       try{
        let{data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',obj)
        if(data.message=="success"){
            navigate('/login')
        }
       }catch(err){
        console.log(err.response.data.message);
        $('.errmsg').fadeIn(500,function(){
            setTimeout(() => {
                $('.errmsg') .fadeOut(2000)    
            }, 3000);
        })
       
       }
     }
     let myFormik=useFormik({
        initialValues:user,
        onSubmit:function(values){
            registerNewUser(values)
          
        },
        validate:function (values) {
           let errors={}
       if(values.name.length<3 || values.name.length>10){
        errors.name="Name must be more 3 char and less than 10"
       }
       if( ! values.email.includes('@') || ! values.email.includes(".com")){
        errors.email="Email must be valid"
       }
       if( !values.phone.match(/^01[0125][0-9]{8}$/)){
           errors.phone="Pohne must be egypthion numbr"
       }
       if(values.password.length<6||values.password.length>12){
        errors.password="Password must be from 6 to 12 char"
       }
       if(values.rePassword !== values.password){
        errors.rePassword="passord and repassword not match"
       }
           
            return errors
        }
     });
    return <>
    <div className="container py-5">
        <h2>Registration Form</h2>
        <div style={{'display':'none'}} className=" errmsg alert alert-danger text-center">Account Already Exists</div>
        <form onSubmit={myFormik.handleSubmit}>
            <label className='mt-3' htmlFor='name'>Name</label>
            <input type='text' id="name" onBlur={myFormik.handleBlur} placeholder='name' value={myFormik.values.name} onChange={myFormik.handleChange} className='form-control'></input>
            {myFormik.errors.name && myFormik.touched.name? <div className="alert alert-danger text-center">{myFormik.errors.name}</div>:""}

            <label  className='mt-3' htmlFor='email'>Email</label>
            
            <input type='email' id="email"  onBlur={myFormik.handleBlur} placeholder='email' value={myFormik.values.email} onChange={myFormik.handleChange} className='form-control'></input>
            {myFormik.errors.email &&myFormik.touched.email? <div className="alert alert-danger text-center">{myFormik.errors.email}</div>:""}

            <label className='mt-3' htmlFor='phone'>Phone</label>
            <input type='text' id="phone" onBlur={myFormik.handleBlur} placeholder='phone' value={myFormik.values.phone} onChange={myFormik.handleChange} className='form-control'></input>
            {myFormik.errors.phone && myFormik.touched.phone? <div className="alert alert-danger text-center">{myFormik.errors.phone}</div>:""}

            <label className='mt-3' htmlFor='password'>Password</label>
            <input type='password' id="password" onBlur={myFormik.handleBlur} placeholder='password'value={myFormik.values.password} onChange={myFormik.handleChange}  className='form-control'></input>
            {myFormik.errors.password && myFormik.touched.password? <div className="alert alert-danger text-center">{myFormik.errors.password}</div>:""}

            <label className='mt-3' htmlFor='rePassword'>Repassword</label>
            <input type='password' id="rePassword" onBlur={myFormik.handleBlur} placeholder='rePassword' value={myFormik.values.rePassword} onChange={myFormik.handleChange} className='form-control'></input>
            {myFormik.errors.rePassword && myFormik.touched.rePassword? <div className="alert alert-danger text-center">{myFormik.errors.rePassword}</div>:""}

            <button type='submit' className='btn btn-outline-primary mt-3'>Register</button>
        </form>
    </div>
    </>;
}


export default Register;