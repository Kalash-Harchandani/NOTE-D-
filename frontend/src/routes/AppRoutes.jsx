import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "../components/Login.jsx";
import Signup from "../components/Signup.jsx"


const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path = "/login" element={<Login/>}/>
            <Route path = "/signup" element={<Signup/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
