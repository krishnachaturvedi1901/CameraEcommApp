import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const CartDivContext = createContext();

const CartSideDivContextProvider = ({ children }) => {
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const toggleCartOpening = () => {
    setCartIsOpen(!cartIsOpen);
  };
  console.log("cartIsOpen", cartIsOpen);
  return (
    <CartDivContext.Provider value={{ cartIsOpen, toggleCartOpening }}>
      {children}
    </CartDivContext.Provider>
  );
};

export default CartSideDivContextProvider;
