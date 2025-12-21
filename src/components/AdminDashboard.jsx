// import { useEffect, useContext, useState } from "react";
// import axios from "../config/axios";
// import UserContext from "../context/UserContext";

// export default function AdminDashboard() {
//   const { user } = useContext(UserContext);
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     if (user?.role === "admin") {
//       axios
//         .get("/admin/users", {
//           headers: { Authorization: localStorage.getItem("token") },
//         })
//         .then((res) => setUsers(res.data))
//         .catch(() => alert("Failed to load users"));
//     }
//   }, [user]);

//   if (user?.role !== "admin") return <p>Unauthorized</p>;

//   return (
//     <div>
//       <h2>Admin Dashboard</h2>
//       {users.map((u) => (
//         <div key={u._id}>
//           <p>{u.name} - {u.email} ({u.role})</p>
//         </div>
//       ))}
//     </div>
//   );
// }


// import { useState, useContext } from "react";
// import axios from "../config/axios";
// import UserContext from "../context/UserContext";
// import "../styles/admin.css";

// export default function AdminDashboard() {
//   const { user } = useContext(UserContext);
//   const [customers, setCustomers] = useState([]);
//   const [error, setError] = useState("");
  

//   const fetchCustomers = async () => {
//     try {
//       const res = await axios.get("/admin/users", {
//         headers: { Authorization: localStorage.getItem("token") }
//       });
//       setCustomers(res.data);
//     } catch (err) {
//         console.log(err);
//       setError("Unable to fetch customers");
//     }
//   };

//   if (user?.role !== "admin") {
//     return <p className="error">Unauthorized access</p>;
//   }

//   return (
//     <div className="admin-container">
//       <h2>Admin Dashboard</h2>

//       <button className="btn" onClick={fetchCustomers}>
//         View All Customers
//       </button>

//       {error && <p className="error">{error}</p>}

//       {customers.length > 0 && (
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//             </tr>
//           </thead>
//           <tbody>
//             {customers.map((c) => (
//               <tr key={c._id}>
//                 <td>{c.name}</td>
//                 <td>{c.email}</td>
//                 <td>{c.phone}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


// import { useState, useContext } from "react";
// import axios from "../config/axios";
// import UserContext from "../context/UserContext";
// import "../styles/admin.css";

// export default function AdminDashboard() {
//   const { user } = useContext(UserContext);

//   const [customers, setCustomers] = useState([]);
//   const [error, setError] = useState("");

  
  
//   // 🔹 FETCH CUSTOMERS
//   const fetchCustomers = async () => {
//     try {
//       const res = await axios.get("/admin/users", {
//         headers: { Authorization: localStorage.getItem("token") }
//       });
//       setCustomers(res.data);
//       setError("");
//     } catch (err) {
//         console.log(err);
//       setError("Unable to fetch customers");
//     }
//   };

//   // 🔹 AUTH CHECK
//   if (user?.role !== "admin") {
//     return <p className="error">Unauthorized access</p>;
//   }

//   // 🔹 DELETE CUSTOMER
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this customer?")) return;

//     try {
//       await axios.delete(`/delete/user/${id}`, {
//         headers: { Authorization: localStorage.getItem("token") }
//       });
//       fetchCustomers();
//     } catch {
//       alert("Delete failed");
//     }
//   };

  
  

  

//   return (
//     <div className="admin-container">
//       <h2>Admin Dashboard</h2>

//       <button className="btn" onClick={fetchCustomers}>
//         View All Customers
//       </button>

//       {error && <p className="error">{error}</p>}

//       {/* ================= EDIT FORM (ADD THIS HERE) ================= */}
      
//           <input
//             type="text"
//             placeholder="Name"
//             value={formData.name}
//             onChange={(e) =>
//               setFormData({ ...formData, name: e.target.value })
//             }
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//           />

//           <input
//             type="text"
//             placeholder="Phone"
//             value={formData.phone}
//             onChange={(e) =>
//               setFormData({ ...formData, phone: e.target.value })
//             }
//           />

          

//       {customers.length > 0 && (
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {customers.map((c) => (
//               <tr key={c._id}>
//                 <td>{c.name}</td>
//                 <td>{c.email}</td>
//                 <td>{c.phone}</td>
//                 <td>
                  
//                   <button
//                     className="btn danger"
//                     onClick={() => handleDelete(c._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


import { useState, useContext } from "react";
import axios from "../config/axios";
import UserContext from "../context/UserContext";
import "../styles/admin.css";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { user} = useContext(UserContext);

  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false); // 🔹 IMPORTANT FIX

  // 🔹 FETCH CUSTOMERS
  const fetchCustomers = async () => {
    try {
      const res = await axios.get("/admin/users", {
        headers: { Authorization: localStorage.getItem("token") }
      });

      // only customers
      const onlyCustomers = res.data.filter(
        (u) => u.role === "customer"
      );

      setCustomers(onlyCustomers);
      setLoaded(true);      // 🔹 mark as loaded
      setError("");
    } catch (err) {
      console.log(err);
      setError("Unable to fetch customers");
      setLoaded(true);
    }
  };

  // 🔹 AUTH CHECK
  if (user?.role !== "admin") {
    return <p className="error">Unauthorized access</p>;
  }

  // 🔹 DELETE CUSTOMER
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await axios.delete(`/delete/user/${id}`, {
        headers: { Authorization: localStorage.getItem("token") }
      });

      // remove deleted user from UI (no refetch needed)
      setCustomers(customers.filter((c) => c._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      {/* 🔹 SHOW BUTTON ONLY BEFORE LOADING */}
      {!loaded && (
        <button className="btn" onClick={fetchCustomers}>
          View All Customers
        </button>
      )}

      {error && <p className="error">{error}</p>}

      {/* 🔹 AFTER LOADING */}
      {loaded && customers.length === 0 && (
        <p className="info">No customers found</p>
      )}

      {customers.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>
                  <button
                    className="btn danger"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
      
      
    </div>
  );
}
