import React,{useState} from 'react';
import { API_URL } from '../../data/apiPaths';


const AddProduct = () => {
  const[productName,setProductName]=useState("");
  const[price,setPrice]=useState("");
  const[category,setCategory]=useState([]);
  const[bestSeller,setBestSeller]=useState(false);
  const[description,setDescription]=useState("");
  const[image,setImage]=useState(null);

  const handleCategoryChange=(event)=>{
    const value= event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item!==value));
    }
    else{
      setCategory([...category,value]);
    }
  } 
  const handleBestSellerChange=async(e)=>{
    const value=e.target.value==='true';
    setBestSeller(value);
  }
  const handleImageUpload=(event)=>{
    const selectedImage=event.target.files[0];
    setImage(selectedImage);
  }
  const handleAddProduct=async(e)=>{
    e.preventDefault();
    try {
      const loginToken=localStorage.getItem('loginToken');
      const firmId=localStorage.getItem('firmId');

      if(!loginToken || !firmId){
        console.log("user not authenticated");}

        const formData= new FormData();
        formData.append('productName',productName);
        formData.append('price',price);
        formData.append('description',description);
        formData.append('image',image);

        category.forEach(value=>{
          formData.append('category',value);
        });
        
        const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
          method:'POST',
          body:formData
        });

        const data = await response.json();

        if(response.ok){
          console.log("Product added");
          setProductName("");
          setPrice("");
          setCategory([]);
          setDescription("");
          setBestSeller(false);
          setImage(null);
          alert("Product added successfully");
        }
      }
    catch (error) {
      console.log(error);
      alert("Failed to add product");
    
    }
  }
  return (
    <div className="productSection">
        <form className="firmForm" onSubmit={handleAddProduct}>
            <h3>Add New Product</h3>
            <label>Product Name</label>
            <input type="text" name="productName" value={productName} onChange={e=>setProductName(e.target.value)}></input>
            <label>Price</label>
            <input type="text" name="price" value={price} onChange={e=>setPrice(e.target.value)}></input>
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
            <div className="categorySection">
              <label>Bestseller:</label>
              <div className="checkboxSection">
                <label>
                  <input type="radio" name="bestSeller" value='true' checked={bestSeller===true} onChange={handleBestSellerChange} /> Yes
                </label>
                <label>
                  <input type="radio" name="bestSeller" value='false' checked={bestSeller===false} onChange={handleBestSellerChange} /> No
                </label>
              </div>
            </div>
            <label>Description</label>
            <input type="text" name="description" value={description} onChange={e=>setDescription(e.target.value)}></input>
            <label>Product Image</label>
            <input type="file" onChange={handleImageUpload}></input>
            <br/>
            <div className="btnSubmit">
                <button type="submit">Submit</button>
            </div>

        </form>
 
    </div>
  )
}

export default AddProduct