import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ViewProperty() {

  const [properties, setProperties] = useState([])

  useEffect(() => {
    axios.get("http://localhost:7000/property/getproperties")
      .then((res) => {
        setProperties(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

//delete
const handleDelete = (id) => {
  axios.delete(`http://localhost:7000/property/deleteproperty/${id}`)
    .then((res) => {
      alert("Deleted Successfully")
      window.location.reload()
    })
    .catch((err) => {
      console.log(err)
    })
}
//update
const handleUpdate = (item) => {
  navigate("/updateproperty", { state: item })
}

const navigate = useNavigate()
  return (
    <div>
      <h2>All Properties</h2>

      {
        properties.map((item) => (
          <div key={item._id} style={{border:"1px solid white", margin:"10px", padding:"10px"}}>
            <h3>{item.title}</h3>
            <p>{item.location}</p>
            <p>₹ {item.price}</p>
            <p>{item.type}</p>
            <p>{item.description}</p>

            <img 
              src={`http://localhost:7000/image/${item.propertyimage}`} 
              width="200" 
              alt="property"
            />
            <button onClick={() => handleDelete(item._id)}>
             Delete
            </button>
            <button onClick={() => handleUpdate(item)}>
            Update
            </button>
            
          </div>
        ))
      }

    </div>
  )
}