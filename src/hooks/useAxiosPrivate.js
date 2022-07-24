
// #15 we import axiosPrivate that we created now
import { axiosPrivate } from "../api/axios";
import { useContext, useEffect } from "react";

// #16 we import useRefreshToken
import useRefreshToken from "./useRefreshToken";

// #17 we import AppContext
import { AppContext } from "../context/context";


const useAxiosPrivate = () => {

    // #18 we defind the refresh function from useRefreshToken
    const refresh = useRefreshToken();

    // #19 we defind auth for use the user data
    const { auth } = useContext(AppContext);

    useEffect(() => {

        // #22 we create inerseptor for follow after the request event
        const requestIntercept = axiosPrivate.interceptors.request.use(


            config => {

                // we create function the will check if there is Authorization in the headers
                if (!config.headers['Authorization']) {

                    // if not we pass the token to the headers
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }

                // we return the config
                return config;

            }, (error) => Promise.reject(error)
        );

        // #20 we create inerseptor for follow after the response event
        // 1) axiosPrivate is the object we created in axios.js 
        // 2) interceptors.response for foollow after response event
        const responseIntercept = axiosPrivate.interceptors.response.use(

            // ---> #21 now the responseIntercept expect get the response <--- 

            // we get the response. if the respons is true -> we return the response as well 
            response => response,

            // if the token is expaierd, or the response is not well - we must care of it
            async (error) => {

                // we collect the old request from the config
                const prevRequest = error?.config;

                // WE CHECK 2 THINKS: 
                // 1) if the status 403 (the token is expaierd)
                // 2) and also, if the request if sent 
                if (error?.response?.status === 403 && !prevRequest?.sent) {

                    // we chaghe to true
                    prevRequest.sent = true;

                    // we call to refresh function for get a new access token
                    const newAccessToken = await refresh();

                    // we set the new access token in the headers   
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    // after we update the request, 
                    // we need call to axiosPrivate again and pass the updated request
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        // #23 we clean the interseptors, 
        // we dont want load on our interceptors
        return () => {

            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

// #24 - Users.js -->  

export default useAxiosPrivate;