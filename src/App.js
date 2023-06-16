import { useContext, useEffect, useRef } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./routes/AllRoutes";
import { NavSidedivContext } from "./context/NavSidedivContext";
import NavbarSideDiv from "./components/Navbar/NavbarSideDiv";
import { WindowWidthContext } from "./context/WindowWidthContext";

function App() {
  const { navDiv, toggleNavDivOpening } = useContext(NavSidedivContext);
  const { windowWidth } = useContext(WindowWidthContext);

  return (
    <div className="App">
      <Navbar />
      {navDiv && windowWidth <= 500 ? (
          <NavbarSideDiv/>
      ) : null}
      <AllRoutes />
    </div>
  );
}

export default App;
