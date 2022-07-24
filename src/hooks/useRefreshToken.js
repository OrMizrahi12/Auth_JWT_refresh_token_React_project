
import { useContext } from 'react';
import axios from '../api/axios';
import { AppContext } from '../context/context';

// #8 
// so, the user is logged in and got token,
// after that he start to browse the site..
// NOW, for continu browse in the site, 
// we need send new request for geeting the new acsses token!

const useRefreshToken = () => {

    // #9 we import setAuth for set the global state with the new access token
    const { setAuth } = useContext(AppContext);

    const refresh = async () => {

        // #10 we send a new request
        const response = await axios.get('/refresh', {
            withCredentials: true
        });

        // #11 we set the setAuth and change the the old access token with the new access token!
        setAuth(prev => {

            return {
                ...prev,
                roles: response.data.roles, accessToken:
                response.data.accessToken
            }
        });
         
        // #12 becuse its not enough only set the new access token (in #11), 
        // the function refresh must return the new access token -->
        // for DO A NEW request for get pemision agein! 
        return response.data.accessToken;

    }

    // #13 after that, WE MUST return the refresh function
    return refresh;
};

// for #14 go to axios.js --> 
export default useRefreshToken;

