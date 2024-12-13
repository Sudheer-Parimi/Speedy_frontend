import React from 'react'

const NavBar = ({showRegisterHandler,showLoginHandler,logOutHandler,showLogOut}) => {

  const firmName=localStorage.getItem('firmName');
  return (
    <div className="navSection">
      <div className="company">Vendor Dashboard</div>
      <div>
        Your Firm: {firmName}
      </div>
      <div className="userAuth">
        {!showLogOut ? 
          <>
          <span onClick= {showLoginHandler}>Login/</span>
          <span onClick= {showRegisterHandler}>Register</span>
          </> :
          <span onClick={logOutHandler}>Logout</span>
        }
      </div>
    </div>
  )

}

export default NavBar