import React, { useContext } from 'react'
import { authContext } from '../Contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {

    let { isUserLoggedIn } = useContext(authContext)
    if (isUserLoggedIn) {
        return children
    }else {
        return <Navigate to={"/Login"}/>
    }

}
