import React, { useEffect, useState } from 'react'
import styles from "./Navbar.module.css"
import { Link } from 'react-router-dom'
import {GiShoppingCart} from "react-icons/gi"
import {FaHamburger} from "react-icons/fa"
import { useContext } from 'react'
import { NavSidedivContext } from '../../context/NavSidedivContext'
import { WindowWidthContext } from '../../context/WindowWidthContext'
import { CartDivContext } from '../../context/CartSideDivContext'

const Navbar = () => {
  const {toggleNavDivOpening}=useContext(NavSidedivContext)
  const {toggleCartOpening}=useContext(CartDivContext)
  const {windowWidth}=useContext(WindowWidthContext)
  
  return (
    
  windowWidth<=500?
    <div className={styles.navHamMainDiv} >
        <div onClick={()=>toggleNavDivOpening()} className={styles.navHamburgerDiv} ><FaHamburger size={20} /></div>
        <button id={styles.cartButton}  onClick={()=>toggleCartOpening()} ><GiShoppingCart size={30} color='white' /></button>
    </div>
    :
    <div className={styles.navDiv} >
        <div className={styles.navSubDiv} >
            <div><Link to={'/'} className={styles.navListing} >Home</Link></div>
            <div><Link to={'/products'} className={styles.navListing} >Products</Link></div>
            <div><Link to={'/login'} className={styles.navListing} >Login</Link></div>
            <button id={styles.cartButton} onClick={()=>toggleCartOpening()} ><GiShoppingCart size={30} color='white' /></button>
        </div>
    </div>
   
  )
}

export default Navbar