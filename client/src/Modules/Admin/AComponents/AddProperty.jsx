import React, { useState } from 'react'
import axios from 'axios'

export default function AddProperty() {

  const [propertydata, setPropertydata] = useState({
    title: '',
    location: '',
    price: '',
    type: '',
    description: '',
    propertyimage: ''
  })

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

  const handleSubmit = () => {
    axios.post("http://localhost:7000/property/addproperty", propertydata, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then((res) => {
        alert("Property Added Successfully")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <h2>Add Property</h2>

      <input type="text" name="title" placeholder="Title" onChange={handlechange} /><br /><br />

      <input type="text" name="location" placeholder="Location" onChange={handlechange} /><br /><br />

      <input type="number" name="price" placeholder="Price" onChange={handlechange} /><br /><br />

      <input type="text" name="type" placeholder="Type" onChange={handlechange} /><br /><br />

      <textarea name="description" placeholder="Description" onChange={handlechange}></textarea><br /><br />

      <input type="file" name="propertyimage" onChange={handlechange} /><br /><br />

      <button onClick={handleSubmit}>Add Property</button>
    </div>
  )
}