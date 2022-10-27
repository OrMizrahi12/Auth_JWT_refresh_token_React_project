
import { useContext } from 'react';
import axios from '../api/axios';
import { AppContext } from '../context/context';

const useRefreshToken = () => {
    
    const { setAuth } = useContext(AppContext);
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return {
                ...prev,
                roles: response.data.roles, accessToken:
                response.data.accessToken
            }
        });
        return response.data.accessToken;

    }
    return refresh;
};
export default useRefreshToken;

