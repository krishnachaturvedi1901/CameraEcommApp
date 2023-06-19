import React from "react";
import styles from "./NavbarSideDiv.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { NavSidedivContext } from "../../context/NavSidedivContext";
import { useEffect } from "react";
import { useRef } from "react";

const NavbarSideDiv = () => {
  const navSideDivRef=useRef(null)
  const {navDiv,toggleNavDivOpening}=useContext(NavSidedivContext)

  useEffect(()=>{

    const handleNavSideDivToggle=(event)=>{
      if(navDiv && navSideDivRef && !navSideDivRef.current.contains(event.target)){
        toggleNavDivOpening()
      }
    }
     document.addEventListener('mousedown',handleNavSideDivToggle)
     return(()=>{document.removeEventListener('mousedown',handleNavSideDivToggle)})
  
  },[navDiv,toggleNavDivOpening])

  return (
    <div className={styles.navSideDiv} ref={navSideDivRef}  >
      <button>
        <Link to={"/login"} id={styles.loginId} className={styles.navListing}>
          Login
        </Link>
      </button>
      <div>
        <Link to={"/"} className={styles.navListing}>
          Home
        </Link>
      </div>
      <div>
        <Link to={"/products"} className={styles.navListing}>
          Products
        </Link>
      </div>
    </div>
  );
};

export default NavbarSideDiv;
