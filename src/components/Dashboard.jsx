import { useContext } from "react"
import UserContext from "../context/UserContext"

export default function Dashboard(){
    const{user}=useContext(UserContext);
    if(!user){
        return <p>loading...</p>
    }

    return(
        <div>
            <h2>Dashboard page</h2>  
            <p>welcome ,{user?.name}</p>
            
        </div>
    )
}