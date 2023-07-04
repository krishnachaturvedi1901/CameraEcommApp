import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productPageState/actions";
import styles from "../styles/ProductPage.module.css";
import Pagination from "../components/ProductPageCompo/Pagination";
import Filteration from "../components/ProductPageCompo/Filteration";
import Sorting from "../components/ProductPageCompo/Sorting";
import Searching from "../components/ProductPageCompo/Searching";
import { useNavigate, useSearchParams } from "react-router-dom";
import { updatePaginationState } from "../redux/pageSortFilterState/actions";
import { GiShoppingCart } from "react-icons/gi";
import ScrollToTopBtn from "../components/ProductPageCompo/ScrollToTopBtn";
import { YaxisContext } from "../context/WindowYaxisContext";
import WishlistHeartCompo from "../components/ProductPageCompo/WishlistHeartCompo";
import { getAllWishlistProducts, whishlistAddingRequest } from "../redux/WishlistState/actions";
import Toster from "../components/TosterAlertCompo/Toster";
import { checkInCartFunction, updateInCartFunction } from "../redux/CartState/action";
import { AlertContext } from "../context/AlertContext";

const ProductPage = () => {
  const [productsReload,setProductsReload]=useState(false)
  const { ycordinates } = useContext(YaxisContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLogin, payload } = useSelector((state) => state.LoginState);
  let { loading, products, totalProducts, error } = useSelector(
    (state) => state.ProductState
  );
  let paginationState = useSelector((state) => state.PaginationState);
  let sortingState = useSelector((state) => state.SortingState);
  let searchingState = useSelector((state) => state.SearchingState);
  let filteringState = useSelector((state) => state.FilteringState);
  const { wishlistProducts } = useSelector(
    (state) => state.WishlistGetAllProductState
  );
  const {cartLoading,cartAdded,cartError}=useSelector((state)=>state.AddToCartState)
  const {alert,alertMessage,AlertFunction}=useContext(AlertContext)
  let { _page, _limit } = paginationState;
  let { brand, feature } = filteringState;
  let { _sort, _order } = sortingState;
  let { q } = searchingState;

  useEffect(() => {
    dispatch(
      fetchProducts({
        ...paginationState,
        ...sortingState,
        ...searchingState,
        ...filteringState,
      })
    );
    if (isLogin && payload) {
      dispatch(getAllWishlistProducts({ userId: payload.id }));
    }
  }, [paginationState, sortingState, searchingState, filteringState]);

  // useEffect(() => {
  //   let page = +searchParams.get("_page");
  //   if (!isNaN(page) && page > 0) {
  //     dispatch(updatePaginationState({ _page: page, _limit:14 }));
  //   }
  // }, [_page, searchParams, dispatch]);

  useEffect(() => {
    const updateUrl = () => {
      let param = new URLSearchParams(searchParams);
      if (_page) {
        param.set("_page", _page);
        param.set("_limit", _limit);
      }

      if (_sort) {
        param.set("_sort", _sort);
        param.set("_order", _order);
      } else {
        param.delete("_sort");
        param.delete("_order");
      }

      if (brand) param.set("brand", brand);
      else param.delete("brand");

      if (feature) param.set("feature", feature);
      else param.delete("feature");

      if (q) param.set("q", q);
      else param.delete("q");

      setSearchParams(param.toString());
    };
    updateUrl();
  }, [paginationState, sortingState, searchingState, filteringState]);


  useEffect(()=>{
    console.log("reload of pp accours------------->")
    setProductsReload(!productsReload)
  },[wishlistProducts])


  if (loading) {
    return <h2>Loading ...</h2>;
  } else if (error) {
    return <h2>Error while fetch ! Referesh</h2>;
  }

  const handleCartBtnClick=({productId,product})=>{
    if(isLogin && payload){
      dispatch(checkInCartFunction({productId,userId:payload.id,product}))
      console.log("dispatched checkInCartFunction")
    }else{
      AlertFunction("Login to use cart")
    }
    if(cartAdded){AlertFunction("Added to cart")}
    else if(cartError){AlertFunction("Error while adding to cart! Try again")}
  }


  return (
    <div className={styles.productPageMainDiv}>
      <div className={styles.sortingFilterDiv}>
        <Filteration />
        <hr />
        <Sorting />
      </div>
      <div className={styles.productsPageSearchDiv}>
        <Searching />
        <Pagination totalProducts={totalProducts} />
        <p>
          Total Products:<span>{totalProducts}</span>
        </p>
        
        <div className={styles.productsDiv}>
          {products
            ? products.map((prod) => {
                return (
                  <div
                    className={styles.oneProductDivAndCartBtnDiv}
                    key={prod.id}
                  >
                    <WishlistHeartCompo
                      productObj={prod}
                      productIdTemp={prod.id}
                      // handleAddToWishlist={handleAddToWishlist}
                      // handleRemoveFromWishlist={handleRemoveFromWishlist}
                    />
                    <div
                      className={styles.oneProductDiv}
                      onClick={() => navigate(`/productDetail/${prod.id}`)}
                    >
                      <h3>{prod.brand}</h3>
                      <img src={prod.img_url} />
                      <h4>{prod.productName}</h4>
                      <p>
                        M.R.P: <span> &#8377;{prod.mrp}</span>
                      </p>
                      <h4>Offer Price: &#8377; {prod.offerPrize}</h4>
                    </div>
                    <div className={styles.buyNowAndCartBtnDiv}>
                      <button
                        id={styles.cartBtn}
                        // onClick={() => console.log("CartBtn clicked")}
                        onClick={()=>{handleCartBtnClick({productId:prod.id,product:prod})}}
                      >
                        <GiShoppingCart size={30} color="white" />
                      </button>
                      <button
                        id={styles.buyNowBtn}
                        onClick={() => console.log("CartBtn clicked")}
                      >
                        Buy now
                      </button>
                    </div>
                    {alert?<Toster message={alertMessage}/>:null}
                  </div>
                );
              })
            : null}
        </div>
        {ycordinates !== 0 ? <ScrollToTopBtn /> : null}
      </div>
    </div>
  );
};

export default ProductPage;
