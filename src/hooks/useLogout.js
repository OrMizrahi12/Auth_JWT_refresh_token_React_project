import { useContext } from "react";
import axios from "../api/axios";
import { AppContext } from "../context/context";

const useLogout = () => {
    
    const { setAuth } = useContext(AppContext);

     const logout = async () => {
        setAuth({});
        try {
            const response = await axios('/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout