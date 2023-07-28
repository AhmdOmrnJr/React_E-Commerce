import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Layout = ({currentUser,clearUserData}) => {
    return <>
    <Navbar currentUser={currentUser} clearUserData={clearUserData}/>
     <Outlet/>
    <footer className='py-4'>
        
        
        <div className="container mt-3 border-bottom border-top border-2 border-dark py-4 d-flex justify-content-between align-items-center">
        <div className="leftPart ms-5">
            <ul className='list-unstyled d-flex'>
                < li className='me-2 '><h6>Payment Parteners</h6></li>
                < li className='me-2 text-primary '><i className='fa-brands fa-paypal'></i></li>

                < li className='me-2 text-primary '><i className='fa-brands fa-cc-amazon-pay'></i></li>
                < li className='me-2 text-primary '><i className='fa-brands fa-cc-mastercard'></i></li>


            </ul>
        </div>
        <div className="RightPart d-flex align-items-center">
            <h6>Get Deliveries with FrechCart</h6>
            <button className='btn btn-dark btn-lg mx-3'><i className='fa-brands fa-app-store me-2'></i>Available on App Store</button>
            <button className='btn btn-dark btn-lg'><i className='fa-brands fa-google-play me-2'></i>Get it from Google Play</button>

        </div>
</div>
    </footer>
    </>;
}


export default Layout;