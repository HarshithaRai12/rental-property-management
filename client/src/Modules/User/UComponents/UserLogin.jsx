import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function UserLogin() {

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
    axios.post("http://localhost:7000/user/login", login)
      .then((res) => {

        if (res.data.success) {

          localStorage.setItem(
            "UserToken",
            res.data.token
          );

          localStorage.setItem(
            "UserName",
            res.data.username
          );

          alert("Login Success");

          navigate("/browse");

        } else {
          alert("Invalid Credentials");
        }

      })
      .catch((err) => {
        console.log(err)
      })
  }

 return (
  <div
    style={{
      height: "90vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f8faf8"
    }}
  >
    <div
      style={{
        background: "white",
        padding: "35px",
        width: "380px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}
    >
      <h1 style={{ color: "green" }}>
        User Login
      </h1>

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "15px"
        }}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "15px"
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "8px"
        }}
      >
        Login
      </button>
    </div>
  </div>
);
}