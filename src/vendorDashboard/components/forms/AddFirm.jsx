import React, { useState } from 'react';
import { API_URL } from '../../data/apiPaths';



const AddFirm = () => {

  const[firmName,setFirmName]=useState("");
  const[area,setArea]= useState("");
  const[category,setCategory]=useState([]);
  const[dishType,setDishType]=useState([]);
  const[offer,setOffer]=useState("");
  const[file,setFile]=useState(null);

  const handleCategoryChange=(event)=>{
    const value= event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item!==value));
    }
    else{
      setCategory([...category,value]);
    }
  }
  const handleImageUpload=(event)=>{
    const selectedImage=event.target.files[0];
    setFile(selectedImage);
  }
  const handleDishTypeChange=(event)=>{
    const value=event.target.value;
    if(dishType.includes(value)){
      setDishType(dishType.filter((item)=>item!==value));
    }
    else{
      setDishType([...dishType,value]);
    }
  }
  const handleFirmSubmit= async(e)=>{
    e.preventDefault();
    if (!firmName || !area) {
      alert('Please fill out all required fields (Firm Name, Area)');
      return;
    }
    try {
      const loginToken=  localStorage.getItem('loginToken');
      if(!loginToken){
        console.log("User not authenticated by token");
      }

      const formData= new FormData();
        formData.append('firmName',firmName);
        formData.append('area',area);
        formData.append('offer',offer);
        formData.append('image',file);

        category.forEach(value=>{
          formData.append('category',value);
        });
        dishType.forEach(value=>{
          formData.append('dishType',value);
        });
      const response= await fetch(`${API_URL}/firm/add-firm`,{
        method:'POST',
        headers:{
          'token':`${loginToken}`
        },
        body:formData
      });
      const data = await response.json();
      if(response.ok){
        console.log(data);
        setFirmName("");
        setArea("");
        setOffer("");
        setCategory([]);
        setDishType([]);
        setFile(null);
        alert("Firm added successfully");

      }
      else if(data.message="Vendor can have only one firm"){
        alert("Firm already exists.Only one firm/user is allowed");
      }
      else{
        alert("failed to add firm");
      }
        console.log("This is firm Id coming from backend",data.firmId);
        const firmId= data.firmId;
        localStorage.setItem('firmId',firmId);
      }
     catch (error) {
      console.log(error);
      alert("Failed to add firm");
    }
  }

  return (
    <div className='firmSection'>
        <form className="firmForm" onSubmit={handleFirmSubmit}>
            <h3>Add New Firm</h3>
            <label>Firm Name</label>
            <input type="text" name="firmName" value={firmName} onChange={(e)=>setFirmName(e.target.value)}/>
            <label>Loacted Area</label>
            <input type="text" name="area" value={area} onChange={(e)=>setArea(e.target.value)}/>
            <div className="categorySection">
              <label>Category:</label>
              <div className="checkboxSection">
                <label>
                  <input type="checkbox" name="category" value='veg' checked={category.includes('veg')} onChange={handleCategoryChange} /> Veg
                </label>
                <label>
                  <input type="checkbox" name="category" value='non-veg' checked={category.includes('non-veg')} onChange={handleCategoryChange} /> Non-Veg
                </label>
              </div>
            </div>

            <div className="dishTypeSection">
              <label>Dish Type:</label>
              <div className="checkboxSection">
                <label>
                  <input type="checkbox" name="dishType" checked={dishType.includes('south-indian')} onChange={handleDishTypeChange} value="south-indian"/> South-Indian
                </label>
                <label>
                  <input type="checkbox" name="dishType" checked={dishType.includes('north-indian')} onChange={handleDishTypeChange}  value="north-indian"/> North-Indian
                </label>
                <label>
                  <input type="checkbox" name="dishType" checked={dishType.includes('chineese')} onChange={handleDishTypeChange} value="chineese"/> Chineese
                </label>
                <label>
                  <input type="checkbox" name="dishType" checked={dishType.includes('desserts')} onChange={handleDishTypeChange} value="desserts"/> Desserts
                </label>
              </div>
            </div>
            <label>Offers available</label>
            <input type="text" name="offer" value={offer} onChange={e=>setOffer(e.target.value)}/>
            <label>Firm Image</label>
            <input type="file" onChange={handleImageUpload}/>
            <br/>
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>

        </form>
    </div>
  )
}

export default AddFirm