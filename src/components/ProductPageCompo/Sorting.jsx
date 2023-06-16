import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSortingState } from "../../redux/pageSortFilterState/actions";

const Sorting = () => {
  const [sortBy, setSortBy] = useState(null);
  const [orderType, setOrderType] = useState(null);

  const dispatch=useDispatch()
  const handleSortingChange = (event) => {
    let sortValue = event.target.value;
    setSortBy(sortValue);
  };
  const handleOrderTypeChange = (event) => {
    let orderValue = event.target.value;
    setOrderType(orderValue);
  };

  useEffect(()=>{
   
   dispatch(updateSortingState({sortBy,orderType}))

  },[sortBy,orderType])

  const handleRemoveOptions=()=>{
    setSortBy(null)
    setOrderType(null)
  }

  return (
    <div>
      <fieldset>
      <legend><h3>Sort By</h3></legend>
      <button onClick={handleRemoveOptions}>Remove</button> <br/>
      <label>
        <input
          type="radio"
          name="offerPrize"
          value={"offerPrize"}
          checked={sortBy === "offerPrize"}
          onChange={handleSortingChange}
        />
        OfferPrize
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="rating"
          value={"rating"}
          checked={sortBy === "rating"}
          onChange={handleSortingChange}
        />
        Rating
      </label>
      <br />
      </fieldset>
      <fieldset>
        <legend><h3>Order type</h3></legend>
        <label>
          <input
            type="radio"
            name="asc"
            value={"asc"}
            checked={orderType === "asc"}
            onChange={handleOrderTypeChange}
          />
          Low to High
        </label>
        <br/>
        <label>
          <input
            type="radio"
            name="desc"
            value={"desc"}
            checked={orderType === "desc"}
            onChange={handleOrderTypeChange}
          />
          High to Low
        </label>
        <br/>
      </fieldset>
    </div>
  );
};

export default Sorting;
