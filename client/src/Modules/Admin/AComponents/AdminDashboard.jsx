import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [properties, setProperties] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("https://rentease-backend-m0bo.onrender.com/property/getproperties")
      .then(res => setProperties(res.data))
      .catch(err => console.log(err));

    axios.get("https://rentease-backend-m0bo.onrender.com/request/getrequests")
      .then(res => setRequests(res.data))
      .catch(err => console.log(err));
  }, []);

  const approved = requests.filter(r => r.status === "approved").length;
  const pending  = requests.filter(r => r.status === "pending").length;

  const recentRequests = [...requests]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Dashboard</h2>
          <p style={styles.subtitle}>Welcome back, Admin! Here's what's happening with your rental platform.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={styles.statsGrid}>
        <StatCard
          icon="🏠" iconBg="#e8f5e9" iconColor="#2e7d32"
          label="Total Properties" value={properties.length}
          linkText="View all properties" linkColor="#2e7d32"
        />
        <StatCard
          icon="📋" iconBg="#e3f2fd" iconColor="#1565c0"
          label="Total Requests" value={requests.length}
          linkText="View all requests" linkColor="#1565c0"
        />
        <StatCard
          icon="✅" iconBg="#fff8e1" iconColor="#f9a825"
          label="Approved Requests" value={approved}
          linkText="View approved" linkColor="#f9a825"
        />
        <StatCard
          icon="🕐" iconBg="#ede7f6" iconColor="#6a1b9a"
          label="Pending Requests" value={pending}
          linkText="View pending" linkColor="#6a1b9a"
        />
      </div>

      {/* Recent Requests Table */}
      <div style={styles.tableCard}>

        <div style={styles.tableHeader}>
          <span style={styles.sectionTitle}>Recent Requests</span>
          <a href="/Admin/viewrequests" style={styles.viewAll}>View All →</a>
        </div>

        <table style={styles.table}>
          <thead>
            <tr style={styles.theadRow}>
              <th style={styles.th}>Property</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>Tenant</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentRequests.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "32px", color: "#aaa", fontSize: "14px" }}>
                  No requests yet.
                </td>
              </tr>
            )}
            {recentRequests.map((item, i) => (
              <tr key={item._id} style={{
                ...styles.tr,
                borderBottom: i < recentRequests.length - 1 ? "1px solid #f2f2f2" : "none"
              }}>

                {/* Property */}
                <td style={styles.td}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img
                      src={
                        item.propertyId?.propertyimages?.length > 0
                          ? `https://rentease-backend-m0bo.onrender.com/image/${item.propertyId.propertyimages[0]}`
                          : `https://rentease-backend-m0bo.onrender.com/image/${item.propertyId?.propertyimage}`
                      }
                      alt=""
                      style={styles.propImg}
                    />
                    <div>
                      <div style={{ fontWeight: "600", fontSize: "14px", color: "#111" }}>
                        {item.propertyId?.title}
                      </div>
                      <div style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>
                        ₹ {item.propertyId?.price?.toLocaleString("en-IN")} / month
                      </div>
                    </div>
                  </div>
                </td>

                {/* Location */}
                <td style={styles.td}>
                  <span style={{ fontSize: "14px", color: "#444" }}>
                    {item.propertyId?.location}
                  </span>
                </td>

                {/* Tenant */}
                <td style={styles.td}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={styles.avatar}>
                      {item.user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <div style={{ fontWeight: "600", fontSize: "14px", color: "#111" }}>
                        {item.user?.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#666", marginTop: "1px" }}>
                        {item.user?.email}
                      </div>
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        {item.user?.phone}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td style={styles.td}>
                  <span style={getStatusBadge(item.status)}>
                    {item.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* Footer */}
      <div style={styles.footer}>
        © {new Date().getFullYear()} RentalHome. All rights reserved.
      </div>

    </div>
  );
}

/* ── StatCard ── */
function StatCard({ icon, iconBg, iconColor, label, value, linkText, linkColor }) {
  return (
    <div style={styles.statCard}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
        <div style={{ ...styles.statIcon, background: iconBg, color: iconColor }}>
          {icon}
        </div>
        <div>
          <div style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>{label}</div>
          <div style={{ fontSize: "34px", fontWeight: "700", color: "#111", lineHeight: 1 }}>{value}</div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #f2f2f2", paddingTop: "12px" }}>
        <a href="#" style={{ color: linkColor, fontSize: "13px", fontWeight: "500", textDecoration: "none" }}>
          {linkText} →
        </a>
      </div>
    </div>
  );
}

/* ── Helpers ── */
const getStatusBadge = (status) => {
  const base = {
    padding: "5px 14px", borderRadius: "20px",
    fontSize: "13px", fontWeight: "600", display: "inline-block"
  };
  if (status === "approved") return { ...base, background: "#e8f5e9", color: "#2e7d32" };
  if (status === "pending")  return { ...base, background: "#fff8e1", color: "#f9a825" };
  if (status === "rejected") return { ...base, background: "#fce4ec", color: "#c62828" };
  return { ...base, background: "#eee", color: "#555" };
};

/* ── Styles ── */
const styles = {
  page: {
    padding: "28px 32px",
    background: "#f7f8fa",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  },
  header: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title: { fontSize: "26px", fontWeight: "700", margin: 0, color: "#111" },
  subtitle: { margin: "4px 0 0", color: "#666", fontSize: "14px" },
  statsGrid: {
    display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px"
  },
  statCard: {
    background: "white", borderRadius: "14px",
    padding: "20px 22px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
  },
  statIcon: {
    width: "52px", height: "52px", borderRadius: "14px",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "24px", flexShrink: 0
  },
  tableCard: {
    background: "white", borderRadius: "14px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden"
  },
  tableHeader: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", padding: "20px 24px",
    borderBottom: "1px solid #f2f2f2"
  },
  sectionTitle: { fontSize: "17px", fontWeight: "700", color: "#111" },
  viewAll: {
    color: "#2e7d32", fontWeight: "600",
    fontSize: "14px", textDecoration: "none"
  },
  table: { width: "100%", borderCollapse: "collapse" },
  theadRow: { background: "#fafafa" },
  th: {
    textAlign: "left", padding: "12px 24px",
    fontSize: "13px", fontWeight: "600", color: "#777",
    borderBottom: "1px solid #f0f0f0"
  },
  tr: { transition: "background 0.15s" },
  td: { padding: "16px 24px", verticalAlign: "middle" },
  propImg: {
    width: "72px", height: "56px", objectFit: "cover",
    borderRadius: "10px", flexShrink: 0
  },
  avatar: {
    width: "38px", height: "38px", borderRadius: "50%",
    background: "#e8f5e9", color: "#2e7d32",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: "700", fontSize: "15px", flexShrink: 0
  },
  footer: {
    textAlign: "center", fontSize: "13px",
    color: "#aaa", paddingTop: "8px", paddingBottom: "8px"
  }
};