import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
export const WindowWidthContext=createContext()
const WindowWidthContextProvider = ({children}) => {

  const [windowWidth,setWindowWidth]=useState(window.innerWidth)

  useEffect(()=>{
    const handleWindowChange=()=>{
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize',handleWindowChange)
    return(()=>window.removeEventListener('resize'))

  },[])

  return (
    <WindowWidthContext.Provider value={{windowWidth}} >
        {children}
    </WindowWidthContext.Provider>
    
  )
}

export default WindowWidthContextProvider