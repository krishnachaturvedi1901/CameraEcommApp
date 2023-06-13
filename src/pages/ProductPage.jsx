import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productPageState/actions";
import styles from "../styles/ProductPage.module.css";
import Pagination from "../components/ProductPageCompo/Pagination";
import Filteration from "../components/ProductPageCompo/Filteration";
import Sorting from "../components/ProductPageCompo/Sorting";
import Searching from "../components/ProductPageCompo/Searching";
import { useNavigate, useSearchParams } from "react-router-dom";
import { updatePaginationState } from "../redux/pageSortFilterState/actions";

const ProductPage = () => {

  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [searchParams,setSearchParams]=useSearchParams()


  let { loading, products, totalProducts, error } = useSelector((state) => state.ProductState);
  let paginationState = useSelector((state) => state.PaginationState);
  let sortingState = useSelector((state) => state.SortingState); 
  let searchingState = useSelector((state) => state.SearchingState);
  let filteringState=useSelector((state)=>state.FilteringState)
  
  // console.log("-------->", products, totalProducts);
  // console.log("---->paginationState", paginationState);
  // console.log("---->sortingState", sortingState);
  // console.log("---->searchingState", searchingState);
  // console.log("---->filteringState", filteringState);

  let {_page,_limit}=paginationState
  let {brand,feature}=filteringState
  let {_sort,_order}=sortingState
  let {q}=searchingState

  useEffect(() => {
    dispatch(fetchProducts({...paginationState,...sortingState,...searchingState,...filteringState}));

  }, [paginationState,sortingState,searchingState,filteringState]);

   
  // useEffect(() => {
  //   let page = +searchParams.get("_page");
  //   if (!isNaN(page) && page > 0) {
  //     dispatch(updatePaginationState({ _page: page, _limit:14 }));
  //   }
  // }, [_page, searchParams, dispatch]);

  useEffect(()=>{
       
    const updateUrl=()=>{
      let param= new URLSearchParams(searchParams)
      console.log("****Param*******-",param,_page)
      if(_page){
        param.set("_page",_page)
        param.set("_limit",_limit)
      }

      if(_sort){
        param.set('_sort',_sort)
        param.set('_order',_order)
      }else{
        param.delete("_sort")
        param.delete("_order")
      } 

      if(brand) param.set('brand',brand)
      else param.delete("brand")

      if(feature) param.set('feature',feature)
      else param.delete("feature")

      if(q)param.set("q",q)
      else param.delete("q")
      
      setSearchParams(param.toString())
      
    }
    updateUrl()

  },[paginationState,sortingState,searchingState,filteringState])


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
