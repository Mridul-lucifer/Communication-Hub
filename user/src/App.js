import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Home from './Components/Home'
import CreateGroup from './Components/CreateGroup'
import JoinChat from './Components/JoinChat'
import Displaychat from './Components/Displaychat'
import SendChat from './Components/SendChat'
import DeleteGroup from './Components/DeleteGroup'
import DeleteAccount from './Components/DeleteAccount'
export default function App() {
  const router = createBrowserRouter([
    {
      path : "/",
      element : <><Signup/></>
    },
    {
      path : "/Login",
      element : <><Login/></>
    },
    {
      path : "/Home",
      element : <><Header/><Home/><Footer/></>
    },
    {
      path : "/CreateGroup",
      element: <><Header/><CreateGroup/><Footer/></>
    },
    {
      path : "/AddGroup",
      element: <><Header/><JoinChat/><Footer/></>
    },
    {
      path : "/ChatingGroup",
      element: <><Header/><Displaychat/><SendChat/></>
    },
    {
      path: "/DeleteGroup",
      element: <><Header/><DeleteGroup/><Footer/></>
    },
    {
      path: "/DeleteAccount",
      element: <><Header/><DeleteAccount/><Footer/></>
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}
