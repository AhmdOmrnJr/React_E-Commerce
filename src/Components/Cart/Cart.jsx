import React, { useContext } from 'react';
import LoadingScren from '../LoadingScreen/LoadingScren';
import { cartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const{cartProduct,totalCartPrice,removeCartItem,updateCartItem} = useContext(cartContext)
   
    return <>
      {cartProduct ?<div className="container">
        <h2>welcome user</h2>
        <div className='d-flex justify-content-between'>
        <h3>Total Price:<span className='text-primary'>{totalCartPrice}</span></h3>
        <Link to='/payment'>
        <button className='btn btn-primary'>Confirm</button>
</Link>
        </div>

        <div className="row">
            
               
                {cartProduct.map(function (pro,idx) {
                    return  <div key={idx} className="col-md-3">
                        <div  className="product bg-info">
                    <img src={pro.product.imageCover} alt={pro.product.title} className="w-100"></img>
                    <h2>{pro.product.title.slice(0,20)}</h2>
                    <h5>Count:{pro.count}</h5>
                    <h5>Price:{pro.price}</h5>
                    <input className='form-control'min={1} placeholder='count..' type='number' value={pro.count} onChange={function (e) {
                        updateCartItem(pro.product.id,e.target.value)
                        
                    }}></input>
                    <button className='btn btn-danger' onClick={function () {
                        removeCartItem(pro.product.id)
                    }}>Remove</button>
                </div>
                </div>
                    
                })}
               
            </div>
        </div>
        :<LoadingScren/>}
    </>;
}



export default Cart;