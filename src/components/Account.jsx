import { useContext } from "react"
import UserContext from "../context/UserContext"

export default function Account(){
    const{user}=useContext(UserContext);
    if(!user){
        return <p>loading...</p>
    }
    return(
        <div>
            <h2>Account</h2>
            <p>name -{user.name}</p>
            <p>email-{user.email}</p>
            <p>role-{user.role}</p>
           
        </div>
    )
}