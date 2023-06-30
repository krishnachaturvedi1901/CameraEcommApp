import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import styles from "../../styles/ProductPage.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  checkProductAlreadyExist,
  deleteWishlistProduct,
  getAllWishlistProducts,
  whishlistAddingRequest,
} from "../../redux/WishlistState/actions";
import { useNavigate } from "react-router-dom";

const WishlistHeartCompo = ({ productObj, productIdTemp  }) => {
  const [ productInWishlist,setProductInWishlist ]=useState({})
  const [product,setProduct]=useState({})
  const [productId,setProductId]=useState()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, payload } = useSelector((state) => state.LoginState);
  const [toWishlist, setToWishlist] = useState(false);
  const { loading, wishlisted, error, wishlistedProduct } = useSelector(
    (state) => state.WishlistState
    );
    const { wishlistProducts } = useSelector(
      (state) => state.WishlistGetAllProductState
      );

  useEffect(()=>{
   if(productObj){setProduct(productObj)}
    if(productIdTemp){setProductId(productIdTemp)}
  },[])

  useEffect(() => {
    if (isLogin && payload && wishlistProducts) {
      const productExist = wishlistProducts.filter((prod) => {
        return productObj.id === prod.productId;
      });
      if(productExist.length > 0){
        setProductInWishlist(productExist[0])
        setToWishlist(true);
      }else{
        setToWishlist(false)
      }
    }
  }, [wishlistProducts]);

  const handleAddToWishlist = ({ product, userId, productId }) => {
    delete product.id;
    if (isLogin && payload) {
      dispatch(
        whishlistAddingRequest({
          ...product,
          userId,
          productId,
        })
      );
    } else {
      navigate("/login");
    }
  };

  const handleRemoveFromWishlist = () => {
    console.log("Remove from wishlist called");
    if (isLogin && payload) {
      dispatch(
        deleteWishlistProduct({wishlistId:productInWishlist.id,userId:payload.id})
      );
    } else {
      navigate("/login");
    }

  };

  return (
    <>
      {!toWishlist ? (
        <div
          className={styles.wishlistHeartDiv}
          onClick={() =>
            handleAddToWishlist({
              product,
              userId: payload.id,
              productId: productId,
            })
          }
        >
          <AiOutlineHeart size={20} />
        </div>
      ) : (
        <div
          className={styles.wishlistHeartDiv}
          onClick={() => handleRemoveFromWishlist()}
        >
          <AiFillHeart size={20} color="red" />
        </div>
      )}
    </>
  );
};

export default WishlistHeartCompo;
