// import { useEffect, useState } from "react";
// import axios from "../../config/axios";

// export default function AdminRatings() {
//   const [ratings, setRatings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchRatings = async () => {
//     try {
//       const res = await axios.get("/admin/getall/rating");
//       setRatings(res.data);
//     } catch (err) {
//       console.error("Failed to load ratings", err);
//       alert("Unable to load ratings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRatings();
//   }, []);

//   if (loading) return <h3>Loading ratings...</h3>;

//   if (ratings.length === 0) {
//     return <h3>No ratings found</h3>;
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>⭐ Customer Ratings</h2>

//       {ratings.map((r) => (
//         <div
//           key={r._id}
//           style={{
//             border: "1px solid #ccc",
//             borderRadius: "10px",
//             padding: "15px",
//             marginBottom: "15px",
//             background: "#0e0b0b"
//           }}
//         >
//           <p><b>Design:</b> {r.design?.title}</p>
//           <p><b>Order Type:</b> {r.order?.eventType}</p>
//           <p><b>Order Status:</b> {r.order?.orderStatus}</p>

//           <p><b>Customer:</b> {r.user?.name}</p>
//           <p><b>Email:</b> {r.user?.email}</p>

//           <p>
//             <b>Rating:</b>{" "}
//             {"⭐".repeat(r.rating)} ({r.rating}/5)
//           </p>

//           {r.review && (
//             <p><b>Review:</b> {r.review}</p>
//           )}

//           <p style={{ fontSize: "12px", color: "gray" }}>
//             Rated on: {new Date(r.createdAt).toLocaleString()}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "../../config/axios";

export default function AdminRatings() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/admin/getall/rating", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRatings(Array.isArray(res.data) ? res.data : res.data.ratings);
      setLoading(false);

    //   setRatings(res.data);
    //   setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to load ratings");
      setLoading(false);
    }
  };

  if (loading) return <h3 style={{ color: "white" }}>Loading ratings...</h3>;

  return (
    <div style={styles.wrapper}>
      <button
  onClick={() => window.history.back()}
  style={{
    marginBottom: "15px",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer"
  }}
>
  ← Back
</button>

      <h2 style={styles.title}>⭐ All Customer Ratings</h2>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Design</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {ratings.map((r) => (
              <tr key={r._id}>
                <td>{r.user?.name || "N/A"}</td>
                <td>{r.user?.email || "-"}</td>
                <td>{r.design?.title || "Removed"}</td>
                <td>{"⭐".repeat(r.rating)}</td>
                <td>{r.review || "-"}</td>
                <td>{r.order?.orderStatus}</td>
                <td>{new Date(r.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  wrapper: {
    background: "#141212",
    padding: "20px",
    borderRadius: "12px",
    maxWidth: "1000px",
    margin: "auto"
  },
  title: {
    marginBottom: "15px",
    textAlign: "center"
  },
  tableWrapper: {
    overflowX: "auto"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  }
};
