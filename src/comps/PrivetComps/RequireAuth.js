import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../../context/context";

// #5 this function is geeting the roles_list that can to log in some page
const RequireAuth = ({ allowedRoles }) => {

    // #6 the auth is contain the user data that logged in
    const { auth } = useContext(AppContext);
    const location = useLocation();
   
    return (
        
        // #7 we comper if there is the apropirate roles to the user
        auth?.roles?.find(role => allowedRoles?.includes(role))
        // if yes, we open for him all the option that he can see -->
        ? <Outlet />
        : auth?.user
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}
// for #8, go to useRefreshToken.js --> 
export default RequireAuth;