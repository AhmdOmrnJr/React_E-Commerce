import React, { useEffect, useState } from 'react';
import { createBrowserRouter, createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import notFound from '../src/images/404-error-website-not-found-graphic-design-vector-22271798.jpg'
import Brands from './Components/Brands/Brands';
import BroductDetails from './Components/BroductDetails/BroductDetails';
import BrandBroduct from './Components/BrandBroduct/BrandBroduct';
import Profile from './Components/Profile/Profile';
import jwtDecode from 'jwt-decode';
import Cart from './Components/Cart/Cart';
import CartContext from './Context/CartContext';
import CartContextProvider from './Context/CartContext';
import Paument from './Components/Payment/Paument';
import Allorders from './Components/Allorders/Allorders';


const App = () => {

  const [currentUser, setcurrentUser] = useState(null)
  function clearUserData(){
    localStorage.removeItem('uToken')
    setcurrentUser(null)
     
  }
  function ProtectedRoute({children}){
    if(currentUser==null){
      return <>
      <Navigate to='/login'/>
     </>
    }else{
      return <>
      {children}
     </>
    }
   
  }
  function getUsrData(){

   const usrData= jwtDecode(localStorage.getItem('uToken'))
   setcurrentUser(usrData)
  }
  useEffect(function(){
    if(localStorage.getItem('uToken')!=null && currentUser==null){
      getUsrData()
    }
  },[])
 const router= createHashRouter([
    {
      
   
 
       path:'',element: <Layout currentUser={currentUser} clearUserData={clearUserData} />,children:[
        {
          path:'home',element:<CartContextProvider><Home/></CartContextProvider>
        },
        {
          path:'',element:<CartContextProvider><Home/></CartContextProvider>
        },
        {
          path:"/react-app-e-commerce-",element:
            <ProtectedRoute><Home/></ProtectedRoute>
        },
        {
          path:'login',element:<Login getUsrData={getUsrData}/>
        },
        {
          path:'brands',element:<Brands/>
        },
        {
          path:'payment',element:<ProtectedRoute> <CartContextProvider><Paument/></CartContextProvider></ProtectedRoute>
        },
        {
          path:'allorders',element:<ProtectedRoute><Allorders currentUser={currentUser}/></ProtectedRoute>
        },
        {
          path:'cart',element:<ProtectedRoute> <CartContextProvider><Cart/></CartContextProvider> </ProtectedRoute>
        },
        {
          path:'profile',element:<ProtectedRoute> <Profile currentUser={currentUser}/></ProtectedRoute>
        },
        
        {
          path:'brandbroduct/:id',element:<BrandBroduct/>
        },
        {
          path:'proDetails/:id',element:<ProtectedRoute><CartContextProvider><BroductDetails/></CartContextProvider></ProtectedRoute>
        },
        {
          path:'register',element:<Register/>
        },
        {
            path:'*',element:<div className='d-flex justify-content-center align-items-center'>
             <img src={notFound} alt="notFoundPage"></img>
            </div>
        }
       ]
    }
  ])
  return <>

    <RouterProvider router={router}/>
  </>;
}


export default App;