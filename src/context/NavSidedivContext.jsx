import React, { useState } from 'react'
import { createContext } from 'react'

export const NavSidedivContext=createContext()
const NavSidedivContextProvider = ({children}) => {
   const [navDiv,setNavDiv]=useState(false)
   const toggleNavDivOpening=()=>{
    setNavDiv(!navDiv)
   }
  return (
    <NavSidedivContext.Provider value={{navDiv,toggleNavDivOpening}}>
      {children}
    </NavSidedivContext.Provider>
  )
}

export default NavSidedivContextProvider