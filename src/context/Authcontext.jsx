import React from 'react'
import { useState } from "react";
import { createContext } from "react";

export const AuthContext=createContext()


const AuthcontextProvider = ({children}) => {
    const [isAuth,setIsAuth]=useState(false)

    const toggleAuth=()=>{
      setIsAuth(!isAuth)
    }
  return (
    <AuthContext.Provider value={{isAuth,toggleAuth}} >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthcontextProvider