import React from 'react'
import ReactDOM from 'react-dom/client'
import { UserSignupPage } from './pages/UserSignupPage/index.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserLoginPage } from './pages/LoginPage/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserSignupPage/>
    <UserLoginPage />
  </React.StrictMode>,
)
