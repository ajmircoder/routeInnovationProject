import React, { useState } from 'react';
import '../CSS/login.css';

export default function Login({setIsUser}) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState();
    const getUser = () => {
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: userName,
                password: password,
            })
        }).then(res => res.json())
        .then(data => {
            if(data.message == 'Invalid credentials') setIsUser(false);
            else {
                setUser(data);
                setIsUser(true)
            }
        });
    }
    return (
        <div className=' h-screen body flex justify-center items-center'>
            <div className="background hidden md:block">
                <div className="shape" />
                <div className="shape" />
            </div>
            <form className='md:h-[520px] w-[300px] md:w-[400px] md:absolute md:transform md:-translate-x-1/2 md:-translate-y-1/2' onSubmit={(e) => {e.preventDefault()}}>
                <h3 className=' text-xl md:text-2xl text-center'>Login Here</h3>
                <label className='userName' htmlFor="username">Username</label>
                <input className='loginInput' type="text" placeholder="Username" id="username" 
                    onChange={(e)=>{
                        setUserName(e.target.value);
                    }}/>
                <label htmlFor="password">Password</label>
                <input className='loginInput' type="password" placeholder="Password" id="password" 
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}/>
                <button className='loginBtn' onClick={()=>{
                    getUser();
                }} 
                >Log In</button>
            </form>
        </div>
    )
}
