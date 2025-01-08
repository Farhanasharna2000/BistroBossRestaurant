import { Navigate, useLocation } from "react-router-dom";
import UseAdmins from "../Hooks/UseAdmins";
import UseAuth from "../Hooks/UseAuth";

const AdminRoute = ({children}) => {
    const [isAdmin,isAdminPending]=UseAdmins()
    const {user,loading}=UseAuth() 
    const location =useLocation()
    if(loading||isAdminPending){
        return <progress className="progress w-56"></progress>
    }
    if(user && isAdmin){
        return children
    }   
return <Navigate to={'/'} state={{from:location}} replace></Navigate>
};

export default AdminRoute;