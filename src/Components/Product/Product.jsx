import axios from 'axios'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../Contexts/AuthContext'

export default function Product({ product }) {
    
    let { setIsUserLoggedIn } = useContext(authContext)
    let navigate = useNavigate()

    async function addProductToCart(productId) {


        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/cart?', {
            productId
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).catch((error) => {
            console.log(error);
            toast.error(error.response.data.message)
            setIsUserLoggedIn(false)
            localStorage.removeItem("token")
            navigate("/Login")
        })

        if (response) {
            toast.success(response.data.message)
        }
        console.log(response);
    }




    return (
        <div className="col-md-2">
            <div className="product overflow-hidden p-2 cursor-pointer">
                <Link className='cursor-pointer' to={'/ProductDetails/' + product._id}>
                    <img className='w-100' src={product.imageCover} alt="" />
                    <h5 className='font-sm text-main py-2'>{product.category.name}</h5>
                    <h4>{product.title.split(" ").splice(0, 2).join(" ")}</h4>
                    <p className='d-flex justify-content-between'>
                        <span>{product.price} EGP</span>
                        <span className='rating-color'><i className='fas fa-star me-1'></i>{product.ratingsAverage}</span>
                    </p>
                </Link>
                <button onClick={() => addProductToCart(product._id)} className='btn w-100 text-white bg-main'>Add to cart</button>
            </div>
        </div>
    )
}
