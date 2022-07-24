
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/context';

const Navbar = () => {

    const navigate = useNavigate()
    const { auth, setAuth } = useContext(AppContext);
    const logout = async () => {

        setAuth({});
        navigate('/home');
    }
    const admin = auth?.roles?.filter(role => role == 5150)
    const editor = auth?.roles?.filter(role => role == 1984)
    const user = auth?.roles?.filter(role => role == 2001)

    return (
        <div>
            <nav class="navbar navbar-expand navbar-dark bg-dark">
                <div className='container'>
                    <button
                        onClick={() => navigate('/home')}
                        className='btn btn-outline-primary m-2'>home
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            {
                                !auth.user && <li class="nav-item active">
                                    <button
                                        onClick={() => navigate('/login')}
                                        className='btn btn-outline-primary  m-2'>login
                                    </button>
                                </li>
                            }
                            {
                                !auth.user && <li class="nav-item ">
                                    <button
                                        onClick={() => navigate('/register')}
                                        className='btn btn-outline-primary  m-2'>register
                                    </button>
                                </li>
                            }

                            {
                                admin == 5150 && <li class="nav-item float-end">
                                    <button
                                        onClick={() => navigate('/admin')}
                                        className='btn btn-outline-primary  m-2'>admin
                                    </button>
                                </li>
                            }
                            {
                                editor == 1984 && <li class="nav-item ">
                                    <button
                                        onClick={() => navigate('/editor')}
                                        className='btn btn-outline-primary  m-2'>editor
                                    </button>
                                </li>
                            }
                        </ul>
                    </div>
                    {
                        auth.user &&
                        <button
                            onClick={logout}
                            className='btn btn-outline-danger m-2 float-left'>logout
                        </button>
                    }
                </div>
            </nav>
        </div>
    )
}

export default Navbar