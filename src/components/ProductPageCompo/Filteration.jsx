import React, { useEffect, useState } from "react";
import styles from '../../styles/ProductPage.module.css'
import { useDispatch } from "react-redux";
import { handleFilterByBrand, handleFilterByFeature } from "../../redux/pageSortFilterState/actions";

const Filteration = () => {
  const dispatch =useDispatch()
  const [selectedBrand,setSelectedBrand]=useState(null)
  const [selectedFeature,setSelectedFeature]=useState(null)
  const [selectedModel,setSelectedModel]=useState([])
  const [selectedBattery,setSelectedBattery]=useState([])
  const [selectedLenstype,setSelectedLenstype]=useState([])

  const handleBrandChange = (event) => {
    const selectedBrandArr = [...event.target.options]
      .filter((option) => option.selected)
      .map((option) => option.value);
    selectedBrandArr.length!==0?setSelectedBrand(selectedBrandArr):setSelectedBrand(null)
  };
  const handleFeatureChange=(event)=>{
    const selectedFeatureArr=Array.from(event.target.options)
    .filter((option)=>option.selected)
    .map((option)=>option.value)
    selectedFeatureArr.length!==0? setSelectedFeature(selectedFeatureArr):setSelectedFeature(null)
  }
  const handleModelChange=(event)=>{
    const selectedModelArr=[...event.target.options]
    .filter((option)=>option.selected)
    .map((option)=>option.value)
    setSelectedModel(selectedModelArr)
  }
  const handleBatteryChange=(event)=>{
    const selectedBatteryArr=Array.from(event.target.options)
    .filter((option)=>option.selected)
    .map((option)=>option.value)
    setSelectedBattery(selectedBatteryArr)
  }
  const handleLenstypeChange=(event)=>{
    const selectedLenstypeArr=Array.from(event.target.options)
    .filter((option)=>option.selected)
    .map((option)=>option.value)
    setSelectedLenstype(selectedLenstypeArr)
  }
  
  console.log("brand->",selectedBrand)
  console.log("feature->",selectedFeature)
  console.log("battery->",selectedBattery)


  useEffect(()=>{
    dispatch(handleFilterByBrand(selectedBrand))
  },[selectedBrand])

  useEffect(()=>{
    dispatch(handleFilterByFeature(selectedFeature))
  },[selectedFeature])


  return (
    <div>
      <h3>Filter By</h3>
      <div>
        <label htmlFor="brand">Brand</label><br/>
        <select
          id="brand"
          multiple
          value={selectedBrand}
          onChange={handleBrandChange}
        >
          <option value="Nikon">Nikon</option>
          <option value="Sony">Sony</option>
          <option value="Canon">Canon</option>
          <option value="Gopro">Gopro</option>
        </select>
        <p>Selected Brand: {selectedBrand===[]?selectedBrand.join(", "):null}</p>
      </div>
      <div>
        <label htmlFor="feature">Feature</label><br/>
        <select
          id="feature"
          multiple
          value={selectedFeature}
          onChange={handleFeatureChange}
        >
          <option value="WiFi">WiFI</option>
          <option value="HDR">HDR</option>
          <option value="4k Recording">4k Recording</option>
        </select>
        <p>Selected Feature: { selectedFeature===[]? selectedFeature.join(", "):null}</p>
      </div>
      <div>
        <label htmlFor="model">Model</label><br/>
        <select
          id="model"
          multiple
          value={selectedModel}
          onChange={handleModelChange}
        >
          <option value="D7500">D7500</option>
          <option value="D5600">D5600</option>
          <option value="ZV-1">ZV-1</option>
          <option value="D3500">D3500</option>
          <option value="Y3510">Y3510</option>
        </select>
        <p>Selected Model: {selectedModel.join(", ")}</p>
      </div>
      <div>
        <label htmlFor="battery">Battery</label><br/>
        <select
          id="battery"
          multiple
          value={selectedBattery}
          onChange={handleBatteryChange}
        >
          <option value="Lithium ion (Li-ion)">Lithium ion (Li-ion)</option>
          <option value="Alkaline Battery">Alkaline Battery</option>
          <option value="Sodium Battery">Sodium Battery</option>
        </select>
        <p>Selected Battery: {selectedBattery.join(", ")}</p>
      </div>
      <div>
        <label htmlFor="lenstype">Lenstype</label><br/>
        <select
          id="lenstype"
          multiple
          value={selectedLenstype}
          onChange={handleLenstypeChange}
        >
          <option value="Standard">Standard</option>
          <option value="Prime">Prime</option>
        </select>
        <p>Selected Lenstype: {selectedLenstype.join(", ")}</p>
      </div>
    </div>
  );
};

export default Filteration;
