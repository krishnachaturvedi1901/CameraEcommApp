import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Rating } from "react-simple-star-rating";
import styles from "../styles/ProductDetail.module.css"

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  console.log(product);
  useEffect(() => {
    axios(`http://localhost:3001/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

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
        <div className={styles.pdWishlistCartButtonDiv} >
          <button>Add to wishlist</button>
          <button>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
