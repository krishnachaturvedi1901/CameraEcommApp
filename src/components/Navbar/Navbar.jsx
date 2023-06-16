import React, { useEffect, useState } from 'react'
import styles from "./Navbar.module.css"
import { Link } from 'react-router-dom'
import {GiShoppingCart} from "react-icons/gi"
import {FaHamburger} from "react-icons/fa"
import { useContext } from 'react'
import { NavSidedivContext } from '../../context/NavSidedivContext'
import { WindowWidthContext } from '../../context/WindowWidthContext'

const Navbar = () => {
  const {toggleNavDivOpening}=useContext(NavSidedivContext)
  const {windowWidth}=useContext(WindowWidthContext)
  const handleNavDivOpen=()=>{
    console.log("toggle nav div")
    toggleNavDivOpening()
  }
  
  return (
    <div className={styles.navDiv} >
    {windowWidth<=500?
        <div onClick={handleNavDivOpen} className={styles.navSubDiv} ><FaHamburger/></div> 
    :
        <div className={styles.navSubDiv} >
            <div><Link to={'/'} className={styles.navListing} >Home</Link></div>
            <div><Link to={'/products'} className={styles.navListing} >Products</Link></div>
            <div><Link to={'/login'} className={styles.navListing} >Login</Link></div>
            <button id={styles.cartButton} ><Link to={'/cart'} ><GiShoppingCart size={30} color='white' /></Link></button>
        </div>}
    </div>
  )
}

export default Navbar