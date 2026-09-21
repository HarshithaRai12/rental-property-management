// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// export default function ViewRequests() {

//   const [requests, setRequests] = useState([])

//   useEffect(() => {
//     axios.get("https://rentease-backend-m0bo.onrender.com/request/getrequests")
//       .then((res) => {
//         setRequests(res.data)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }, [])

//   const handleStatus = (id, status) => {
//     axios.put(`https://rentease-backend-m0bo.onrender.com/request/updatestatus/${id}`, { status })
//       .then(() => {
//         alert("Status Updated")
//         setRequests(prev =>
//           prev.map(req =>
//             req._id === id ? { ...req, status } : req
//           )
//         )
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }

//   return (
//     <div style={{ padding: "20px" }}>

//       <h2 style={{ marginBottom: "20px" }}>All Requests</h2>

//       <table style={{
//         width: "100%",
//         borderCollapse: "collapse",
//         background: "#fff",
//         borderRadius: "10px",
//         overflow: "hidden"
//       }}>

//         <thead style={{ background: "#f5f5f5" }}>
//           <tr>
//             <th style={th}>Property</th>
//             <th style={th}>Tenant</th>
//             <th style={th}>Location</th>
//             <th style={th}>Status</th>
//             <th style={th}>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {requests.map((item) =>{
//             console.log(item)
//             return(
            
            

//             <tr key={item._id} style={{ borderBottom: "1px solid #eee" }}>
              

//               {/* PROPERTY */}
//               <td style={td}>
//                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

//                   <img
//                     src={
//                       item.propertyId.propertyimages?.length > 0
//                         ? `https://rentease-backend-m0bo.onrender.com/image/${item.propertyId.propertyimages[0]}`
//                         : `https://rentease-backend-m0bo.onrender.com/image/${item.propertyId.propertyimage}`
//                     }
//                     alt=""
//                     style={{
//                       width: "70px",
//                       height: "60px",
//                       objectFit: "cover",
//                       borderRadius: "8px"
//                     }}
//                   />

//                   <div>
//                     <b>{item.propertyId.title}</b>
//                     <p style={{ margin: 0, color: "#666" }}>
//                       ₹ {item.propertyId.price} / month
//                     </p>
//                   </div>

//                 </div>
//               </td>

//               {/* TENANT */}
//               <td style={td}>
//                 <b>{item.user?.name}</b>
//               </td>

//               {/* LOCATION */}
//               <td style={td}>
//                 {item.propertyId.location}
//               </td>

//               {/* STATUS */}
//               <td style={td}>
//                 <span style={getStatusStyle(item.status)}>
//                   {item.status}
//                 </span>
//               </td>

//               {/* ACTIONS */}
              
// <td style={td}>
//   <button
//     onClick={() => handleStatus(item._id, "approved")}
//     style={{
//       marginRight: "8px",
//       padding: "6px 12px",
//       borderRadius: "6px",
//       border: "1px solid green",
//       background: item.status === "approved" ? "green" : "white",
//       color: item.status === "approved" ? "white" : "green",
//       cursor: "pointer"
//     }}
//   >
//     Approve
//   </button>

//   <button
//     onClick={() => handleStatus(item._id, "rejected")}
//     style={{
//       padding: "6px 12px",
//       borderRadius: "6px",
//       border: "1px solid red",
//       background: item.status === "rejected" ? "red" : "white",
//       color: item.status === "rejected" ? "white" : "red",
//       cursor: "pointer"
//     }}
//   >
//     Reject
//   </button>
// </td>

//             </tr>
//           )})}
//         </tbody>

//       </table>

//     </div>
//   )
// }

// /* STYLES */

// const th = {
//   textAlign: "left",
//   padding: "12px"
// }

// const td = {
//   padding: "12px"
// }

// const approveBtn = {
//   padding: "6px 12px",
//   marginRight: "8px",
//   border: "1px solid green",
//   color: "green",
//   background: "white",
//   borderRadius: "6px",
//   cursor: "pointer"
// }

// const rejectBtn = {
//   padding: "6px 12px",
//   border: "1px solid red",
//   color: "red",
//   background: "white",
//   borderRadius: "6px",
//   cursor: "pointer"
// }

// const getStatusStyle = (status) => {
//   let bg = "#eee"
//   let color = "#333"

//   if (status === "approved") {
//     bg = "#d4edda"
//     color = "green"
//   } else if (status === "pending") {
//     bg = "#fff3cd"
//     color = "#856404"
//   } else if (status === "rejected") {
//     bg = "#f8d7da"
//     color = "red"
//   }

//   return {
//     padding: "5px 10px",
//     borderRadius: "6px",
//     background: bg,
//     color: color,
//     fontWeight: "bold"
//   }
// }

import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ITEMS_PER_PAGE = 5

export default function ViewRequests() {
  const [requests, setRequests] = useState([])
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showFilter, setShowFilter] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    axios.get("https://rentease-backend-m0bo.onrender.com/request/getrequests")
      .then((res) => setRequests(res.data))
      .catch((err) => console.log(err))
  }, [])

  const handleStatus = (id, status) => {
    axios.put(`https://rentease-backend-m0bo.onrender.com/request/updatestatus/${id}`, { status })
      .then(() => {
        alert("Status Updated")
        setRequests(prev =>
          prev.map(req => req._id === id ? { ...req, status } : req)
        )
      })
      .catch((err) => console.log(err))
  }

  // Stats
  const total = requests.length
  const approved = requests.filter(r => r.status === 'approved').length
  const pending = requests.filter(r => r.status === 'pending').length
  const rejected = requests.filter(r => r.status === 'rejected').length

  // Filter + Search
  const filtered = requests.filter(item => {
    const matchesSearch =
      item.propertyId?.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.user?.name?.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus
    return matchesSearch && matchesFilter
  })

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) +
      '\n' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>All Requests</h2>
          <p style={styles.subtitle}>Manage and respond to all property rental requests.</p>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.searchBox}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              style={styles.searchInput}
              placeholder="Search by property, tenant name..."
              value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1) }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <button style={styles.filterBtn} onClick={() => setShowFilter(!showFilter)}>
              ⚙ Filter
            </button>
            {showFilter && (
              <div style={styles.filterDropdown}>
                {['all', 'approved', 'pending', 'rejected'].map(f => (
                  <div
                    key={f}
                    style={{
                      ...styles.filterOption,
                      background: filterStatus === f ? '#e8f5e9' : 'white',
                      color: filterStatus === f ? '#2e7d32' : '#333'
                    }}
                    onClick={() => { setFilterStatus(f); setShowFilter(false); setCurrentPage(1) }}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        <StatCard icon="📋" label="Total Requests" value={total} color="#e8f5e9" iconColor="#2e7d32" />
        <StatCard icon="✅" label="Approved" value={approved} color="#e8f5e9" iconColor="#2e7d32" />
        <StatCard icon="🕐" label="Pending" value={pending} color="#fff8e1" iconColor="#f9a825" />
        <StatCard icon="❌" label="Rejected" value={rejected} color="#fce4ec" iconColor="#c62828" />
      </div>

      {/* Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.theadRow}>
              <th style={styles.th}>Property</th>
              <th style={styles.th}>Tenant</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>Requested On</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item) => (
              <tr key={item._id} style={styles.tr}>

                {/* Property */}
                <td style={styles.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                      <div style={{ fontWeight: '600', fontSize: '14px', color: '#111' }}>
                        {item.propertyId?.title}
                      </div>
                      <div style={{ fontSize: '13px', color: '#555', marginTop: '2px' }}>
                        ₹ {item.propertyId?.price?.toLocaleString('en-IN')} / month
                      </div>
                      <div style={{ fontSize: '12px', color: '#888', marginTop: '1px' }}>
                        {item.propertyId?.bhk}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Tenant */}
                <td style={styles.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={styles.avatar}>
                      {item.user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '14px' }}>{item.user?.name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{item.user?.email}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{item.user?.phone}</div>
                    </div>
                  </div>
                </td>

                {/* Location */}
                <td style={styles.td}>
                  <span style={{ fontSize: '14px', color: '#444' }}>{item.propertyId?.location}</span>
                </td>

                {/* Requested On */}
                <td style={styles.td}>
                  <div style={{ fontSize: '13px', color: '#444' }}>
                    {item.createdAt ? (
                      <>
                        <div>{new Date(item.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                        <div style={{ color: '#888' }}>{new Date(item.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
                      </>
                    ) : '—'}
                  </div>
                </td>

                {/* Status */}
                <td style={styles.td}>
                  <span style={getStatusStyle(item.status)}>{item.status}</span>
                </td>

                {/* Actions */}
                <td style={styles.td}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
  onClick={() => handleStatus(item._id, 'approved')}
  style={{
    ...styles.approveBtn,
    background: item.status === 'approved' ? '#2e7d32' : 'white',
    color: item.status === 'approved' ? 'white' : '#2e7d32'
  }}
>
  Approve
</button>

<button
  onClick={() => handleStatus(item._id, 'rejected')}
  style={{
    ...styles.rejectBtn,
    background: item.status === 'rejected' ? '#c62828' : 'white',
    color: item.status === 'rejected' ? 'white' : '#c62828'
  }}
>
  Reject
</button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={styles.pagination}>
          <span style={{ fontSize: '13px', color: '#666' }}>
            Showing {filtered.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
            {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} requests
          </span>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button
              style={styles.pageBtn}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                style={p === currentPage ? styles.pageBtnActive : styles.pageBtn}
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              style={styles.pageBtn}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >›</button>
          </div>
        </div>
      </div>

    </div>
  )
}

function StatCard({ icon, label, value, color, iconColor }) {
  return (
    <div style={{ ...styles.statCard }}>
      <div style={{ ...styles.statIcon, background: color, color: iconColor }}>{icon}</div>
      <div>
        <div style={styles.statLabel}>{label}</div>
        <div style={styles.statValue}>{value}</div>
      </div>
    </div>
  )
}

const getStatusStyle = (status) => {
  const base = {
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    display: 'inline-block'
  }
  if (status === 'approved') return { ...base, background: '#e8f5e9', color: '#2e7d32' }
  if (status === 'pending') return { ...base, background: '#fff8e1', color: '#f9a825' }
  if (status === 'rejected') return { ...base, background: '#fce4ec', color: '#c62828' }
  return { ...base, background: '#eee', color: '#555' }
}

const styles = {
  page: {
    padding: '28px 32px',
    background: '#f7f8fa',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', sans-serif"
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '12px'
  },
  title: { fontSize: '26px', fontWeight: '700', margin: 0, color: '#111' },
  subtitle: { margin: '4px 0 0', color: '#666', fontSize: '14px' },
  headerRight: { display: 'flex', gap: '12px', alignItems: 'center' },
  searchBox: {
    display: 'flex', alignItems: 'center', gap: '8px',
    background: 'white', border: '1px solid #ddd', borderRadius: '8px',
    padding: '8px 14px', width: '280px'
  },
  searchIcon: { fontSize: '14px', color: '#aaa' },
  searchInput: {
    border: 'none', outline: 'none', fontSize: '13px',
    color: '#333', width: '100%', background: 'transparent'
  },
  filterBtn: {
    padding: '8px 16px', borderRadius: '8px', border: '1px solid #ddd',
    background: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: '500', color: '#333'
  },
  filterDropdown: {
    position: 'absolute', top: '40px', right: 0, background: 'white',
    border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    zIndex: 100, minWidth: '130px', overflow: 'hidden'
  },
  filterOption: {
    padding: '10px 16px', cursor: 'pointer', fontSize: '13px',
    borderBottom: '1px solid #f5f5f5'
  },
  statsRow: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px', marginBottom: '24px'
  },
  statCard: {
    background: 'white', borderRadius: '12px', padding: '18px 20px',
    display: 'flex', alignItems: 'center', gap: '16px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
  },
  statIcon: {
    width: '48px', height: '48px', borderRadius: '12px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '22px', flexShrink: 0
  },
  statLabel: { fontSize: '13px', color: '#888', marginBottom: '4px' },
  statValue: { fontSize: '26px', fontWeight: '700', color: '#111' },
  tableWrapper: {
    background: 'white', borderRadius: '12px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden'
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  theadRow: { background: '#fafafa', borderBottom: '1px solid #eee' },
  th: {
    textAlign: 'left', padding: '14px 16px',
    fontSize: '13px', fontWeight: '600', color: '#555'
  },
  tr: { borderBottom: '1px solid #f2f2f2', transition: 'background 0.15s' },
  td: { padding: '14px 16px', verticalAlign: 'middle' },
  propImg: {
    width: '72px', height: '56px', objectFit: 'cover',
    borderRadius: '8px', flexShrink: 0
  },
  avatar: {
    width: '36px', height: '36px', borderRadius: '50%',
    background: '#e8f5e9', color: '#2e7d32',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: '700', fontSize: '15px', flexShrink: 0
  },
  approveBtn: {
    padding: '6px 14px', borderRadius: '7px',
    border: '1.5px solid #2e7d32', background: 'white',
    color: '#2e7d32', cursor: 'pointer', fontSize: '13px', fontWeight: '500'
  },
  rejectBtn: {
    padding: '6px 14px', borderRadius: '7px',
    border: '1.5px solid #c62828', background: 'white',
    color: '#c62828', cursor: 'pointer', fontSize: '13px', fontWeight: '500'
  },
  pagination: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '16px 20px', borderTop: '1px solid #f2f2f2'
  },
  pageBtn: {
    width: '34px', height: '34px', borderRadius: '7px',
    border: '1px solid #ddd', background: 'white',
    cursor: 'pointer', fontSize: '14px', color: '#444'
  },
  pageBtnActive: {
    width: '34px', height: '34px', borderRadius: '7px',
    border: 'none', background: '#1b5e20',
    cursor: 'pointer', fontSize: '14px', color: 'white', fontWeight: '600'
  }
}