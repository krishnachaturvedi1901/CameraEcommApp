import React from "react";
import styles from "../styles/Cart.module.css";
import { useEffect } from "react";
import { useContext } from "react";
import { CartDivContext } from "../context/CartSideDivContext";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCartFunction, getAllProductsFromCartFunction } from "../redux/CartState/action";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
const Cart = () => {
  const navigate=useNavigate()
  const { cartIsOpen, toggleCartOpening } = useContext(CartDivContext);
  const cartRef = useRef(null);
  const dispatch = useDispatch();
  const { isLogin, payload } = useSelector((state) => state.LoginState);
  const { getAllCartLoading, getAllCartSuccess, getAllCartError } = useSelector(
    (state) => state.GetAllCartProductsState
  );
  // let [alertMessage,setAlertMessage]=useState("")
  // let [alert,setAlert]=useState(false)

  console.log("Cart state in CART Page", getAllCartSuccess);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartIsOpen &&
        cartRef.current &&
        !cartRef.current.contains(event.target)
      ) {
        toggleCartOpening();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cartIsOpen, toggleCartOpening]);

  useEffect(() => {
    if (isLogin && payload) {
      dispatch(getAllProductsFromCartFunction(payload.id));
    }
  }, []);

  const findTotalQuantities = () => {
    const totalQuantity = getAllCartSuccess.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
    console.log("totalQuant------->", totalQuantity);
    return totalQuantity;
  };

  const handleRemoveFromCart=({cartId,userId})=>{
    dispatch(deleteFromCartFunction({cartId,userId}))
  }

  return (
    <div className={styles.cartMainDiv} ref={cartRef}>
      {!isLogin ? (
        <div className={styles.loginDirectionDiv}>
          <h5>Please login to use cart features.</h5>
          <button className={styles.loginBtnInCart}>Login</button>
        </div>
      ) : (
        <div>
          <div className={styles.quantityDiv}>
            <p>Item types:{getAllCartSuccess.length}</p>
            <p>Total items:{findTotalQuantities()}</p>
          </div>
          <div className={styles.allWishlistProdDiv}>
            {getAllCartSuccess ? (
              getAllCartSuccess.map((prod) => {
                return <div className={styles.oneWishlistProdDiv}>
                  <img
                    id={styles.cartImgId}
                    src={prod.img_url}
                    onClick={() => navigate(`/productDetail/${prod.productId}`)}
                  />
                  <div className={styles.oneProdSubAndDeleteBtnDiv}>
                    <div
                      className={styles.oneProdSubDiv}
                      onClick={() =>
                        navigate(`/productDetail/${prod.productId}`)
                      }
                    >
                      <p>
                        {prod.brand}-{prod.model}
                      </p>
                      <h3>{prod.productName}</h3>
                      <h5>
                        M.R.P.<del>{prod.mrp}</del>
                      </h5>
                      <h4>
                        Offer Price:<strong>{prod.offerPrize}</strong>
                      </h4>
                    </div>
                    <div className={styles.wishlistDeleteAndCartBtn}>
                      <button
                        className={styles.wishlistDeleteBtn}
                        onClick={() =>
                          handleRemoveFromCart({
                            cartId: prod.id,
                            userId: prod.userId,
                          })
                        }
                      >
                        <AiOutlineDelete size={20} color="white" />
                      </button>
                    </div>
                  </div>
                </div>;
              })
            ) : (
              <h3>Cart Empty!</h3>
            )}
          </div>
        </div>
      )}
      Cart
    </div>
  );
};

export default Cart;
