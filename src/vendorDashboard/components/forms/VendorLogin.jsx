import React,{useState} from 'react';
import { API_URL } from '../../data/apiPaths';

const VendorLogin = () => {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

  const loginHandler=async(e)=>{
    e.preventDefault();
    try {
      const response= await fetch(`${API_URL}/vendor/login`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({email,password})
      });
      const data= await response.json();

      if(response.ok){
        alert("Vendor login successful");

        setEmail("");
        setPassword("");
        // creates a key (loginToken) with value data.token which comes from backend(data)
        localStorage.setItem('loginToken',data.token);
      }
      const vendorId=data.vendorId;
      const vendorResponse= await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
      const vendorData= await vendorResponse.json();
      if(vendorResponse.ok){
        const vendorFirmId= vendorData.vendorFirmId;
        console.log("checking for vendor firm Id,", vendorFirmId);

        const vendorFirmName= vendorData.firmName;
        console.log('Your firm name is',vendorFirmName);
        
        localStorage.setItem('firmId',vendorFirmId);
        localStorage.setItem('firmName',vendorFirmName);
        window.location.reload();
      }
      
    } catch (error) {
      alert("Login failed");
      console.log(error);
    }
  }
  return (
    <div className="loginSection">
      <form className='authForm' onSubmit={loginHandler}>
        <h3>Vendor Login</h3>
        <label>Email</label>
        <input type="text" name="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email here"></input><br/>
        <label>Password</label>
        <input type="password" name="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter password"></input><br/>
        <div className="btnSubmit">
          <button>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default VendorLogin;