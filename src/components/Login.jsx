import {useFormik} from "formik";
import UserContext from "../context/UserContext";
import { useContext } from "react";
import { useState } from "react";
export default function Registration(){
    const{handleLogin,serverErrors}=useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);

    
    const formik=useFormik({
        initialValues:{
            email:'',
            password:'',
            
        },
        
        
        onSubmit:(values,{resetForm})=>{
            console.log('formdata',values);
            handleLogin(values,resetForm);
           
        }
    });
    return(
        <div>
            <h2>login  with us</h2>
            {/* {serverErrors && <p style={{color:'red'}}>{serverErrors}</p>} */}
            {Array.isArray(serverErrors) ? (
  serverErrors.map((err, i) => (
    <p key={i} style={{ color: "red" }}>{err.message}</p>
  ))
) : (
  serverErrors && <p style={{ color: "red" }}>{serverErrors}</p>
)}

            <form onSubmit={formik.handleSubmit}>
                
                
                <div>
                    <input
                    type="text"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="enter a email"
                    />
                </div>
                {/* <div>
                    <input
                    type="text"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="enter a password"
                    />
                </div> */}


                <div style={{ position: "relative" }}>
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    value={formik.values.password}
    onChange={formik.handleChange}
    placeholder="Enter password"
    autoComplete="new-password"
    style={{ paddingRight: "40px" }}
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#fff"
    }}
  >
    {showPassword ? "🙈" : "👁️"}
  </span>
</div>

               <div>
                <input type="submit" value="login"/>
                </div>
            </form>
            
        </div>
    )
}


