import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ITEMS_PER_PAGE = 5;


export default function MyRequests() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);



useEffect(() => {
  const token = localStorage.getItem("UserToken"); // ✅ get token

  axios.get("https://rentease-backend-m0bo.onrender.com/request/myrequests", {
    headers: {
      Authorization: `Bearer ${token}` // ✅ send token
    }
  })
  .then((res) => {
    setData(res.data.data); // ✅ directly set
  })
  .catch((err) => {
    console.log(err);
  });

}, []);

  const total = data.length;
  const approved = data.filter((d) => d.status === "approved").length;
  const rejected = data.filter((d) => d.status === "rejected").length;

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const paginated = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div style={{
      minHeight: "100vh",
      padding: "40px 60px",
      background: "#f4f6f4",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box"
    }}>

      {/* ── Header Row ── */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "28px",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        {/* Title */}
        <div>
          <h1 style={{ color: "#1e7e1e", fontSize: "30px", fontWeight: "700", margin: "0 0 5px 0" }}>
            My Requests
          </h1>
          <p style={{ color: "#777", margin: 0, fontSize: "14px" }}>
            View and track all your rental requests in one place.
          </p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "flex", gap: "14px" }}>
          <StatCard
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e7e1e" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="8" y1="9" x2="16" y2="9" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="12" y2="17" />
              </svg>
            }
            iconBg="#e8f5e9"
            count={total}
            label="Total Requests"
          />
          <StatCard
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e7e1e" strokeWidth="2">
                <circle cx="12" cy="12" r="9" /><polyline points="9 12 11 14 15 10" />
              </svg>
            }
            iconBg="#e8f5e9"
            count={approved}
            label="Approved"
          />
          <StatCard
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2">
                <circle cx="12" cy="12" r="9" /><line x1="9" y1="9" x2="15" y2="15" /><line x1="15" y1="9" x2="9" y2="15" />
              </svg>
            }
            iconBg="#ffebee"
            count={rejected}
            label="Rejected"
          />
        </div>
      </div>

      {/* ── Request Cards ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {paginated.length === 0 ? (
          <div style={{
            background: "white", borderRadius: "14px", padding: "50px",
            textAlign: "center", color: "#777", fontSize: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
          }}>
            No requests found.
          </div>
        ) : (
          paginated.map((item) => {
            const p = item.propertyId;
            return (
              <div key={item._id} style={{
                background: "white",
                borderRadius: "16px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                display: "flex",
                gap: "0",
                overflow: "hidden",
                alignItems: "stretch"
              }}>
                {/* Image with badge */}
                <div style={{ position: "relative", flexShrink: 0, width: "260px" }}>
                 {(item.propertyId?.propertyimages?.length > 0 || item.propertyId?.propertyimage) && (
                    <img
                      src={
                          item.propertyId?.propertyimages?.length > 0
                              ? item.propertyId.propertyimages[0]
                              : item.propertyId?.propertyimage
                      }
                      alt={item.propertyId.title}
                      style={{
                         width: "100%",
                         height: "180px",        // ✅ FIXED HEIGHT
                         objectFit: "cover",     // ✅ crop nicely (IMPORTANT)
                         display: "block"
                       }}
                    />
                  )}
                  

              
                </div>

                {/* Details */}
                <div style={{ flex: 1, padding: "22px 24px" }}>
                  <h2 style={{ margin: "0 0 6px 0", fontSize: "22px", fontWeight: "700", color: "#111" }}>
                    {p.title}
                  </h2>

                  <p style={{
                    margin: "0 0 8px 0", color: "#e05c7a",
                    fontSize: "14px", display: "flex", alignItems: "center", gap: "4px"
                  }}>
                    <span>📍</span> {p.location}
                  </p>

                  <p style={{
                    margin: "0 0 16px 0", color: "#1e7e1e",
                    fontWeight: "700", fontSize: "18px"
                  }}>
                    ₹ {Number(p.price).toLocaleString("en-IN")}
                    <span style={{ fontWeight: "400", color: "#666", fontSize: "14px" }}> / month</span>
                  </p>

                  {/* Feature chips */}
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
                    <FeatureChip icon="🛏" value={p.bedrooms} label="Bedrooms" />
                    <FeatureChip icon="🛁" value={p.bathrooms} label="Bathrooms" />
                    <FeatureChip icon="📐" value={p.area} label="Sq.Ft" />
                    <FeatureChip icon="🪑" value={p.furnishing} label="Furnished" />
                  </div>

                  {/* Requested on */}
                  <p style={{
                    margin: 0, color: "#888", fontSize: "13px",
                    display: "flex", alignItems: "center", gap: "6px"
                  }}>
                    <span>📅</span>
                    Requested on:{" "}
                    <strong style={{ color: "#444" }}>
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "long", year: "numeric"
                      })}
                    </strong>
                  </p>
                </div>

                {/* Right: status + date + button */}
                <div style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "flex-end", justifyContent: "space-between",
                  padding: "22px 24px", flexShrink: 0, minWidth: "160px"
                }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                    {/* Status badge */}
                    <StatusBadge status={item.status} />
                    {/* Date */}
                    <span style={{ color: "#aaa", fontSize: "13px" }}>
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </span>
                  </div>

                  {/* View Details button */}
                  <button onClick={() => navigate(`/property/${item.propertyId._id}`)}
                   style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "10px 18px",
                    background: "white",
                    border: "1.5px solid #1e7e1e",
                    color: "#1e7e1e",
                    borderRadius: "8px", cursor: "pointer",
                    fontSize: "14px", fontWeight: "600",
                    whiteSpace: "nowrap"
                  }}>
                    View Details <span style={{ fontSize: "16px" }}>›</span>
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div style={{
          display: "flex", justifyContent: "center",
          alignItems: "center", gap: "8px", marginTop: "32px"
        }}>
          <PaginationBtn
            label="‹"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            active={false}
          />
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <PaginationBtn
              key={pg}
              label={pg}
              onClick={() => setCurrentPage(pg)}
              active={pg === currentPage}
              disabled={false}
            />
          ))}
          <PaginationBtn
            label="›"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            active={false}
          />
        </div>
      )}

    </div>
  );
}

/* ── Sub-components ── */

function StatCard({ icon, iconBg, count, label }) {
  return (
    <div style={{
      background: "white",
      borderRadius: "12px",
      border: "1.5px solid #ebebeb",
      padding: "14px 20px",
      display: "flex", alignItems: "center", gap: "14px",
      minWidth: "160px"
    }}>
      <div style={{
        width: "44px", height: "44px", borderRadius: "10px",
        background: iconBg, display: "flex",
        alignItems: "center", justifyContent: "center", flexShrink: 0
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: "22px", fontWeight: "700", color: "#111", lineHeight: 1.1 }}>
          {count}
        </div>
        <div style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>{label}</div>
      </div>
    </div>
  );
}

function FeatureChip({ icon, value, label }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      background: "#f9f9f9", border: "1px solid #ebebeb",
      borderRadius: "8px", padding: "8px 14px", minWidth: "72px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "2px" }}>
        <span style={{ fontSize: "13px" }}>{icon}</span>
        <span style={{ fontWeight: "700", fontSize: "14px", color: "#111" }}>{value}</span>
      </div>
      <span style={{ fontSize: "11px", color: "#999" }}>{label}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    approved: { bg: "#e8f5e9", color: "#1e7e1e", label: "Approved" },
    rejected: { bg: "#ffebee", color: "#e53935", label: "Rejected" },
    pending:  { bg: "#fff8e1", color: "#f9a825", label: "Pending" }
  };
  const s = styles[status] || styles.pending;
  return (
    <span style={{
      padding: "5px 16px", borderRadius: "20px",
      fontSize: "13px", fontWeight: "600",
      background: s.bg, color: s.color
    }}>
      {s.label}
    </span>
  );
}

function PaginationBtn({ label, onClick, active, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "36px", height: "36px",
        borderRadius: "8px",
        border: "1.5px solid",
        borderColor: active ? "#1e7e1e" : "#e0e0e0",
        background: active ? "#1e7e1e" : "white",
        color: active ? "white" : disabled ? "#ccc" : "#333",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: active ? "700" : "400",
        fontSize: "15px",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}
    >
      {label}
    </button>
  );
}