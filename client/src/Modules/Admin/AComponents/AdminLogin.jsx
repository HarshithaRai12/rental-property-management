import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:7000/admin/login", login)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("AdminToken", res.data.token);
          alert("Login Success");
          navigate("/admin/");
        } else {
          alert("Invalid Credentials");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Server Error");
      });
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Admin Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={login.email}
          onChange={handleChange}
          style={input}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={login.password}
          onChange={handleChange}
          style={input}
        />

        <button onClick={handleLogin} style={button}>
          Login
        </button>
      </div>
    </div>
  );
}

/* STYLES */

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f5f7f6"
};

const card = {
  background: "#fff",
  padding: "40px",
  borderRadius: "16px",
  width: "350px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  textAlign: "center"
};

const title = {
  color: "green",
  marginBottom: "25px"
};

const input = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  background: "#eef2f7",
  outline: "none",
  fontSize: "14px"
};

const button = {
  width: "100%",
  padding: "14px",
  background: "green",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer"
};