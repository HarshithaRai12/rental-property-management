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
    propertyimage: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    furnishing: ''
  })
  
  const [images, setImages] = useState([]);

  // ✅ Load data from previous page
  useEffect(() => {
    if (location.state) {
      setPropertydata(location.state)
    } else {
      // if page refreshed → redirect back
      navigate("/admin/viewproperty")
    }
  }, [location, navigate])

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
  const formData = new FormData();

  // ✅ send all text fields
  for (let key in propertydata) {
    formData.append(key, propertydata[key]);
  }

  // ✅ send images
  for (let i = 0; i < images.length; i++) {
    formData.append("propertyimages", images[i]);
  }

  axios.put(
    `https://rentease-backend-m0bo.onrender.com/property/updateproperty/${propertydata._id}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  )
    .then(() => {
      alert("Property Updated Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

  return (
    <div>
      <h2>Update Property</h2>

      <input
        type="text"
        name="title"
        value={propertydata.title}
        onChange={handlechange}
        placeholder="Title"
      /><br /><br />

      <input
        type="text"
        name="location"
        value={propertydata.location}
        onChange={handlechange}
        placeholder="Location"
      /><br /><br />

      <input
        type="number"
        name="price"
        value={propertydata.price}
        onChange={handlechange}
        placeholder="Price"
      /><br /><br />

      <input
        type="text"
        name="type"
        value={propertydata.type}
        onChange={handlechange}
        placeholder="Type"
      /><br /><br />

      <textarea
        name="description"
        value={propertydata.description}
        onChange={handlechange}
        placeholder="Description"
      ></textarea><br /><br />

      {/* Bedrooms */}
      <input
        type="number"
        name="bedrooms"
        value={propertydata.bedrooms || ''}
        onChange={handlechange}
        placeholder="Bedrooms"
      /><br /><br />

      {/* Bathrooms */}
      <input
        type="number"
        name="bathrooms"
        value={propertydata.bathrooms || ''}
        onChange={handlechange}
        placeholder="Bathrooms"
      /><br /><br />

      {/* Area */}
      <input
        type="number"
        name="area"
        value={propertydata.area || ''}
        onChange={handlechange}
        placeholder="Area (sq ft)"
      /><br /><br />

      {/* Furnishing */}
      <input
        type="text"
        name="furnishing"
        value={propertydata.furnishing || ''}
        onChange={handlechange}
        placeholder="Furnishing"
      /><br /><br />

      {/* Image */}
      <input 
        type="file"
        name="propertyimages"
        multiple
        onChange={(e) => setImages(e.target.files)}
      /><br /><br />

      <button onClick={handleUpdate}>Update Property</button>
    </div>
  )
}