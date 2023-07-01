import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Rating } from "react-simple-star-rating";
import styles from "../styles/ProductDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { BsFillHeartFill } from "react-icons/bs";
import { whishlistAddingRequest } from "../redux/WishlistState/actions";
const productsApiUrl = process.env.REACT_APP_PRODUCTS_API_URL;

const ProductDetail = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { isLogin, payload } = useSelector((state) => state.LoginState);
  const [toWishlist, setToWishlist] = useState(false);
  const { wishlistProducts } = useSelector(
    (state) => state.WishlistGetAllProductState
  );

  console.log(product);
  useEffect(() => {
    axios(`${productsApiUrl}/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (isLogin && payload && wishlistProducts) {
      const productExist = wishlistProducts.filter((prod) => {
        return id == prod.productId;
      });
      if (productExist.length > 0) {
        setToWishlist(true);
      } else {
        setToWishlist(false);
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

  return (
    <div className={styles.pdMainDiv}>
      <div className={styles.pdImgDiv}>
        <img src={product.img_url} alt="cam img" />
      </div>
      <div className={styles.pdAllDetailDiv}>
        <h4>{product.brand}</h4>
        <p>Model: {product.model}</p>
        <h3>{product.productName}</h3>
        <p>
          Rating:{" "}
          <Rating
            initialValue={product.rating}
            allowFraction
            readonly
            size={"16"}
          />{" "}
          {product.rating}
        </p>
        <div className={styles.pdTableDiv}>
          <h3>PROPERTIES</h3>
          <table>
            <tbody>
              <tr>
                <th>HDMI </th>
                <td>{product.HDMI}</td>
              </tr>
              <tr>
                <th>USB </th>
                <td>{product.USB}</td>
              </tr>
              <tr>
                <th>Battery type </th>
                <td>{product.batteryType}</td>
              </tr>
              <tr>
                <th>Feature </th>
                <td>{product.feature}</td>
              </tr>
              <tr>
                <th>Lens type </th>
                <td>{product.lensType}</td>
              </tr>
              <tr>
                <th>Sensor type </th>
                <td>{product.sensorType}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.pdMrpDiv}>
          <p>
            M.R.P: Rs.<span>{product.mrp}</span>
          </p>
          <h2>Offer price: Rs.{product.offerPrize}</h2>
        </div>
        <div className={styles.pdWishlistCartButtonDiv}>
          {isLogin && toWishlist ? (
            <button style={{ backgroundColor: "chocolate" }}>
              <BsFillHeartFill color="white" /> Wishlisted
            </button>
          ) : (
            <button
              onClick={() =>
                handleAddToWishlist({
                  product,
                  userId: payload.id,
                  productId: product.id,
                })
              }
            >
              Add to wishlist
            </button>
          )}

          <button>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
