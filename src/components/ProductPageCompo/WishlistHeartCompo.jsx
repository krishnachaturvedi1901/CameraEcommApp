import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { AiOutlineHeart } from "react-icons/ai";
import styles from "../../styles/ProductPage.module.css"
import { useState } from 'react';

const WishlistHeartCompo = ({id}) => {
    const [toWishlist,setToWishlist]=useState(false)

    const handleAddToWishlist=()=>{
        setToWishlist(!toWishlist)
    } 
  return (
    <div className={styles.wishlistHeartDiv} onClick={handleAddToWishlist} >
     {!toWishlist?<AiOutlineHeart size={20} />:<AiFillHeart size={20} color="red" />}
    </div>

  )
}

export default WishlistHeartCompo