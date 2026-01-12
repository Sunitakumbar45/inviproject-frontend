import { useEffect, useReducer } from "react";
import UserContext from "../context/UserContext";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
const userReducer=(state,action)=>{
    switch(action.type){
        case "LOGIN":{
            return {...state,isloggedIn:true,user:action.payload}
        }
        case "LOGOUT":{
            return{...state,isloggedIn:false,user:null}
        }
        case "SET_SERVER_ERRORS":{
            return{...state,serverErrors:action.payload}
        }
        case "CLEAR_SERVER_ERRORS": {
           return { ...state, serverErrors: "" };
        }

        default:{
            return{...state}
        }
    }
}

export default function AuthProvider(props){
    const navigate=useNavigate();
    const[userstate,userDispatch]=useReducer(userReducer,{
        user:null,
        isloggedIn:false,
        serverErrors:''
    });


    useEffect(()=>{
        if(localStorage.getItem('token')){
            const fetchUser=async()=>{
                try{
                    const response=await axios.get('/user/account',{headers:{Authorization:localStorage.getItem('token')}});
                    userDispatch({type:"LOGIN",payload:response.data});
                }catch(err){
                    alert(err.message);
                }

            }
            fetchUser();
        }
    },[])

    const handleRegister=async(formData,resetForm)=>{
       userDispatch({ type: "CLEAR_SERVER_ERRORS" });
        try{
            const response=await axios.post('/user/register',formData);
            console.log(response.data);
            alert("succesfully register");
            resetForm();
            userDispatch({type:"SET_SERVER_ERRORS",payload:''})
           
            navigate('/login');
        }catch(err){
            console.log(err.message.data);
            userDispatch({type:"SET_SERVER_ERRORS",payload:err.response.data.error});
        }
     }

     const handleLogin=async(formData,resetForm)=>{
      userDispatch({ type: "CLEAR_SERVER_ERRORS" });
        try{
            const response=await axios.post('/user/login',formData);
            
            localStorage.setItem('token',response.data.token);
            const userResponse=await axios.get('/user/account',{headers :{Authorization:localStorage.getItem('token')}});
            
            
           
            resetForm();
            alert("successfully login");
            
            userDispatch({type:"LOGIN",payload:userResponse.data})
            
            
const loggedInUser = userResponse.data;

userDispatch({ type: "LOGIN", payload: loggedInUser });

if (loggedInUser.role === "admin") {
  navigate("/admin/dashboard");
} else {
  navigate("/customer/dashboard");
}

            

            
        }catch(err){
            
            userDispatch({type:"SET_SERVER_ERRORS",payload:err.response.data.error});
        }
     }
    const handleLogout=()=>{
        localStorage.removeItem('token');
        userDispatch({type: 'LOGOUT'})
        navigate('/');
    }
    
    return(
        <UserContext.Provider value={{...userstate,handleRegister,userDispatch,handleLogin,handleLogout}}>
            {props.children}
        </UserContext.Provider>
        
    )
}  




