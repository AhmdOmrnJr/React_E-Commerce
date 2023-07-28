import axios from 'axios';
import React ,{useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import LoadingScren from '../LoadingScreen/LoadingScren';
import MySlider from '../Slider/Slider';
import { cartContext } from './../../Context/CartContext';
import $ from 'jquery'
const Home = () => {
    const [allproduct, setAllProduct] = useState(null)
  const {addProductTocard} = useContext(cartContext)
  async function addMyProduct(id,idx) {
    if( await addProductTocard(id,idx)==true){
        $('.alrtMsg').fadeIn(1000,function(){
            setTimeout(() => {
                $('.alrtMsg').fadeOut(1000)
            }, 2000);
        })
        $(`#addBtn${idx}`).fadeOut(500);
        $(`#removeBtn${idx}`).fadeIn(500)
    }
    
  }
   
   async function getAllProduct(params) {
    try{
        const{data}= await axios.get("https://ecommerce.routemisr.com/api/v1/products",{
            params:{'sort':'title'}
        })    
      
           setAllProduct(data.data)
    }catch(err){
     console.log(err);
    }
    }
    useEffect(() => {
    getAllProduct()
    }, [])
    return <>
    {allproduct?<div className="container">
        <MySlider/>
        <div className="alrtMsg alert alert-success text-center position-fixed bottom-0 start-0" style={{'zIndex':'9999' ,'display':'none'}}>product added successfully</div>

        <div className="row">
         
        {allproduct.map(function(pro,idx){
            return < div key={idx} className="col-md-2">
             
                <div className="item bg-primary text-white rounded-3 position-relative">
                <Link to={`/proDetails/${pro.id}`}>
                <div className="upper">
                <img src={pro.imageCover} className="w-100" alt={pro.title}/>
                  <h6 className='text-center fw-bold'>{pro.title.slice(0,pro.title.indexOf(' ',10))}</h6>
                  <h6>{pro.category.name}</h6>
                  <h6>Price:{pro.priceAfterDiscount? <>
                   <span className='text-decoration-line-through'>{pro.price}</span>
                   <span className='ms-3'>{pro.priceAfterDiscount}</span>
                  </>:<span>{pro.price}</span>}</h6>

                  <div className='position-absolute top-0 end-0 bg-info'>{pro.ratingsAverage}</div>
                </div></Link>
                <div className="lower">
                <button id={`addBtn${idx}`} className='btn btn-success' onClick={function(){
                    addMyProduct(pro.id,idx)
                }}>+</button>
                  <button  id={`removeBtn${idx}`} className='btn btn-danger'
                 style={{'display':'none'}}>-</button>


                </div>
                </div>
            </div>})}
        </div>
    </div>: <LoadingScren/>}
   
    
    </>;
}


export default Home;