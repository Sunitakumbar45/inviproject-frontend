import "./App.css";
import Home from "./components/Home";
import Account from "./components/Account";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Registration from "./components/Registration";
import {Routes,Route, Link}from "react-router-dom";
import { useContext } from "react";
import UserContext from "./context/UserContext";
import AdminDashboard from "./components/AdminDashboard";
import CustomerDashboard from "./components/CustomerDashboard";
import AdminDesigns from "./pages/admin/AdminDesigns";

import UserDesigns from "./components/UserDesigns";
import AdminCreateDesign from "./components/AdminCreateDesign";

import DesignDetails from "./components/DesignDetails";



export default function App(){
  const{isloggedIn,handleLogout,user}=useContext(UserContext);   
  return(
      <div className="app-container">
      <h2>Invitation Card printing </h2>
      <ul>
        <li><Link to="/">    Home  </Link></li>
        {isloggedIn && user?.role === "admin" && (
          <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
          )}
        {isloggedIn && user?.role === "customer" && (
          <li><Link to="/customer/dashboard">Customer Dashboard</Link></li>
          )}

        {isloggedIn &&(
          <>
          
          <li><Link to="/account"> Account </Link></li>
          
          
          </>
        )}

        
          
        {!isloggedIn&&(
            <>
          <li><Link to="/login"> Login </Link><br/></li>
          <li><Link to ="/register"> Registration </Link></li>
            </>
          )}
          </ul>
   
      <Routes>
      <Route path="/" element={<Home/>}/>
      
      <Route path="/account" element={<Account/>}/>
      <Route path="/login" element={<Login/>}/>
      
      <Route path="/register" element={<Registration/>}/>
      <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
      <Route path="/customer/dashboard" element={<CustomerDashboard/>}/> 
      <Route path="/admin/designs" element={<AdminDesigns/>}/>
      <Route path="/user/designs" element={<UserDesigns/>}/>
      <Route path="/admin/create-design" element={<AdminCreateDesign/>}/>
      
      <Route path="/design/:id" element={<DesignDetails/>}/>
      <Route path="/admin/edit-design/:id" element={<AdminCreateDesign />} /> 

      </Routes>
      {isloggedIn && (
        <div className="logout-footer">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
      





