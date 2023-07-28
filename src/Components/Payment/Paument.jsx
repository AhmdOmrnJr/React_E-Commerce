import  axios  from 'axios';
import React, { useContext } from 'react';
import { cartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';


const Paument = () => {
    const navigate=useNavigate()
    const {cartId} = useContext(cartContext)
    async function confirmCashOrder(){
        try {
            const {data}=await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders//${cartId}`,{
                "shippingAddress":{
                    "details": document.querySelector('#detailes').value,
                    "phone": document.querySelector('#phone').value,
                    "city": document.querySelector('#city').value
                    }
            },{
                headers:{'token':localStorage.getItem('uToken')}

            })
            console.log(data);
            if(data.status=="success"){
              navigate('/allOrders')
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function confirmCreditOrder(){
        try {
            const {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{
                "shippingAddress":{
                    "details": document.querySelector('#detailes').value,
                    "phone": document.querySelector('#phone').value,
                    "city": document.querySelector('#city').value
                    }
            },{
                headers:{'token':localStorage.getItem('uToken')},
                params:{
                    'url':'http://localhost:3000'

                }

            })
            console.log(data);
            if(data.status=="success"){
              window.open(data.session.url)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return<>
     <div className='container text-center'>
        <h2>hello user</h2>
        <div className='w-50 m-auto'>
            <form>
                <label className='mt-3' htmlFor='detailes'>Address Details</label>
                <input type='text' className='form-control' placeholder='Address Details' id='detailes'></input>
                <label className='mt-3' htmlFor='detailes'>phone</label>
                <input type='text' className='form-control' placeholder='phone' id='phone'></input>
                <label className='mt-3' htmlFor='detailes'>city</label>
                <input type='text'className='form-control' placeholder='city' id='city'></input>
                <button type='button' onClick={confirmCashOrder} className='btn btn-primary mt-3 me-3'>Confirm Cash</button>
                <button type='button' onClick={confirmCreditOrder} className='btn btn-primary mt-3'>Confirm Credit</button>

            </form>
        </div>
    </div>;
    </>
}



export default Paument;