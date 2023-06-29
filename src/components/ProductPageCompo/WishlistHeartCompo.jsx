import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import styles from "../../styles/ProductPage.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  checkProductAlreadyExist,
  whishlistAddingRequest,
} from "../../redux/WishlistState/actions";
import { useNavigate } from "react-router-dom";

const WishlistHeartCompo = ({ product , productId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, payload } = useSelector((state) => state.LoginState);
  const [toWishlist, setToWishlist] = useState(false);
  const { loading, wishlisted, error, wishlist } = useSelector(
    (state) => state.WishlistState
  );
  // let prodId = product.id;
  // product.productId = product.id;

  console.log("product-", product);

  console.log(
    "State Inside wishlistheartComp-",
    loading,
    wishlisted,
    error,
    wishlist
  );

  useEffect(() => {
    delete product.id;
    if (isLogin && payload) {
      dispatch(
        checkProductAlreadyExist({
          userId: payload.id,
          productId: product.productId,
        })
      );
    }
  }, []);

  const handleAddToWishlist = () => {
    if (isLogin && payload) {
      dispatch(
        whishlistAddingRequest({
          ...product,
          userId: payload.id,
          productId: productId,
        })
      );
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={styles.wishlistHeartDiv} onClick={()=>handleAddToWishlist()}>
      {!wishlisted ? (
        <AiOutlineHeart size={20} />
      ) : (
        <AiFillHeart size={20} color="red" />
      )}
    </div>
  );
};

export default WishlistHeartCompo;
