import React,{useState} from 'react';
import {API_URL} from "../../data/apiPaths.js"

const VendorRegister = ({showLoginHandler}) => {
  const[username,setUsername]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[error,setError]=useState("");
  const[loading,setLoading]=useState("");

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response= await fetch(`${API_URL}/vendor/register`,{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify({username,email,password})
    })
    const data= await response.json();
    if(response.ok){
      console.log(data);
      setUsername("");
      setEmail("");
      setPassword("");
      alert("Vendor registration successful");
      showLoginHandler();
    }
      
    } catch (error) {
      console.log(error);
      alert("Registration failed");
      
    }
  }

  return (
    <div className='registerSection' >
        <form className='authForm' onSubmitCapture={handleSubmit}>
        <h3>Vendor Register</h3>
        <label>Username</label>
        <input type="text" name="username" value={username} onChange={e=>setUsername(e.currentTarget.value)} placeholder="Username must be unique"></input><br/>
        <label>Email</label>
        <input type="text" name="email" value={email} onChange={e=>setEmail(e.currentTarget.value)} placeholder="Enter your email here"></input><br/>
        <label>Password</label>
        <input type="password" name="password" value={password} onChange={e=>setPassword(e.currentTarget.value)} placeholder="Enter password"></input><br/>
        <div className="btnSubmit">
          <button>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default VendorRegister