import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let user = localStorage.getItem('user');
    let isValidToken = false;
    // call auth API with token 
    if (user) {
      fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': JSON.parse(user).token,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data) isValidToken = true;
          if (isValidToken) {
            navigate('/');
          } else {
            navigate('/login');
          }
        });
    } else {
      navigate('/login')
    }
  }, [])
  return (
    <div>
      <Component />
    </div>
  )
}
