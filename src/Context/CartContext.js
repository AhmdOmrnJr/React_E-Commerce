import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from'jquery'

export const cartContext=createContext(0)

const CartContextProvider = ({children}) => {
   const navigate=useNavigate()

    const [numOfCartItems, setnumOfCartItems] = useState(0)
    const [totalCartPrice, settotalCartPrice] = useState(0)
    const [cartProduct, setcartProduct] = useState([])
    const [cartId, setcartId] = useState(null)
    async function addProductTocard(proId){
   try{
    
        const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
           "productId":proId
        },{
           headers:{'token':localStorage.getItem('uToken')}
        })
        if(data.status=="success"){
            return true
        }else{
            return false
        }
   
   }catch(err){
            console.log("Error",err);
   }
}
async function getCardProduct(){
    try{
    
        const {data}=await axios.get('https://route-ecommerce.onrender.com/api/v1/cart',
           
        {
           headers:{'token':localStorage.getItem('uToken')}
        })
      
        if(data.status=="success"){

            setnumOfCartItems(data.numOfCartItems)
            settotalCartPrice(data.data.totalCartPrice)
            setcartProduct(data.data.products)
            setcartId(data.data._id)
            return data;
        }
   
   }catch(err){
            console.log("Error",err);
   }

}
async function removeCartItem(id){
    try {
        const {data}=await axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,{
            headers:{'token':localStorage.getItem('uToken')}
        })
        
        if(data.status=="success"){
            setnumOfCartItems(data.numOfCartItems)
            settotalCartPrice(data.data.totalCartPrice)
            setcartProduct( data.data.products)
           
           
             return true

        }
        
    } catch (error) {
        console.log(error);
    }
}
async function updateCartItem(id,count){
    try {
        const {data}=await axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,{
            "count": count
        }, {           headers:{'token':localStorage.getItem('uToken')}
     } )
        console.log(data);
        if(data.status=="success"){
            setnumOfCartItems(data.numOfCartItems)
            settotalCartPrice(data.data.totalCartPrice)
            setcartProduct( data.data.products)
             return true

        }
       
        
    } catch (error) {
       if(error.response.status==404){
        $('.errCart').fadeIn(500,function () {
            setTimeout(() => {
               navigate('/home') 
            }, 2000);
        })
       }
    }
}
useEffect(function () {
    getCardProduct()
},[])
    return <cartContext.Provider value={{ addProductTocard,numOfCartItems,cartProduct,totalCartPrice,removeCartItem,updateCartItem,cartId}}>
        <div className=' d-none alert alert-danger errCart'>
            No cart exist
        </div>
    {children}
    </cartContext.Provider>;
}



export default CartContextProvider;