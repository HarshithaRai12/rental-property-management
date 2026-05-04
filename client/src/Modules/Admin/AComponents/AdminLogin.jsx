import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {

  const navigate = useNavigate()

  const [login, setLogin] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = () => {
    axios.post("http://localhost:7000/admin/login", login)
      .then((res) => {
        if (res.data.success) {

  localStorage.setItem(
    "AdminToken",
    res.data.token
  );

  alert("Login Success");

  navigate("/admin/");

} else {
          alert("Invalid Credentials")
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <h2>Admin Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      /><br /><br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      /><br /><br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  )
}