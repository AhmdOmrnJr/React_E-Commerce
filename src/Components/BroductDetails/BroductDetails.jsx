import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingScren from '../LoadingScreen/LoadingScren';
import { cartContext } from './../../Context/CartContext';
import $ from 'jquery';

const BroductDetails = () => {
  const {addProductTocard,removeCartItem} = useContext(cartContext)
   async function addMyProduct()
 {
    if( await addProductTocard(productDetail.id)){
     $('.succMsg').fadeIn(1000,function(){
        setTimeout(() => {
            $('.succMsg').fadeOut(1000)      
        }, 2000);
     })
     $('.dltBtn').fadeIn(500)
      
            $('.addBtn').fadeOut(500)      
       
    


    }

    
 } 
 async function removeMyProduct(id) {
 if( await removeCartItem(id)==true){
 $('.removeMsg').fadeIn(1000,function(){
    setTimeout(() => {
        $('.removeMsg').fadeOut(1000)
    }, 2000);
 })
 $('.addBtn').fadeIn(500) 
 $('.dltBtn').fadeOut(500)
 }
  
 }
 const {id}=  useParams()
  console.log(id);
    const [productDetail, setproductDetail] = useState(null)
    async function getProductDetails() {
        try {
            const{data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            console.log(data.data);
            setproductDetail(data.data)
            
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
    getProductDetails()
    }, [])
    return <>
    <h2>Product Details</h2>
  {productDetail? <div className="container">
        <div className="row">
            <div className="col-md-3">
             <img src={productDetail.imageCover} alt={productDetail.title} className="w-100"></img>
            </div> 
            <div className="col-md-9">
                 <h2>{productDetail.title}</h2>
                 <p>{productDetail.description}</p>
                 <h5>Price:{productDetail.price}</h5>
                 <h5>Quantity:{productDetail.quantity}</h5>
                 <button className=' addBtn btn btn-success w-100 mt-3' onClick={addMyProduct}>Add Broduct To Cart</button>
                 <button  onClick={function () {
                    removeMyProduct(productDetail.id)
                 }} style={{'display':'none'}} className=' dltBtn btn btn-danger w-100 mt-3' >Remove from Cart -</button>

                 <div style={{'display':'none'}} className=" succMsg alert text-center alert-success  mt-3">Product added successfully to your cart</div>
                 <div style={{'display':'none'}} className=" removeMsg alert text-center alert-success  mt-3">Product removed successfully from your cart</div>


            </div>

        </div>
    </div>:<LoadingScren/>}
   
    </>;
}



export default BroductDetails;