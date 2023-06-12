import React, { useEffect, useState } from 'react'
import styles from "../../styles/ProductPage.module.css"
import { useDispatch } from 'react-redux'
import { updatePaginationState } from '../../redux/pageSortFilterState/actions'

const Pagination = ({totalProducts}) => {
    const [pageCount,setPageCount]=useState(1)
    const dispatch =useDispatch()
    const perPage=11
    const lastPage=Math.ceil(totalProducts/perPage)
    
    useEffect(()=>{
       dispatch(updatePaginationState({pageCount,perPage}))
    },[pageCount])

  return (
    <div className={styles.paginationDiv} >
        <button onClick={()=>setPageCount(pageCount-1)} disabled={pageCount===1} >-</button>
        <h3>{pageCount}</h3>
        <button onClick={()=>setPageCount(pageCount+1)} disabled={pageCount===lastPage} >+</button>
    </div>
  )
}

export default Pagination