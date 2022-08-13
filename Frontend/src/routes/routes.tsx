import { Routes, Route } from 'react-router-dom'
import {RouteNotLogin, RouteLogin} from './route'

import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'

import Singin from '../pages/Signin'
import Singup from '../pages/Signup'
import Header from '../components/Header'

export function Routers() {
    return (
        <>
            <Routes>
                <Route path='/dashboard' element={<RouteNotLogin redirect='/'>
                    <Dashboard />
                </RouteNotLogin>} />
                <Route path='/profile' element={<RouteNotLogin redirect="/">
                    <Profile />
                </RouteNotLogin>}/>
                <Route path='/' element={<RouteLogin redirect="/dashboard">
                    <Singin/>
                </RouteLogin>}/>
                <Route path='/register' element={<RouteLogin redirect="/dashboard">
                    <Singup/>
                </RouteLogin>}/>
                <Route path='*' />
            </Routes>
        </>
    )
}