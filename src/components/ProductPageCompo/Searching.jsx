import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateSearchingState } from '../../redux/pageSortFilterState/actions'

const Searching = () => {
  const [querySearch,setQuerySearch]=useState(null)
  const dispatch =useDispatch()

  const handleQuerySearch=(event)=>{
     let queryValue=event.target.value
     setQuerySearch(queryValue)
  }
  useEffect(()=>{
    dispatch(updateSearchingState({querySearch}))
  },[querySearch])

  return (
    <div>
      <input type='text' name='search' placeholder='Search by name...' value={querySearch} onChange={handleQuerySearch} />
    </div>
  )
}

export default Searching