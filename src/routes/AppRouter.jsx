import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CreateTask from '../pages/CreateTask'
import About from '../pages/About'
import TaskList from '../pages/TaskList'
import Home from '../pages/home'
import Profile from '../pages/Profile'
import Navbar from '../components/Navbar'
import Login from '../auth/Login'
import Register from '../auth/Register'
import { AuthProvider } from '../auth/AuthContext'
import ProtectedRouter from '../auth/ProtectedRouter'
import { Taskprovider } from '../context/TaskContext'

function AppRouter() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Taskprovider>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Navigate to="/login" />}></Route>
                        <Route path='/' element={<Home />}>
                            <Route path='login' element={<Login />}></Route>
                            <Route path='register' element={<Register />}></Route>
                        </Route>
                        <Route path='/about-us' element={<ProtectedRouter><About /></ProtectedRouter>}></Route>
                        <Route path='/task-list' element={<ProtectedRouter><TaskList /></ProtectedRouter>}></Route>
                        <Route path='/create-task' element={<ProtectedRouter><CreateTask /></ProtectedRouter>}></Route>
                        <Route path='/profile' element={<ProtectedRouter><Profile /></ProtectedRouter>}></Route>
                    </Routes>
                </Taskprovider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default AppRouter