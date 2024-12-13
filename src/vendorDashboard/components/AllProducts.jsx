import React,{useState,useEffect} from 'react';
import { API_URL } from '../data/apiPaths';

const AllProducts = () => {
    const[products,setProducts]=useState([]);

    const productsHandler=async()=>{
        const firmId= localStorage.getItem('firmId');

        try {
            const response= await fetch(`${API_URL}/product/${firmId}/products`);
            const firmProductsData=await response.json();
            setProducts(firmProductsData.products);
            console.log(firmProductsData);

        } catch (error) {
            console.log("Failed to fetch products",error);   
            alert("Failed to fetch products");
        }

    }
    useEffect(()=>{
            productsHandler();
            console.log("this is use effect")
        },[]);

    const deleteProductById=async(productId)=>{
        try {
            const response=await fetch(`${API_URL}/product/remove-product/${productId}`,{
                method:'DELETE'
            });
            if(response.ok){
                productsHandler();
                //The above code is in sync with the database,after fetching the url, the database record is free from that product and it reflects in the front end too
                // Below code depends on just local state regardless of database and is fast and better for small projects
                //setProducts(products.filter(product=>product._id!=productId));
                confirm("Are you sure, want to delete it?");
                alert("Deleted successfully");

            }
        } catch (error) {
            console.log("Failed to delete product");
            alert("Failed to delete product");
        }

    }

  return (
    <div>
        {products.length===0 ? (
           <table className="product-table">
           <thead>
               <tr>
                   <th>Product Name</th>
                   <th>Price</th>
                   <th>Product Image</th>
                   <th>Delete Product</th>
               </tr>
           </thead>
           </table>
        ):
        <table className="product-table">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Product Image</th>
                    <th>Delete Product</th>
                </tr>
            </thead>
            <tbody>
                {products.map((item)=>{
                    console.log(`${API_URL}/uploads/${item.image}`);
                    return(
                        <>
                            <tr key={item._id}>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                                <td>
                                    {item.image && (
                                        <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName}
                                        style={{width:'50px', height:'50px'}} />
                                    )}
                                </td>
                                <td>
                                    <button onClick={()=>deleteProductById(item._id)}>Delete</button>
                                </td>
                            </tr>
                        </>
                    )
                })}
            </tbody>
        </table>


        }
    </div>
  );
}

export default AllProducts