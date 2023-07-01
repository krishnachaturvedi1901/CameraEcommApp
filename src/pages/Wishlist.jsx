import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Wishlist.module.css";
import { GiShoppingCart } from "react-icons/gi";
import { deleteWishlistProduct } from "../redux/WishlistState/actions";
import { useNavigate } from "react-router-dom";
import {AiOutlineDelete} from "react-icons/ai"

const Wishlist = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const { wishlistProducts } = useSelector((state) => state.WishlistGetAllProductState);
  const { isLogin, payload } = useSelector((state) => state.LoginState);


  const handleRemoveFromWishlist = ({wishlistId,userId}) => {
    console.log("Remove from wishlist called");
    if (isLogin && payload) {
      dispatch(
        deleteWishlistProduct({wishlistId,userId})
      );
    } else {
      navigate("/login");
    }

  };

  const handleAddToCart=({product})=>{
    delete product.id
    product.quantity=1
    if(isLogin){

    }

  }

  return (
    <div className={styles.wishlistMainDiv}>
      <div className={styles.allWishlistProdDiv}>
        {wishlistProducts ? (
          wishlistProducts.map((prod) => (
            <div className={styles.oneWishlistProdDiv}  > 
              <img src={prod.img_url} onClick={()=>navigate(`/productDetail/${prod.productId}`)} />
              <div className={styles.oneProdSubAndDeleteBtnDiv}  >
                <div className={styles.oneProdSubDiv} onClick={()=>navigate(`/productDetail/${prod.productId}`)} >
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
                <div className={styles.wishlistDeleteAndCartBtn} >
                  <button className={styles.wishlistDeleteBtn}
                   onClick={()=>handleRemoveFromWishlist({wishlistId:prod.id,userId:prod.userId})}
                  >
                    <AiOutlineDelete size={30} color="white" />
                  </button>
                  <button className={styles.wishlistAddToCartBtn} 
                   onClick={()=>handleAddToCart({product:prod})}
                  >
                    <GiShoppingCart size={30} color="white" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3>Wishlist Empty!</h3>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
