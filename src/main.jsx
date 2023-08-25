import React from 'react'
import ReactDOM from 'react-dom/client'

// configurar router

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import MainPage from './pages/MainSection/MainPage'
import LoginComponent from './pages/Login/LoginComponent'
import RegisterComponent from './pages/Register/RegisterComponent'
import ForgotPassword from './pages/Login/ForgotPassword/ForgotPassword'
import Profile from './pages/Profile/ProfilePage'
import ResPage from './pages/RestaurantPage/ResPage'
import Info from './pages/FootInfo/Info'
import UserReview from './pages/UserReview/UserReview';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage/>,
  },
  {
    path: 'login',
    element: <LoginComponent/>,
  },
  {
    path: 'register',
    element: <RegisterComponent/>,
  },
  {
    path: 'recover-password',
    element: <ForgotPassword/>,
  },
  {
    path: 'profile',
    element: <Profile/>
  },
  {
    path: 'restaurant/:id',
    element: <ResPage/>
  },
  {
    path: 'info',
    element: <Info/>
  },
  {
    path: 'reviews/:id',
    element: <UserReview/>
  }
])


import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
