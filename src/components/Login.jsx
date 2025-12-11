import {useFormik} from "formik";
import UserContext from "../context/UserContext";
import { useContext } from "react";
export default function Registration(){
    const{handleLogin,serverErrors}=useContext(UserContext);
    
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
            {serverErrors && <p style={{color:'red'}}>{serverErrors}</p>}
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
                <div>
                    <input
                    type="text"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="enter a password"
                    />
                </div>
               <div>
                <input type="submit" value="login"/>
                </div>
            </form>
            
        </div>
    )
}















