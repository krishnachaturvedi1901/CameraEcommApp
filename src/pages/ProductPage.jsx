import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productPageState/actions";
import styles from "../styles/ProductPage.module.css";
import Pagination from "../components/ProductPageCompo/Pagination";
import Filteration from "../components/ProductPageCompo/Filteration";
import Sorting from "../components/ProductPageCompo/Sorting";
import Searching from "../components/ProductPageCompo/Searching";
import { useNavigate, useSearchParams } from "react-router-dom";

const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [searchParams,setSearchParams]=useSearchParams()
  let { loading, products, totalProducts, error } = useSelector((state) => state.ProductState);
  let paginationState = useSelector((state) => state.PaginationState);
  let sortingState = useSelector((state) => state.SortingState); 
  let searchingState = useSelector((state) => state.SearchingState);
  let filteringState=useSelector((state)=>state.FilteringState)

  let {brand,feature}=filteringState
  console.log("-------->", products, totalProducts);
  console.log("---->paginationState", paginationState);
  console.log("---->sortingState", sortingState);
  console.log("---->searchingState", searchingState);
  console.log("---->filteringState", filteringState);

 const obj={
  sort:null,
  loot:null
 }
 console.log("testing-",obj)
 console.log("testing loot -", obj.loot)
 if(obj)  console.log("testing-",obj)
if(obj.loot) console.log("testing loot -", obj.loot)



  useEffect(() => {
    dispatch(fetchProducts(paginationState));
  }, []);

  useEffect(() => {
    dispatch(fetchProducts({...paginationState,...sortingState,...searchingState,...filteringState}));
  }, [paginationState,sortingState,searchingState,filteringState]);

  useEffect(()=>{
    if(brand && feature && sortingState._sort ){
      setSearchParams({...paginationState,...filteringState,...sortingState})
    }
    else if(brand && feature ){
      setSearchParams({...paginationState,...filteringState})
    }
    else if(sortingState._sort){
      setSearchParams({...paginationState,...sortingState})
    }
    else if(brand){
      setSearchParams({...paginationState,brand})
    }
    else if(feature){
      setSearchParams({...paginationState,feature})
    }
    else if(paginationState){
      setSearchParams(paginationState)
    }
    
  },[paginationState,sortingState,searchingState,filteringState])

console.log("searchParam-->",searchParams)

  if (loading) {
    return <h2>Loading ...</h2>;
  } else if (error) {
    return <h2>Error while fetch ! Referesh</h2>;
  }

  return (
    <div className={styles.productPageMainDiv} >
      <div className={styles.sortingFilterDiv} >
        <Filteration/>
        <hr/>
        <Sorting/>
      </div>
      <div className={styles.productsPageSearchDiv}>
        <Searching/>
        <Pagination totalProducts={totalProducts} />
        <p>Total Products:<span>{totalProducts}</span></p>
        <div className={styles.productsDiv}>
          {products
            ? products.map((prod) => {
                return (
                  <div className={styles.oneProductDiv} onClick={()=>navigate(`/productDetail/${prod.id}`)} >
                    <h3>{prod.brand}</h3>
                    <img src={prod.img_url} />
                    <h4>{prod.productName}</h4>
                    <p>
                      M.R.P: <span>{prod.mrp}</span>
                    </p>
                    <h4>Offer Price: {prod.offerPrize}</h4>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
