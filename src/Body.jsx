import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Product from './components/Product'

function Body() {
  const [isUser, setIsUser] = useState(false);

  return (
    <>
    {isUser ? <Product/> : <Login setIsUser={setIsUser}/>}
    </>
  )
}

export default Body
