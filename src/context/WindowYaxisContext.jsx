import React, { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const YaxisContext = createContext();

const WindowYaxisContextProvider = ({ children }) => {
  const [ycordinates, setYcordinates] = useState(0);

  useEffect(() => {
    const handleWindowScroll = () => {
      setYcordinates(window.scrollY);
    };
    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll",handleWindowScroll);

  }, []);
  return (
    <YaxisContext.Provider value={{ ycordinates }}>
      {children}
    </YaxisContext.Provider>
  );
};

export default WindowYaxisContextProvider;
