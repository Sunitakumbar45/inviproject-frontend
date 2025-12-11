import {useFormik} from "formik";
import UserContext from "../context/UserContext";
import { useContext } from "react";
export default function Registration(){
    const {handleRegister,serverErrors}=useContext(UserContext);
    const formik=useFormik({
        initialValues:{
            name:'',
            email:'',
            password:'',
            phone:'',
            role:"customer"
        },
        
        
        onSubmit:(values,{resetForm})=>{
            console.log('formdata',values);
            handleRegister(values,resetForm);
            // resetForm();
        }
    });
    return(
        <div>
            <h2>register with us</h2>
            {serverErrors && <p style={{color:'red'}}>{serverErrors}</p>}
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    placeholder="enter a name"
                    />
                </div>
                
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
                    <input
                    type="text"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    placeholder="enter a phone"
                    />
                </div>
                <select
                 name="role"
                 value={formik.values.role}
                 onChange={formik.handleChange} >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
                </select>
                <div>
                <input type="submit" value="register"/>
                </div>
            </form>
            
        </div>
    )
}















