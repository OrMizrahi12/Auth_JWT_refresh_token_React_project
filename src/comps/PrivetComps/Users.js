
import { useState, useEffect, useContext } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from 
"react-router-dom";
import { AppContext } from "../../context/context";

const Users = () => {

    const {setAuth} = useContext(AppContext)
    const logout = async () => {

        setAuth({});
        navigate('/home');
    }
    
    const [users, setUsers] = useState([]);
    
    // #24 we use axiosPrivet for getting the bace url.  
    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        let isMounted = true;

        // AbortController -->
        //  is allow us cancel the request if the component is Unmounted.
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                // #25 we use axiosPrivate for send and get the response
                const response = await axiosPrivate.get('/users', {

                    // controller.signal --> 
                    // we use it for get the ability to cancel the request.
                    signal: controller.signal
                });
                
                // we need check is the component is Mount
                isMounted && setUsers(response.data);

            } catch (err) {
                console.error(err);
                logout();
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        // if the commponent is Unmounted,
        // w'll cancel all the request -->
        // for not to load with unnecessary commands.
        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [])



    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
          
        </article>
    );
};

export default Users;