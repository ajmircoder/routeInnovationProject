import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Login from './components/Login.jsx'
import Product from './components/Product.jsx'
import Layout from './components/Layout.jsx'
import Protected from './components/Protected.jsx'



const router = createBrowserRouter( 
  createRoutesFromElements(
    <Route path='/' element={<Protected Component={Layout}/>}>
      <Route path='login' element={<Login />} />
      <Route path='/' element={<Product />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)