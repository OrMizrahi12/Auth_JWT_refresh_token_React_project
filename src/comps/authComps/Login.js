

import { useState, useContext, useEffect } from 'react';
import {useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/axios'
import { AppContext } from '../../context/context';


const LogIn = () => {

    const LOGIN_URL = 'http://localhost:3500/auth';
    const { setAuth, auth } = useContext(AppContext);
    const [resp, setResp] = useState({})
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/members";
    const [err1, setErr1] = useState("")
    const [person, setPerson] = useState({ user: "", pwd: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                { user: person.user, pwd: person.pwd },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken;
            const roles = response.data.roles;
            const _id = response?.data?.foundUser._id

            setAuth({ user: person.user, roles, accessToken, _id });
          
            setResp(response.status)
            setPerson({ user: "", pwd: "" })

        } catch (err) {
            if (!err?.response) {
                setErr1('No Server Response')
            } else if (err.response?.status === 400) {
                setErr1('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErr1('pwd / user uncorrect. try egen')
            } else {
                setErr1('Login Failed')
            }
        }
    }
    const goTo = () => {
        navigate(from, { replace: true });

    }
    useEffect(() => {
        if (resp === 200) {
            goTo();
        }

    }, [resp === 200])


    return (
        <div className='bg-ligth bd-placeholder-img'>
            <div className='w-25 mx-auto m-5 shadow'>
                <main className="form-signin w-100 m-auto">
                    <form className='p-3 border border-dark rounded'>
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                        <div
                            className="form-floating m-2">
                            <input
                                onChange={e => setPerson({ ...person, user: e.target.value })}
                                type="email"
                                className="form-control"
                                placeholder="email"
                            />
                            <label>user name </label>
                        </div>
                        <div
                            className="form-floating m-2">
                            <input
                                onChange={e => setPerson({ ...person, pwd: e.target.value })}
                                type="password"
                                className="form-control"
                                placeholder="Password"
                            />
                            <label>Password</label>
                        </div>
                        <button
                            className="w-100 btn btn-lg btn-primary m"
                            onClick={handleSubmit}>log in
                        </button>
                        <p className='m-3' style={{ color: 'red' }}>{err1}</p>
                    </form>
                </main>
            </div>
        </div>
    )
}

export default LogIn
