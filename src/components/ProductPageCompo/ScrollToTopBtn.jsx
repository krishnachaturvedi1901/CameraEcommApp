import React from 'react'
import {BiArrowToTop } from "react-icons/bi"
import { BsRocket } from "react-icons/bs"
import styles from "../../styles/ProductPage.module.css"
import { useState } from 'react'

const ScrollToTopBtn = () => {
    const handleScrollToTop=()=>{
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    }
  return (
    <div className={styles.scrollToTopDiv} onClick={handleScrollToTop} >
        <button><BsRocket size={22} color='white' /></button>
    </div>
  )
}

export default ScrollToTopBtn