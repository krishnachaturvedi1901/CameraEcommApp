import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import NavSidedivContextProvider from './context/NavSidedivContext';
import WindowWidthContextProvider from './context/WindowWidthContext';
import WindowYaxisContextProvider from './context/WindowYaxisContext';
import CartSideDivContextProvider from './context/CartSideDivContext';
import AuthcontextProvider from './context/Authcontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
  
  <WindowYaxisContextProvider>
  <WindowWidthContextProvider>
  <AuthcontextProvider>
  <CartSideDivContextProvider>
  <NavSidedivContextProvider>
  <BrowserRouter>
   <App />
  </BrowserRouter>
  </NavSidedivContextProvider>
  </CartSideDivContextProvider>
  </AuthcontextProvider>
  </WindowWidthContextProvider>
  </WindowYaxisContextProvider>
  </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
