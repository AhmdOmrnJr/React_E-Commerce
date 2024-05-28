import { createContext, useState } from "react";

export let authContext = createContext()

export default function AuthContextProvider({ children }) {
    let [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem("token") ? true : false)

    return <authContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
        {children}
    </authContext.Provider>
}