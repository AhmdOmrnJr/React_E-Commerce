import React, { useContext } from 'react'
import { authContext } from '../Contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export default function LoggedIn({ children }) {


    let { isUserLoggedIn } = useContext(authContext)
    if (isUserLoggedIn) {
        return <Navigate to={'/home'} />
    } else {
        return children
    }

}
