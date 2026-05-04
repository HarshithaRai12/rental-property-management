import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function MyHouse() {

  const [house, setHouse] = useState([])
  const navigate = useNavigate()

  useEffect(() => {

    const token = localStorage.getItem("UserToken")

    if (!token) {
      navigate("/userlogin")
      return
    }

    axios.get("http://localhost:7000/request/myhouse", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setHouse(res.data.data)
    })
    .catch((err) => {
      console.log(err)
    })

  }, [])

  return (
    <div style={{ padding: "40px", minHeight: "100vh", background: "#f8faf8" }}>

      <h1 style={{ color: "green", marginBottom: "30px" }}>
        My House
      </h1>

      {house.length === 0 ? (
        <h3>You have not rented any property yet</h3>
      ) : (

        house.map((item) => (

          <div
            key={item._id}
            style={{
              display: "flex",
              gap: "30px",
              background: "white",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
            }}
          >

            <img
              src={`http://localhost:7000/image/${item.propertyId.propertyimage}`}
              width="350"
              style={{ borderRadius: "10px" }}
            />

            <div>
              <h2>{item.propertyId.title}</h2>

              <p>📍 {item.propertyId.location}</p>
              <p>🏠 {item.propertyId.type}</p>
              <p>₹ {item.propertyId.price}</p>

              <p style={{ color: "green", fontWeight: "bold" }}>
                Status: Rented 
              </p>

              <button
                onClick={() => navigate("/browse")}
                style={{
                  marginTop: "15px",
                  padding: "10px 15px",
                  background: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                Browse More
              </button>

            </div>

          </div>

        ))

      )}

    </div>
  )
}