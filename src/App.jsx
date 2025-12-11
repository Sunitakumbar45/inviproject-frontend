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

export default function App(){
  const{isloggedIn,handleLogout}=useContext(UserContext);
  return(
      <div>
      <h2>Invitation Card printing App</h2>
      <ul>
        <li><Link to="/">    Home  </Link></li>
        {isloggedIn &&(
          <>
          <li><Link to="/dashboard"> Dashboard </Link></li>
          <li><Link to="/account"> Account </Link></li>
          <li><button onClick={handleLogout}>logout</button></li>
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
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/account" element={<Account/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/register" element={<Registration/>}/>
      </Routes>
      </div>
      )
    }














