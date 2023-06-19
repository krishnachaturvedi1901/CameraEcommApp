import { useContext, useEffect, useRef } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./routes/AllRoutes";
import { NavSidedivContext } from "./context/NavSidedivContext";
import NavbarSideDiv from "./components/Navbar/NavbarSideDiv";
import { WindowWidthContext } from "./context/WindowWidthContext";
import { CartDivContext } from "./context/CartSideDivContext";
import Cart from "./pages/Cart";

function App() {
  const { navDiv } = useContext(NavSidedivContext);
  const { cartIsOpen } = useContext(CartDivContext);
  const { windowWidth } = useContext(WindowWidthContext);

  return (
    <div className="App">
      <Navbar />
      {navDiv && windowWidth <= 500 ? <NavbarSideDiv /> : null}
      {cartIsOpen ? <Cart /> : null}
      <AllRoutes />
    </div>
  );
}

export default App;
