import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function UserRegister() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = () => {
    axios.post("http://localhost:7000/user/register", form)
      .then((res) => {
        if (res.data.success) {
          alert("Registered Successfully")
          navigate("/userlogin")
        } else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "14px",
  boxSizing: "border-box"
};


return (
  <div
    style={{
      minHeight: "90vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f8faf8",
      padding: "30px"
    }}
  >
    <div
      style={{
        width: "420px",
        background: "white",
        padding: "35px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}
    >
      <h1 style={{ color: "green", marginBottom: "20px" }}>
        Create Account
      </h1>

      <input name="name" placeholder="Full Name" onChange={handleChange}
        style={inputStyle} />

      <input name="email" placeholder="Email" onChange={handleChange}
        style={inputStyle} />

      <input name="password" type="password"
        placeholder="Password"
        onChange={handleChange}
        style={inputStyle} />

      <input name="phone" placeholder="Phone"
        onChange={handleChange}
        style={inputStyle} />

      <textarea
        name="address"
        placeholder="Address"
        onChange={handleChange}
        style={{
          ...inputStyle,
          height: "90px",
          resize: "none"
        }}
      />

      <button
        onClick={handleRegister}
        style={{
          width: "100%",
          padding: "13px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "8px",
          marginTop: "10px",
          cursor: "pointer"
        }}
      >
        Register
      </button>
    </div>
  </div>
);
}