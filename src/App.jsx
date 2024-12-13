import React from 'react'
import LandingPage from './vendorDashboard/pages/LandingPage';
import {Routes,Route} from 'react-router-dom';

import "./App.css";
import Sidebar from './vendorDashboard/components/SideBar';
import NotFound from './vendorDashboard/components/forms/NotFound';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/*" element={<NotFound/>}></Route>
      </Routes>
    </div>
  )
}

export default App;