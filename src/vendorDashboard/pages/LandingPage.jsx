import React,{useState,useEffect} from 'react';
import NavBar from '../components/NavBar';
import Sidebar from '../components/SideBar';
import VendorLogin from '../components/forms/VendorLogin';
import VendorRegister from '../components/forms/VendorRegister';
import AddFirm from '../components/forms/AddFirm';
import AddProduct from '../components/forms/AddProduct';
import AllProducts from '../components/AllProducts';

const LandingPage = () => {
  const[showLogin,setShowLogin]= useState(false);
  const[showRegister,setShowRegister]= useState(false);
  const[showLogOut,setShowLogOut]=useState(false);
  const[showFirm,setShowFirm]=useState(false);
  const[showProduct,setShowProduct]=useState(false);
  const[showAllProducts,setShowAllProducts]=useState(false);
  const[showFirmTitle,setShowFirmTitle]=useState(true);

  useEffect(()=>{
    const loginToken=localStorage.getItem('loginToken');
    if(loginToken){
      setShowLogOut(true);
    }
  },[]);

  useEffect(()=>{
    const firmName=localStorage.getItem('firmName');
    if(firmName){
      setShowFirmTitle(false);
    }
  })

  const logOutHandler=()=>{
    if(confirm("Are you sure, want to logout?")){
      localStorage.removeItem('loginToken');
      localStorage.removeItem('firmId');
      localStorage.removeItem('firmName');

      setShowLogOut(false);
      setShowFirmTitle(true);
    }
  }

  const showLoginHandler=()=>{
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowAllProducts(false);
    
  }
  const showRegisterHandler=()=>{
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowAllProducts(false);
    
  }
  const showFirmHandler=()=>{
    if(showLogOut){
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(true);
      setShowProduct(false);
      setShowAllProducts(false);
    }
    else{
      alert("Please login to Add firm");
      setShowLogin(true);
    }
    
  }
  const showProductHandler=()=>{
    if(showLogOut){
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(false);
      setShowProduct(true);
      setShowAllProducts(false);
    }
    else{
      alert("please login to Add Products.");
      setShowLogin(true);
    }
    
  }
  const showAllProductsHandler=()=>{
    if(showLogOut){
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(false);
      setShowProduct(false);
      setShowAllProducts(true);
    }
    else{
      alert("Please login to show products.");
      setShowLogin(true);
    }
  }
  

  return (
    <>
      <section className="landingSection">
        <NavBar showRegisterHandler={showRegisterHandler} showLoginHandler={showLoginHandler}
        showLogOut={showLogOut} logOutHandler={logOutHandler}/>
        <div className="collectionSection">
          <Sidebar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler}
          showAllProductsHandler={showAllProductsHandler} showFirmTitle={showFirmTitle}/>
          {showLogin && <VendorLogin />}
          {showRegister && <VendorRegister showLoginHandler={showLoginHandler}/>}
          {showFirm && showLogOut && <AddFirm/>}
          {showProduct && showLogOut && <AddProduct/>}
          {showAllProducts && showLogOut && <AllProducts/>}
        </div>
        
      </section>
    </>
  )
}

export default LandingPage