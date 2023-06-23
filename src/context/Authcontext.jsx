import React from 'react'
import { useState } from "react";
import { createContext } from "react";

export const AuthContext=createContext()


const AuthcontextProvider = ({children}) => {
    const [isAuth,setIsAuth]=useState(false)

    const toggleAuth=()=>{
        // .then(()=>{
        //     setIsAuth(!isAuth)
        // })
        // .catch(()=>{
        //     console.log("error after login notToggling")
        // })
    }
  return (
    <AuthContext.Provider value={{isAuth,toggleAuth}} >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthcontextProvider