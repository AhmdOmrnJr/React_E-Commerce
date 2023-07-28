import axios  from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingScren from '../LoadingScreen/LoadingScren';

const Allorders = ({currentUser}) => {
    const [allOrders, setallOrders] = useState(null)
    async function getAllOrders(){
        try {
            const {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${currentUser.id}`)
            setallOrders(data)
            console.log(allOrders);
            
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
     getAllOrders()
    }, [])
    return <>
   {allOrders? <div className='container py-4'>
     <h2>Hello user</h2>
     <div className="row">
        
        {allOrders.map(function (order,idx) {
            return <div key={idx} className="col-md-6">
            <div className="order bg-primary text-white rounded-4">
                <div className="container">
                    <div className="row">
                     
                        {order.cartItems.map(function (product,indx) {
                            return    <div key={indx} className="col-sm-6">
                            <div className="product">
                                <h5>Count:{product.count}</h5>
                                <h5>Price:{product.price}</h5>
                                <img src={product.product.imageCover}title={product.product.title} className="w-100"></img>
                            </div>
                        </div>
                            
                        })}
                    </div>
                </div>
                <h5>Price:{order.totalOrderPrice}</h5>
                <h5>OrderType:{order.paymentMethodType}</h5>
                <p>this order was deliverd to{order.shippingAddress.details} in{order.shippingAddress.city}
                with this number : {order.shippingAddress.phone
}</p>

            </div>
        </div>
        })}
     </div>
    </div>:<LoadingScren/>}
    </>;
}



export default Allorders;