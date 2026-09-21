import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ITEMS_PER_PAGE = 5

export default function ViewProperty() {
  const [properties, setProperties] = useState([])
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:7000/property/getproperties")
      .then((res) => setProperties(res.data))
      .catch((err) => console.log(err))
  }, [])

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return
    axios.delete(`http://localhost:7000/property/deleteproperty/${id}`)
      .then(() => {
        setProperties((prev) => prev.filter((item) => item._id !== id))
      })
      .catch((err) => console.log(err))
  }

  const handleUpdate = (item) => {
    navigate("/admin/updateproperty", { state: item })
  }

  // Stats
  const total = properties.length
  const available = properties.filter(p => p.status === "available").length
  const rented = properties.filter(p => p.status === "rented").length

  // Search filter
  const filtered = properties.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.location?.toLowerCase().includes(search.toLowerCase())
  )

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <div style={{
      padding: "32px 36px",
      background: "#f4f6f4",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box"
    }}>

      {/* ── Header ── */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "12px"
      }}>
        <div>
          <h2 style={{ margin: "0 0 4px 0", fontSize: "26px", fontWeight: "700", color: "#111" }}>
            All Properties
          </h2>
          <p style={{ margin: 0, color: "#777", fontSize: "14px" }}>
            Manage and view all properties listed on the platform.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* Search */}
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "white", border: "1.5px solid #e0e0e0",
            borderRadius: "8px", padding: "9px 14px", width: "240px"
          }}>
            <span style={{ color: "#aaa", fontSize: "15px" }}>🔍</span>
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
              placeholder="Search properties..."
              style={{
                border: "none", outline: "none", fontSize: "14px",
                color: "#333", width: "100%", background: "transparent"
              }}
            />
          </div>
          {/* Filter button */}
          <button style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "white", border: "1.5px solid #e0e0e0",
            borderRadius: "8px", padding: "9px 18px",
            cursor: "pointer", fontSize: "14px", color: "#333", fontWeight: "500"
          }}>
            <span>⚙️</span> Filter
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        <StatCard icon="🏠" iconBg="#e8f5e9" label="Total Properties" value={total} />
        <StatCard icon="👁️" iconBg="#e3f0ff" label="Available" value={available} />
        <StatCard icon="🔑" iconBg="#fff8e1" label="Rented" value={rented} />
      </div>

      {/* ── Property List ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {paginated.length === 0 ? (
          <div style={{
            background: "white", borderRadius: "14px", padding: "50px",
            textAlign: "center", color: "#777", fontSize: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
          }}>
            No properties found.
          </div>
        ) : (
          paginated.map((item) => (
            <div key={item._id} style={{
              background: "white", borderRadius: "14px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
              display: "flex", gap: "24px", padding: "20px",
              alignItems: "flex-start"
            }}>

              {/* Image */}
              <img
                  src={
                    item.propertyimages?.length
                      ? `http://localhost:7000/image/${item.propertyimages[0]}`
                      : `http://localhost:7000/image/${item.propertyimage}`
                  }
                alt={item.title}
                style={{
                  width: "240px", height: "175px",
                  objectFit: "cover", borderRadius: "10px", flexShrink: 0
                }}
              />

              {/* Details */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "20px", fontWeight: "700", color: "#111" }}>
                  {item.title}
                </h3>

                <p style={{
                  margin: "0 0 6px 0", color: "#e05c7a",
                  fontSize: "14px", display: "flex", alignItems: "center", gap: "4px"
                }}>
                  <span>📍</span> {item.location}
                </p>

                <p style={{
                  margin: "0 0 14px 0", color: "#1e7e1e",
                  fontWeight: "700", fontSize: "17px"
                }}>
                  ₹ {Number(item.price).toLocaleString("en-IN")}
                  <span style={{ fontWeight: "400", color: "#555", fontSize: "14px" }}> / month</span>
                </p>

                {/* Feature chips */}
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "14px" }}>
                  <FeatureChip icon="🛏" value={item.bedrooms} label="Bedrooms" />
                  <FeatureChip icon="🛁" value={item.bathrooms} label="Bathrooms" />
                  <FeatureChip icon="📐" value={item.area} label="Sq.Ft" />
                  <FeatureChip icon="🪑" value={item.furnishing} label="Furnished" />
                </div>

                <p style={{ margin: 0, color: "#666", fontSize: "14px", lineHeight: "1.5" }}>
                  {item.description}
                </p>
              </div>

              {/* Right: status + date + buttons */}
              <div style={{
                display: "flex", flexDirection: "column",
                alignItems: "flex-end", gap: "10px",
                flexShrink: 0, minWidth: "130px"
              }}>
                {/* Status badge */}
                <span style={{
                  padding: "5px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: "600",
                  background: item.status === "rented" ? "#e3f0ff" : "#e8f5e9",
                  color: item.status === "rented" ? "#1565c0" : "#1e7e1e",
                  border: `1px solid ${item.status === "rented" ? "#bbdefb" : "#c8e6c9"}`
                }}>
                  {item.status === "rented" ? "Rented" : "Available"}
                </span>

                {/* Listed date */}
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: 0, fontSize: "12px", color: "#aaa" }}>Listed on</p>
                  <p style={{ margin: 0, fontSize: "13px", color: "#555", fontWeight: "500" }}>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit", month: "short", year: "numeric"
                        })
                      : "—"}
                  </p>
                </div>

                {/* Edit button */}
                <button
                  onClick={() => handleUpdate(item)}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "8px 20px", background: "white",
                    border: "1.5px solid #1e7e1e", color: "#1e7e1e",
                    borderRadius: "8px", cursor: "pointer",
                    fontSize: "14px", fontWeight: "600", width: "100%",
                    justifyContent: "center"
                  }}
                >
                  Edit ✏️
                </button>

                {/* Delete button */}
                <button
                  onClick={() => handleDelete(item._id)}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "8px 20px", background: "white",
                    border: "1.5px solid #e53935", color: "#e53935",
                    borderRadius: "8px", cursor: "pointer",
                    fontSize: "14px", fontWeight: "600", width: "100%",
                    justifyContent: "center"
                  }}
                >
                  Delete 🗑️
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div style={{
          display: "flex", justifyContent: "center",
          alignItems: "center", gap: "8px", marginTop: "30px"
        }}>
          {/* Prev */}
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={pageBtn(false, currentPage === 1)}
          >
            ‹
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <button
              key={pg}
              onClick={() => setCurrentPage(pg)}
              style={pageBtn(pg === currentPage, false)}
            >
              {pg}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={pageBtn(false, currentPage === totalPages)}
          >
            ›
          </button>

          <span style={{ marginLeft: "12px", color: "#777", fontSize: "14px" }}>
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} properties
          </span>
        </div>
      )}

    </div>
  )
}

/* ── Sub-components ── */

function StatCard({ icon, iconBg, label, value }) {
  return (
    <div style={{
      background: "white", borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
      padding: "20px 24px",
      display: "flex", alignItems: "center", gap: "18px"
    }}>
      <div style={{
        width: "52px", height: "52px", borderRadius: "12px",
        background: iconBg, display: "flex",
        alignItems: "center", justifyContent: "center", fontSize: "24px"
      }}>
        {icon}
      </div>
      <div>
        <p style={{ margin: "0 0 2px 0", color: "#777", fontSize: "13px" }}>{label}</p>
        <p style={{ margin: 0, fontSize: "28px", fontWeight: "700", color: "#111" }}>{value}</p>
      </div>
    </div>
  )
}

function FeatureChip({ icon, value, label }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      background: "#f9f9f9", border: "1px solid #ebebeb",
      borderRadius: "8px", padding: "8px 14px", minWidth: "70px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "2px" }}>
        <span style={{ fontSize: "14px" }}>{icon}</span>
        <span style={{ fontWeight: "700", fontSize: "14px", color: "#111" }}>{value}</span>
      </div>
      <span style={{ fontSize: "11px", color: "#888" }}>{label}</span>
    </div>
  )
}

function pageBtn(active, disabled) {
  return {
    width: "36px", height: "36px",
    borderRadius: "8px", border: "1.5px solid",
    borderColor: active ? "#1e7e1e" : "#e0e0e0",
    background: active ? "#1e7e1e" : "white",
    color: active ? "white" : disabled ? "#ccc" : "#333",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: active ? "700" : "400",
    fontSize: "15px", display: "flex",
    alignItems: "center", justifyContent: "center"
  }
}
