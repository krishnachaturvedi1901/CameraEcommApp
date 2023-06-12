import React from 'react'
import styles from "./Navbar.module.css"
import { Link } from 'react-router-dom'
import {GiShoppingCart} from "react-icons/gi"

const Navbar = () => {
  return (
    <div className={styles.navDiv} >
        <div className={styles.navSubDiv} >
            <div><Link to={'/'} className={styles.navListing} >Home</Link></div>
            <div><Link to={'/products'} className={styles.navListing} >Products</Link></div>
            <div><Link to={'/login'} className={styles.navListing} >Login</Link></div>
            <button id={styles.cartButton} ><Link to={'/cart'} ><GiShoppingCart size={30} color='white' /></Link></button>
        </div>
    </div>
  )
}

export default Navbar