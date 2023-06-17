import React from "react";
import styles from "../styles/Cart.module.css";
import { useEffect } from "react";
import { useContext } from "react";
import { CartDivContext } from "../context/CartSideDivContext";
import { useRef } from "react";
const Cart = () => {
  const { cartIsOpen, toggleCartOpening } = useContext(CartDivContext);
  const cartRef=useRef(null)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartIsOpen &&
        cartRef.current &&
        !event.target.closest(".cartMainDiv")
        &&
        !cartRef.current.contains(event.target)
        ) {
        toggleCartOpening();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cartIsOpen, toggleCartOpening]);
  

  return <div className={styles.cartMainDiv} ref={cartRef} >Cart</div>;
};

export default Cart;
