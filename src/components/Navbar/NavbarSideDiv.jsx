import React from "react";
import styles from "./NavbarSideDiv.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { NavSidedivContext } from "../../context/NavSidedivContext";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import fakeUserImage from "../../static/user.png";

const NavbarSideDiv = () => {
  const navigate=useNavigate()
  const navSideDivRef = useRef(null);
  const { navDiv, toggleNavDivOpening } = useContext(NavSidedivContext);
  const { isLogin, payload } = useSelector((state) => state.LoginState);

  useEffect(() => {
    const handleNavSideDivToggle = (event) => {
      if (
        navDiv &&
        navSideDivRef &&
        !navSideDivRef.current.contains(event.target)
      ) {
        toggleNavDivOpening();
      }
    };
    document.addEventListener("mousedown", handleNavSideDivToggle);
    return () => {
      document.removeEventListener("mousedown", handleNavSideDivToggle);
    };
  }, [navDiv, toggleNavDivOpening]);

  return (
    <div className={styles.navSideDiv} ref={navSideDivRef}>
      {!isLogin && !payload ? (
        <button>
          <Link to={"/login"} id={styles.loginId} className={styles.navListing}>
            Login
          </Link>
        </button>
      ) : (
        <div className={styles.userImgDiv} onClick={()=>{navigate("/account")}} >
          <img src={fakeUserImage} alt="Account" />
          <h5>{payload.firstname} {payload.lastname} &rarr; </h5>
        </div>
      )}
      <div className={styles.lineDiv} ><p></p></div>
      <div className={styles.navSideDivListingDiv}>
        <Link to={"/"} className={styles.navListing}>
          Home
        </Link>
      </div>
      <div className={styles.navSideDivListingDiv}>
        <Link to={"/products"} className={styles.navListing}>
          Products
        </Link>
      </div>
      {isLogin && payload ? (
        <div className={styles.navSideDivListingDiv} onClick={()=>navigate('/account/orders')} >
          <Link to={"/products"} className={styles.navListing}>
            Orders
          </Link>
        </div>
      ) : null}
      {isLogin && payload ? (
        <div className={styles.navSideDivListingDiv} onClick={()=>navigate('/account/wishlist')} >
          <Link to={"/products"} className={styles.navListing}>
            Wishlist
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default NavbarSideDiv;
