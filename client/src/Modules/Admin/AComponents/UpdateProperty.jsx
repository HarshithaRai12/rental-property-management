import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

export default function UpdateProperty() {

  const location = useLocation()
  const navigate = useNavigate()

  const [propertydata, setPropertydata] = useState({
    title: '',
    location: '',
    price: '',
    type: '',
    description: '',
    propertyimage: ''
  })

  // get data from previous page
  useEffect(() => {
    if (location.state) {
      setPropertydata(location.state)
    }
  }, [])

  const handlechange = (e) => {
    if (e.target.name === "propertyimage") {
      setPropertydata({
        ...propertydata,
        propertyimage: e.target.files[0]
      })
    } else {
      setPropertydata({
        ...propertydata,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleUpdate = () => {
    axios.put(
      `http://localhost:7000/property/updateproperty/${propertydata._id}`,
      propertydata,
      { headers: { "Content-Type": "multipart/form-data" } }
    )
      .then((res) => {
        alert("Updated Successfully")
        navigate("/viewproperty")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <h2>Update Property</h2>

      <input type="text" name="title" value={propertydata.title} onChange={handlechange} /><br /><br />

      <input type="text" name="location" value={propertydata.location} onChange={handlechange} /><br /><br />

      <input type="number" name="price" value={propertydata.price} onChange={handlechange} /><br /><br />

      <input type="text" name="type" value={propertydata.type} onChange={handlechange} /><br /><br />

      <textarea name="description" value={propertydata.description} onChange={handlechange}></textarea><br /><br />

      <input type="file" name="propertyimage" onChange={handlechange} /><br /><br />

      <button onClick={handleUpdate}>Update Property</button>
    </div>
  )
}