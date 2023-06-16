import React, { useEffect, useState } from "react";
import styles from "../../styles/ProductPage.module.css";
import { useDispatch } from "react-redux";
import { updatePaginationState } from "../../redux/pageSortFilterState/actions";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalProducts }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  let number = checkValidUrl(+searchParams.get("_page"));
  const [pageCount, setPageCount] = useState(number);
  const dispatch = useDispatch();
  const perPage = 11;
  const lastPage = Math.ceil(totalProducts / perPage);

  useEffect(() => {
    if (isNaN(pageCount) || isNaN(perPage) || pageCount < 1 || perPage < 1) {
      dispatch(updatePaginationState({ pageCount: 1, perPage: 12 }));
      return;
    }
    dispatch(updatePaginationState({ pageCount, perPage }));
  }, [pageCount, searchParams]);

  function checkValidUrl(num) {
    let no = num;
    if (isNaN(no) || no < 1) {
      no = 1;
    } else if (!no) {
      no = 1;
    }
    return no;
  }

  return (
    <div className={styles.paginationDiv}>
      <button
        onClick={() => setPageCount(pageCount - 1)}
        disabled={pageCount === 1}
      >
        -
      </button>
      <h3>{pageCount}</h3>
      <button
        onClick={() => setPageCount(pageCount + 1)}
        disabled={pageCount === lastPage}
      >
        +
      </button>
    </div>
  );
};

export default Pagination;

// useEffect(()=>{
//   const fetchModifiedUrl=()=>{
//     let {_page,_limit}=Object.fromEntries(searchParams)
//     const page=+_page
//     const limit=+_limit

//     console.log("000000-",page,"111111111-",limit)

//     if(isNaN(page)||isNaN(limit)||page<1||limit<1){
//       console.log("iam in if")
//       dispatch(updatePaginationState({pageCount,perPage}))
//     }
//     else{
//       console.log("iam in else")
//       dispatch(updatePaginationState({pageCount:page,perPage:limit}))
//     }
//   }
//   fetchModifiedUrl()

// },[searchParams])
