import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import MainLayout from '../layouts/MainLayout'
import StateManage from '../pages/StateManage'
import LoginTest from '../pages/LoginTest'
import GuestRoute from './GuestRoute'
import NormalUserRoute from './NormalUserRoute'
import AuthContextProvider from '../auth/AuthProvider'

export default function AppRouter() {
  return (
    <AuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/login-test' element={<LoginTest/>}></Route>
        <Route path='/state-test' element={<StateManage />}></Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />}></Route>
          <Route element={<GuestRoute/>}>
          <Route path="/login" element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Route>
        </Route>
        <Route path='/normal/*' element={<NormalUserRoute/>}>
        <Route path='order' element={<>My Order</>}></Route>
        <Route path='cart' element={<>My Cart</>}></Route>
        <Route path='*' element={<>404 not found</>}></Route>
        </Route>
        <Route element={<MainLayout />}>
        <Route path='/admin/*'>
        <Route path='dashboard' element={<>Dashboard</>}></Route>
        <Route path='users' element={<>Users</>}></Route>
        <Route path='Categories' element={<>Categories</>}></Route>
        <Route path='products' element={<>Products</>}></Route>
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthContextProvider> 
  )
}
// task
// in login page
// make 2 link 
// go back -> routes to homepage
// register -> routes to register
// make footer and add it in layout
// Footer - 2025 @ MyApp