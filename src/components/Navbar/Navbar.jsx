import React, { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHamburger } from "react-icons/fa";
import { BsCartX } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";
import { useContext } from "react";
import { NavSidedivContext } from "../../context/NavSidedivContext";
import { WindowWidthContext } from "../../context/WindowWidthContext";
import { CartDivContext } from "../../context/CartSideDivContext";
import { useSelector } from "react-redux";
import fakeUserImage from "../../static/user.png";

const Navbar = () => {
  const { toggleNavDivOpening } = useContext(NavSidedivContext);
  const { cartIsOpen, toggleCartOpening } = useContext(CartDivContext);
  const { windowWidth } = useContext(WindowWidthContext);
  const { navDiv } = useContext(NavSidedivContext);
  const { isLogin, payload } = useSelector((state) => state.LoginState);
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);
  const navigate=useNavigate()

  const handleCartOpening = () => {
    console.log("cartIsopen chek in navbar", cartIsOpen);
    if (!cartIsOpen) {
      toggleCartOpening();
    }
  };

  return windowWidth <= 500 ? (
    <div className={styles.navHamMainDiv}>
      {!navDiv ? (
        <div
          onClick={() => toggleNavDivOpening()}
          className={styles.navHamburgerDiv}
        >
          <FaHamburger size={20} />
        </div>
      ) : (
        <div className={styles.navHamburgerDiv}>
          <GiHamburgerMenu size={20} />
        </div>
      )}
      {!cartIsOpen ? (
        <button id={styles.cartButton} onClick={() => handleCartOpening()}>
          <BsCartCheck size={24} color="white" />
        </button>
      ) : (
        <button id={styles.cartButton}>
          <BsCartX size={24} color="white" />
        </button>
      )}
    </div>
  ) : (
    <div className={styles.navDiv}>
      <div className={styles.navSubDiv}>
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
        <div className={styles.loginAccountDiv}>
          {isLogin && payload ? (
            <div
              className={styles.userImgDiv}
              onMouseEnter={() => setNavDropdownOpen(true)}
              onMouseLeave={() => setNavDropdownOpen(false)}
            >
              <img src={fakeUserImage} alt="Account" />
              {navDropdownOpen ? (
                <div className={styles.userDropdownDiv}>
                  <div onClick={()=>{navigate('/account/orders')}} >
                    <b>Order</b>
                  </div>
                  <hr />
                  <div onClick={()=>{navigate('/account/wishlist')}} >
                    <b>Wishlist</b>
                  </div>
                  <hr />
                  <div onClick={()=>{navigate('/account')}} >
                    <b>Account</b>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <Link to={"/login"} className={styles.navListing}>
              Login
            </Link>
          )}
        </div>
        {!cartIsOpen ? (
          <button id={styles.cartButton} onClick={() => handleCartOpening()}>
            <BsCartCheck size={24} color="white" />
          </button>
        ) : (
          <button id={styles.cartButton}>
            <BsCartX size={24} color="white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
