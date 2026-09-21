import React from "react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#2e7d32" opacity="0.15" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Trusted & Verified",
    desc: "All properties and users are verified for a safe and reliable rental experience.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#2e7d32" opacity="0.12" stroke="#2e7d32" strokeWidth="2"/>
        <text x="12" y="17" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#2e7d32">₹</text>
      </svg>
    ),
    title: "Affordable Options",
    desc: "Find rental homes that fit your budget without compromising on comfort.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" fill="#2e7d32" opacity="0.15" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Quick & Easy",
    desc: "Search, request and connect in just a few clicks. Renting made simple.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.39 18a19.5 19.5 0 0 1-4.5-4.5A19.79 19.79 0 0 1 3.07 4.18 2 2 0 0 1 5.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" fill="#2e7d32" opacity="0.15" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Support You Can Count On",
    desc: "Our support team is always here to help you at every step.",
  },
];

const stats = [
  {
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="#2e7d32" opacity="0.2" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="9 22 9 12 15 12 15 22" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    value: "1000+",
    label: "Properties Listed",
  },
  {
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill="#2e7d32" opacity="0.15" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" fill="#2e7d32" opacity="0.15" stroke="#2e7d32" strokeWidth="2"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    value: "500+",
    label: "Happy Tenants",
  },
  {
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#2e7d32" stroke="#2e7d32" strokeWidth="2"/>
        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    value: "800+",
    label: "Successful Requests",
  },
  {
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" fill="#2e7d32" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    value: "4.8/5",
    label: "User Rating",
  },
];

export default function About() {
  const navigate = useNavigate();
  return (
    <div style={{ background: "#f5f7f5", minHeight: "80vh", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Hero Section */}
      <div style={{
        padding: "60px 60px 40px 60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 40,
        flexWrap: "wrap",
      }}>
        {/* Left Text */}
        <div style={{ flex: "1 1 360px", maxWidth: 480 }}>
          {/* <p style={{
            color: "#2e7d32",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}>
            About Us
          </p> */}
          <h1 style={{
            fontSize: 40,
            fontWeight: 800,
            color: "#1a1a1a",
            margin: "0 0 12px",
            lineHeight: 1.15,
          }}>
            About RentalHome
          </h1>
          <div style={{ width: 48, height: 4, background: "#2e7d32", borderRadius: 2, marginBottom: 22 }} />
          <p style={{ fontSize: 16, color: "#444", lineHeight: 1.7, marginBottom: 6 }}>
            RentalHome is a platform that connects people with affordable and trusted rental properties.
          </p>
          <p style={{ fontSize: 16, color: "#444", lineHeight: 1.7, marginBottom: 30 }}>
            We make renting simple, transparent, and hassle-free for both tenants and property owners.
          </p>
          <button 
          onClick={() => navigate("/browse")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "#2e7d32",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "13px 28px",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(46,125,50,0.3)",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="9 22 9 12 15 12 15 22" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Browse Properties
          </button>
        </div>

        {/* Right Illustration */}
        <div style={{ flex: "1 1 300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{
            width: 380,
            height: 280,
            background: "linear-gradient(135deg, #e8f5e9 60%, #c8e6c9 100%)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}>
            {/* House SVG Illustration */}
            <svg width="280" height="230" viewBox="0 0 280 230" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Trees */}
              <ellipse cx="38" cy="130" rx="22" ry="22" fill="#4caf50" opacity="0.85"/>
              <rect x="34" y="148" width="8" height="30" rx="3" fill="#388e3c"/>
              <ellipse cx="240" cy="125" rx="26" ry="26" fill="#43a047" opacity="0.8"/>
              <rect x="236" y="145" width="8" height="35" rx="3" fill="#2e7d32"/>
              <ellipse cx="215" cy="145" rx="18" ry="18" fill="#66bb6a" opacity="0.7"/>
              <rect x="212" y="158" width="6" height="22" rx="3" fill="#388e3c"/>

              {/* House body */}
              <rect x="65" y="110" width="155" height="90" rx="4" fill="white" stroke="#e0e0e0" strokeWidth="1.5"/>

              {/* Roof */}
              <polygon points="55,112 142,50 228,112" fill="#2e7d32"/>
              <polygon points="65,112 142,58 218,112" fill="#1b5e20"/>

              {/* Chimney */}
              <rect x="170" y="58" width="18" height="30" rx="2" fill="#616161"/>
              <rect x="167" y="55" width="24" height="8" rx="2" fill="#424242"/>

              {/* Door */}
              <rect x="117" y="148" width="36" height="52" rx="4" fill="#1b5e20"/>
              <circle cx="148" cy="175" r="3" fill="#a5d6a7"/>

              {/* Windows */}
              <rect x="78" y="128" width="38" height="32" rx="3" fill="#b2dfdb" stroke="#80cbc4" strokeWidth="1.5"/>
              <line x1="97" y1="128" x2="97" y2="160" stroke="#80cbc4" strokeWidth="1.2"/>
              <line x1="78" y1="144" x2="116" y2="144" stroke="#80cbc4" strokeWidth="1.2"/>
              <rect x="168" y="128" width="38" height="32" rx="3" fill="#b2dfdb" stroke="#80cbc4" strokeWidth="1.5"/>
              <line x1="187" y1="128" x2="187" y2="160" stroke="#80cbc4" strokeWidth="1.2"/>
              <line x1="168" y1="144" x2="206" y2="144" stroke="#80cbc4" strokeWidth="1.2"/>

              {/* Ground */}
              <rect x="60" y="196" width="165" height="8" rx="4" fill="#c8e6c9"/>

              {/* For Rent sign */}
              <rect x="95" y="170" width="50" height="30" rx="4" fill="#2e7d32"/>
              <text x="120" y="182" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">FOR</text>
              <text x="120" y="194" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">RENT</text>
              <rect x="118" y="198" width="4" height="10" fill="#1b5e20"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div style={{ textAlign: "center", padding: "10px 60px 16px" }}>
        <p style={{
          color: "#2e7d32",
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: 8,
        }}>
          Why Choose Us
        </p>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a1a", margin: 0 }}>
          Making Renting Better for Everyone
        </h2>
      </div>

      {/* Feature Cards */}
      <div style={{
        padding: "20px 60px 40px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 20,
      }}>
        {features.map((f, i) => (
          <div key={i} style={{
            background: "white",
            borderRadius: 12,
            padding: "24px 22px",
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            border: "1px solid #f0f4f0",
          }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "#e8f5e9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              {f.icon}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a", marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 13.5, color: "#666", lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{
        margin: "0 60px 60px",
        padding: "0",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 0,
        background: "white",
        borderRadius: 14,
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        border: "1px solid #f0f4f0",
        overflow: "hidden",
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "28px 24px",
            borderRight: i < stats.length - 1 ? "1px solid #f0f4f0" : "none",
          }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "#e8f5e9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              {s.icon}
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#2e7d32" }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "#666", marginTop: 2 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}