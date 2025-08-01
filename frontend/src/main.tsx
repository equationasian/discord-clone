import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import AuthLayout from './auth/AuthLayout.tsx'
import Login from './auth/Login.tsx'
import Register from './auth/Register.tsx'
import ProfileLayout from './components/profile/ProfileLayout.tsx'
import Profile from './components/profile/Profile.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route path='profile' element={<ProfileLayout />}>
          <Route path='edit' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)