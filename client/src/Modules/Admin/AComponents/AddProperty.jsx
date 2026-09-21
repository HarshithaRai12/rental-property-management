import React, { useState } from "react";
import axios from "axios";

export default function AddProperty() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    type: "",
    configuration: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    furnishing: "",
    description: ""
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    for (let i = 0; i < images.length; i++) {
      formData.append("propertyimages", images[i]);
    }

    try {
      await axios.post("http://localhost:7000/property/addproperty", formData);
      alert("Property Added Successfully");
    } catch (error) {
      console.log(error);
      alert("Error adding property");
    }
  };

  return (
    <div style={{ padding: "30px", background: "#f5f7f6", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "5px" }}>Add New Property</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Fill in the details below to list a new property for rent.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "20px"
        }}
      >
        {/* LEFT FORM */}
        <div
          style={{
            flex: 2,
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
          }}
        >
          <h3 style={{ color: "green", marginBottom: "15px" }}>
            Property Details
          </h3>

          <div style={grid}>
            <input name="title" placeholder="Enter property title" onChange={handleChange} required style={input} />
            <input name="location" placeholder="Enter location" onChange={handleChange} required style={input} />

            <input name="price" placeholder="Enter monthly rent" onChange={handleChange} required style={input} />
            <input name="type" placeholder="Enter property type (House, Villa)" onChange={handleChange} required style={input} />

            <input name="configuration" placeholder="1BHK, 2BHK" onChange={handleChange} required style={input} />
            <input name="area" placeholder="Area in sq.ft" onChange={handleChange} required style={input} />

            <input name="bedrooms" placeholder="Bedrooms" onChange={handleChange} required style={input} />
            <input name="bathrooms" placeholder="Bathrooms" onChange={handleChange} required style={input} />

            <input name="furnishing" placeholder="Furnishing (Full/Semi)" onChange={handleChange} required style={input} />
          </div>

          <textarea
            name="description"
            placeholder="Enter detailed description..."
            onChange={handleChange}
            required
            style={{
              ...input,
              marginTop: "15px",
              height: "100px"
            }}
          />

          <button
            type="submit"
            style={{
              marginTop: "20px",
              background: "green",
              color: "#fff",
              padding: "12px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Add Property
          </button>
        </div>

        {/* RIGHT IMAGE UPLOAD */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
          }}
        >
          <h3 style={{ color: "green", marginBottom: "10px" }}>
            Property Images
          </h3>

          <p style={{ fontSize: "14px", color: "#777" }}>
            Upload clear images of your property
          </p>

          <input
            type="file"
            multiple
            onChange={handleImageChange}
            style={{ marginTop: "10px" }}
          />

          <p style={{ fontSize: "12px", color: "#999", marginTop: "10px" }}>
            Upload high-quality images (JPG, PNG)
          </p>
        </div>
      </form>
    </div>
  );
}

/* STYLES */
const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px"
};

const input = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  width: "100%"
};