import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate , useLocation} from 'react-router-dom'

const Register = () => {  
    
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/members";
    const [resp,setResp] = useState()
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const REGISTER_URL = "http://localhost:3000/register"
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, email, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                
            );
            setResp(response.data)
            setUser('');
            setPwd('');
            setEmail('')
        } catch (err) {
            console.log(err)
        }

      
    }
    return (
        <div className='bg-ligth bd-placeholder-img'>
            <div className='w-25 mx-auto m-5 shadow'>
                <main className="form-signin w-100 m-auto">
                    <form className='p-3 border border-dark rounded'>
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                        <div className="form-floating m-2">
                            <input
                                onChange={e => setUser(e.target.value)}
                                type="user name"
                                className="form-control"
                                placeholder="Password"
                            />
                            <label>user name</label>
                        </div>
                        <div className="form-floating m-2">
                            <input
                                onChange={e => setEmail(e.target.value)}
                                type="email"
                                className="form-control"
                                placeholder="email"
                            />
                            <label>Email address</label>
                        </div>
                        <div
                            className="form-floating m-2">
                            <input
                                onChange={e => setPwd(e.target.value)}
                                type="password"
                                className="form-control"
                                placeholder="Password"
                            />
                            <label>Password</label>
                        </div>
                        <button
                            disabled={!email || !pwd || !user}
                            className="w-100 btn btn-lg btn-primary m"
                            onClick={handleSubmit}>register
                        </button>
                    </form>
                </main>
            </div>
        </div>
    )
}

export default Register
