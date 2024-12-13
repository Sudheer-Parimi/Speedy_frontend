import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
    
    <div className="not-found">
        <Link to='/' style={{fontSize:'1.5rem', color:'darkgreen'}}>
            Go back to homepage
        </Link>
        <h1>404</h1>
        <div>Page not found</div>
    </div>
    </>
  )
}

export default NotFound