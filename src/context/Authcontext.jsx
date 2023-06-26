import React from 'react'
import { useEffect } from 'react';
import { useState } from "react";
import { createContext } from "react";
import { login_success } from '../redux/LoginSignupState/actions';
import { useDispatch } from 'react-redux';

export const AuthContext=createContext()


const AuthcontextProvider = ({children}) => {
   const dispatch=useDispatch()
    const [isAuth,setIsAuth]=useState(false)

    useEffect(()=>{
      const isLoggedIn=localStorage.getItem("isLoggedIn")
      const loginUser=JSON.parse(localStorage.getItem("loginUser"))

      if(isLoggedIn && loginUser){
        dispatch(login_success(loginUser))
        setIsAuth(true)
      }
    },[])

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