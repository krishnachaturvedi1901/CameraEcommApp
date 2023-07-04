import React from 'react'
import { useState } from "react";
import { createContext } from "react";

export const AlertContext=createContext()


export const AlertContextProvider = ({children}) => {
    let [alertMessage,setAlertMessage]=useState("")
    let [alert,setAlert]=useState(false)
  
    const AlertFunction=(message)=>{
        setAlert(true)
        setAlertMessage(message)
        const timeout=setTimeout(()=>{
          setAlert(false)
          clearTimeout(timeout)
        },1000)
    
      }
    
  return (
    <AlertContext.Provider value={{alert,alertMessage,AlertFunction}} >
        {children}
    </AlertContext.Provider>
  )
}
