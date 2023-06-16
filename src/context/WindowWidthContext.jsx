import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
export const WindowWidthContext=createContext()
const WindowWidthContextProvider = ({children}) => {

  const [windowWidth,setWindowWidth]=useState(window.innerWidth)
  console.log("windowWidth-",windowWidth)

  useEffect(()=>{
    const handleWindowChange=()=>{
      setWindowWidth(window.innerWidth)
      return(()=>window.removeEventListener('resize'))
    }
    window.addEventListener('resize',handleWindowChange)

  },[])

  return (
    <WindowWidthContext.Provider value={{windowWidth}} >
        {children}
    </WindowWidthContext.Provider>
    
  )
}

export default WindowWidthContextProvider