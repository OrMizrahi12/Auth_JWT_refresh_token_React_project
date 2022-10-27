import React, { useContext } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/context';
import Navbar from '../../navbar/navbar';
import LogIn from '../authComps/Login';
import Register from '../authComps/Register';
import Admin from '../PrivetComps/Admin';
import Editor from '../PrivetComps/Editor';
import MembersManu from '../PrivetComps/membersManu';
import RequireAuth from '../PrivetComps/RequireAuth';
import Home from './Home';
import Layout from './Layout';
import Unauthorized from './Unauthorized';

const MainComp = () => {

    const ROLES = {
        'User': 2001,
        'Editor': 1984,
        'Admin': 5150
    }
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/home' element={<Home />} />               
                    <Route path='/unauthorized' element={<Unauthorized />} />                   
                    <Route path='/login' element={<LogIn />} />                   
                    <Route path='register' element={<Register />} />
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User, ROLES.Editor]} />}>
                        <Route path='/members' element={<MembersManu />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
                        <Route path='/editor' element={<Editor />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                        <Route path='/admin' element={<Admin />} />
                    </Route>                  
                    <Route path='/requireAuth' element={<RequireAuth />} />
                </Route>
            </Routes>
        </div>
    )
}

export default MainComp
