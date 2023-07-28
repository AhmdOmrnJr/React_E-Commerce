import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import $ from 'jquery'
import { useNavigate } from 'react-router-dom';

const Login = ({getUsrData}) => {
    let user={
       
        email:'',
       
        password:'',
   
     }
     const navigate=useNavigate()
    async function loginUser(obj){
      
       try{
        let{data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',obj)
        if(data.message=="success"){
           localStorage.setItem('uToken',data.token)
           getUsrData()
            navigate('/home')
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
            loginUser(values)
          
        },
        validate:function (values) {
           let errors={}
       
       if( ! values.email.includes('@') || ! values.email.includes(".com")){
        errors.email="Email must be valid"
       }
      
       if(values.password.length<6||values.password.length>12){
        errors.password="Password must be from 6 to 12 char"
       }
       
           
            return errors
        }
     });
    return <>
    <div className="container py-5">
        <h2>Login Form</h2>
        <div style={{'display':'none'}} className=" errmsg alert alert-danger text-center">Email or Password uncoorect</div>
        <form onSubmit={myFormik.handleSubmit}>
            
            <label  className='mt-3' htmlFor='email'>Email</label>
            
            <input type='email' id="email"  onBlur={myFormik.handleBlur} placeholder='email' value={myFormik.values.email} onChange={myFormik.handleChange} className='form-control'></input>
            {myFormik.errors.email &&myFormik.touched.email? <div className="alert alert-danger text-center">{myFormik.errors.email}</div>:""}

            
            <label className='mt-3' htmlFor='password'>Password</label>
            <input type='password' id="password" onBlur={myFormik.handleBlur} placeholder='password'value={myFormik.values.password} onChange={myFormik.handleChange}  className='form-control'></input>
            {myFormik.errors.password && myFormik.touched.password? <div className="alert alert-danger text-center">{myFormik.errors.password}</div>:""}

            
            <button type='submit' className='btn btn-outline-primary mt-3'>Login</button>
        </form>
    </div>
    </>;
}


export default Login;