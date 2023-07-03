import React, { useEffect, useState } from 'react'
import styles from "./Toster.module.css"
const Toster = ({message}) => {
  const [showToster,setShowToster]=useState(true)

  useEffect(()=>{
   const timeout=setTimeout(()=>{
        setShowToster(false)
    },1000)
    return(()=>{
        clearInterval(timeout)
    })
  },[])

  if(!showToster){
    return null
  }

  const tosterClassName = showToster ? `${styles.tosterMainDiv} ${styles.animate}` : styles.tosterMainDiv;

  return (
    <div className={tosterClassName} >{message}</div>
  )
}

export default Toster