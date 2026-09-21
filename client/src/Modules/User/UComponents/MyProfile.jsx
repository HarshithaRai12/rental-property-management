
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("UserToken");
    axios.get("https://rentease-backend-m0bo.onrender.com/user/getprofile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        setUser(res.data.udata);
        setFormData({
          name: res.data.udata.name || "",
          phone: res.data.udata.phone || "",
          address: res.data.udata.address || ""
        });
      })
      .catch((err) => console.log(err));

       axios.get("https://rentease-backend-m0bo.onrender.com/request/myrequests", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then((res) => {
    console.log("REQUEST DATA 👉", res.data.data);
    setRequests(res.data.data);
  })
  .catch((err) => console.log(err));
  }, []);
  

  const totalRequests = requests.length;

const approvedRequests = requests.filter(
  (req) => req.status === "approved"
).length;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("UserToken");
      const res = await axios.put(
        "https://rentease-backend-m0bo.onrender.com/user/updateprofile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profile updated ✅");
      setUser(res.data.user);
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return (
    <div style={{ padding: "40px", fontFamily: "'Segoe UI', sans-serif" }}>
      <h2 style={{ color: "#555" }}>Loading...</h2>
    </div>
  );

  // Derive member since from user createdAt or fallback
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : "May 2026";

  // Avatar initials fallback
  const initials = user.name ? user.name.charAt(0).toUpperCase() : "U";

  const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const token = localStorage.getItem("UserToken");

    const res = await axios.put(
      "https://rentease-backend-m0bo.onrender.com/user/uploadprofileimage",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    alert("Image uploaded ✅");

    setUser(res.data.user);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div style={{
      padding: "40px 60px",
      minHeight: "100vh",
      background: "#f4f6f4",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box"
    }}>

      {/* ── Page Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <h1 style={{ color: "#1e7e1e", fontSize: "32px", fontWeight: "700", margin: "0 0 6px 0" }}>
            My Profile
          </h1>
          <p style={{ color: "#666", margin: 0, fontSize: "14px" }}>
            Manage your personal information and account details.
          </p>
        </div>

        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "#1e7e1e", color: "white",
              padding: "11px 22px", border: "none",
              borderRadius: "8px", cursor: "pointer",
              fontSize: "14px", fontWeight: "600"
            }}
          >
            <span>👤</span> Edit Profile
          </button>
        ) : (
          <button
            onClick={() => setEditMode(false)}
            style={{
              background: "#e53935", color: "white",
              padding: "11px 22px", border: "none",
              borderRadius: "8px", cursor: "pointer",
              fontSize: "14px", fontWeight: "600"
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* ── Main Profile Card ── */}
      <div style={{
        background: "white", borderRadius: "16px",
        boxShadow: "0 2px 14px rgba(0,0,0,0.07)",
        display: "flex", overflow: "hidden", marginBottom: "24px"
      }}>

        {/* Left: Avatar + Name */}
        <div style={{
          width: "280px", flexShrink: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "40px 24px",
          borderRight: "1px solid #f0f0f0",
          background: "#fafafa"
        }}>
          {/* Avatar */}
          <div style={{ position: "relative", marginBottom: "16px" }}>
            {user.profileImage ? (
              <img
                src={`https://rentease-backend-m0bo.onrender.com/image/${user.profileImage}`}
                alt={user.name}
                style={{
                  width: "120px", height: "120px",
                  borderRadius: "50%", objectFit: "cover",
                  border: "3px solid #e0e0e0"
                }}
              />
            ) : (
              <div style={{
                width: "120px", height: "120px", borderRadius: "50%",
                background: "#ccc", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: "48px", fontWeight: "700", color: "white",
                border: "3px solid #e0e0e0"
              }}>
                {initials}
              </div>
            )}
            {/* Camera badge */}
            <div style={{
              position: "absolute", bottom: "4px", right: "4px",
              background: "white", borderRadius: "50%",
              width: "32px", height: "32px",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              cursor: "pointer", fontSize: "16px"
            }}>
              
              <input
  type="file"
  accept="image/*"
  onChange={handleImageUpload}
  style={{ display: "none" }}
  id="uploadImage"
/>

<label htmlFor="uploadImage">
  <div style={{
    position: "absolute",
    bottom: "4px",
    right: "4px",
    background: "white",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  }}>
    📷
  </div>
</label>
            </div>
          </div>

          <h2 style={{ margin: "0 0 8px 0", fontSize: "22px", fontWeight: "700", color: "#111" }}>
            {user.name}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#666", fontSize: "13px" }}>
            <span>📅</span>
            <span>Member since {memberSince}</span>
          </div>
        </div>

        {/* Right: Personal Information */}
        <div style={{ flex: 1, padding: "32px 36px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <span style={{ color: "#1e7e1e", fontSize: "18px" }}>👤</span>
            <h3 style={{ margin: 0, color: "#1e7e1e", fontSize: "17px", fontWeight: "700" }}>
              Personal Information
            </h3>
          </div>

          {editMode ? (
            /* ── Edit Form ── */
            <div>
              <EditField label="Full Name" name="name" value={formData.name} onChange={handleChange} icon="👤" />
              <EditField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} icon="📞" />
              <EditField label="Address" name="address" value={formData.address} onChange={handleChange} icon="📍" />
              <button
                onClick={handleUpdate}
                style={{
                  marginTop: "10px",
                  background: "#1e7e1e", color: "white",
                  padding: "12px 32px", border: "none",
                  borderRadius: "8px", cursor: "pointer",
                  fontSize: "15px", fontWeight: "600"
                }}
              >
                Save Changes
              </button>
            </div>
          ) : (
            /* ── View Mode ── */
            <div>
              <InfoRow icon="👤" label="Full Name" value={user.name} />
              <InfoRow icon="✉️" label="Email Address" value={user.email} />
              <InfoRow icon="📞" label="Phone Number" value={user.phone || "—"} />
              <InfoRow icon="📍" label="Address" value={user.address || "—"} />
              <InfoRow
                icon="🛡️"
                label="Account Type"
                value={
                  <span style={{
                    background: "#e8f5e9", color: "#1e7e1e",
                    padding: "3px 14px", borderRadius: "20px",
                    fontSize: "13px", fontWeight: "500",
                    border: "1px solid #c8e6c9"
                  }}>
                    User
                  </span>
                }
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
        {/* Requests stat */}
        <StatCard
          iconBg="#e8f5e9"
          iconColor="#1e7e1e"
          icon="🏠"
          count={totalRequests}
          label="Requests"
          sub="Total property requests"
        />
        {/* Approved stat */}
        <StatCard
          iconBg="#e3f0ff"
          iconColor="#1565c0"
          icon="🏠"
          count={approvedRequests}
          label={<span style={{ color: "#1565c0", fontWeight: "700" }}>Approved</span>}
          sub="Approved requests"
          countColor="#1565c0"
        />
      </div>

      {/* ── Recent Activity ── */}
      <div style={{
        background: "white", borderRadius: "16px",
        boxShadow: "0 2px 14px rgba(0,0,0,0.07)",
        padding: "24px 28px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
          <span style={{ color: "#1e7e1e" }}>🕐</span>
          <h3 style={{ margin: 0, color: "#1e7e1e", fontSize: "17px", fontWeight: "700" }}>
            Recent Activity
          </h3>
        </div>

        {/* Activity Item */}
        {user.recentActivity ? (
          <ActivityItem activity={user.recentActivity} />
        ) : (
          /* Fallback demo row */
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 0",
            borderBottom: "1px solid #f0f0f0"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{
                width: "72px", height: "56px", borderRadius: "8px",
                background: "#e0e0e0", overflow: "hidden", flexShrink: 0
              }}>
                {requests.length > 0 && requests[0]?.propertyId?.propertyimage && (
  <img
    src={`https://rentease-backend-m0bo.onrender.com/image/${requests[0].propertyId.propertyimage}`}
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
    alt=""
  />
)}
              </div>
              <div>
                <p style={{ margin: "0 0 4px 0", fontWeight: "600", fontSize: "15px", color: "#111" }}>
                  Requested for {user.recentPropertyTitle || "3BHK Villa"}
                </p>
                <p style={{ margin: "0 0 4px 0", color: "#777", fontSize: "13px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>📍</span> {user.recentPropertyLocation || "Mangalore"}
                </p>
                <p style={{ margin: 0, fontSize: "13px", color: "#333" }}>
                  Status:{" "}
                  <span style={{ color: "#1e7e1e", fontWeight: "700" }}>Approved</span>
                </p>
              </div>
            </div>
            <span style={{ color: "#aaa", fontSize: "13px", whiteSpace: "nowrap" }}>
              May 12, 2026
            </span>
          </div>
        )}

        {/* View All */}
        <button
          onClick={() => navigate("/myrequests")}
          style={{
            display: "block", width: "100%",
            marginTop: "16px", padding: "13px",
            background: "white", color: "#1e7e1e",
            border: "1.5px solid #e0e0e0", borderRadius: "10px",
            cursor: "pointer", fontSize: "14px", fontWeight: "600",
            textAlign: "center"
          }}
        >
          View All Requests
        </button>
      </div>

    

    </div>
  );
}

/* ── Sub-components ── */

function InfoRow({ icon, label, value }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between",
      alignItems: "center", padding: "13px 0",
      borderBottom: "1px solid #f4f4f4"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#777", minWidth: "180px" }}>
        <span style={{ fontSize: "16px" }}>{icon}</span>
        <span style={{ fontSize: "14px" }}>{label}</span>
      </div>
      <div style={{ color: "#111", fontSize: "14px", fontWeight: "500", textAlign: "right" }}>
        {value}
      </div>
    </div>
  );
}

function EditField({ label, name, value, onChange, icon }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <label style={{
        display: "flex", alignItems: "center", gap: "6px",
        fontSize: "13px", color: "#555", marginBottom: "6px"
      }}>
        <span>{icon}</span> {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: "100%", padding: "10px 14px",
          border: "1.5px solid #ddd", borderRadius: "8px",
          fontSize: "14px", color: "#111",
          outline: "none", boxSizing: "border-box",
          fontFamily: "inherit"
        }}
      />
    </div>
  );
}

function StatCard({ iconBg, iconColor, icon, count, label, sub, countColor }) {
  return (
    <div style={{
      background: "white", borderRadius: "14px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
      padding: "22px 26px",
      display: "flex", alignItems: "center", gap: "20px"
    }}>
      <div style={{
        width: "56px", height: "56px", borderRadius: "50%",
        background: iconBg, display: "flex",
        alignItems: "center", justifyContent: "center",
        fontSize: "24px", flexShrink: 0
      }}>
        {icon}
      </div>
      <div>
        <div style={{
          fontSize: "30px", fontWeight: "700",
          color: countColor || "#111", lineHeight: 1.1
        }}>
          {count}
        </div>
        <div style={{ fontWeight: "700", fontSize: "15px", color: countColor || "#111", margin: "2px 0 2px 0" }}>
          {label}
        </div>
        <div style={{ fontSize: "13px", color: "#888" }}>{sub}</div>
      </div>
    </div>
  );
}

function ActivityItem({ activity }) {
  return (
    <div style={{
      display: "flex", alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 0", borderBottom: "1px solid #f0f0f0"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{
          width: "72px", height: "56px", borderRadius: "8px",
          background: "#e0e0e0", overflow: "hidden", flexShrink: 0
        }}>
          {activity.image && (
            <img
              src={`https://rentease-backend-m0bo.onrender.com/image/${activity.image}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt=""
            />
          )}
        </div>
        <div>
          <p style={{ margin: "0 0 4px 0", fontWeight: "600", fontSize: "15px", color: "#111" }}>
            Requested for {activity.propertyTitle}
          </p>
          <p style={{ margin: "0 0 4px 0", color: "#777", fontSize: "13px" }}>
            📍 {activity.location}
          </p>
          <p style={{ margin: 0, fontSize: "13px", color: "#333" }}>
            Status:{" "}
            <span style={{ color: "#1e7e1e", fontWeight: "700" }}>
              {activity.status}
            </span>
          </p>
        </div>
      </div>
      <span style={{ color: "#aaa", fontSize: "13px", whiteSpace: "nowrap" }}>
        {new Date(activity.date).toLocaleDateString("en-IN", {
          day: "numeric", month: "short", year: "numeric"
        })}
      </span>
    </div>
  );
}