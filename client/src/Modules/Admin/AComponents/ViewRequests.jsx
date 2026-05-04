import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ViewRequests() {

  const [requests, setRequests] = useState([])

  useEffect(() => {
    axios.get("http://localhost:7000/request/getrequests")
      .then((res) => {
        setRequests(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleStatus = (id, status) => {
    axios.put(`http://localhost:7000/request/updatestatus/${id}`, { status })
      .then((res) => {
        alert("Status Updated")
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <h2>All Requests</h2>

      {
        requests.map((item) => (
          <div key={item._id} style={{border:"1px solid white", margin:"10px", padding:"10px"}}>
            
            <h3>{item.propertyId.title}</h3>
            <p>{item.propertyId.location}</p>
            <p>Tenant: {item.tenantName}</p>
            <p>Status: {item.status}</p>

            <button onClick={() => handleStatus(item._id, "approved")}>
              Approve
            </button>

            <button onClick={() => handleStatus(item._id, "rejected")}>
              Reject
            </button>

          </div>
        ))
      }

    </div>
  )
}   