import { useEffect, useState } from "react";
import axios from "../../config/axios";

export default function AdminRatings() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRatings = async () => {
    try {
      const res = await axios.get("/admin/getall/rating");
      setRatings(res.data);
    } catch (err) {
      console.error("Failed to load ratings", err);
      alert("Unable to load ratings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  if (loading) return <h3>Loading ratings...</h3>;

  if (ratings.length === 0) {
    return <h3>No ratings found</h3>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>⭐ Customer Ratings</h2>

      {ratings.map((r) => (
        <div
          key={r._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "15px",
            background: "#0e0b0b"
          }}
        >
          <p><b>Design:</b> {r.design?.title}</p>
          <p><b>Order Type:</b> {r.order?.eventType}</p>
          <p><b>Order Status:</b> {r.order?.orderStatus}</p>

          <p><b>Customer:</b> {r.user?.name}</p>
          <p><b>Email:</b> {r.user?.email}</p>

          <p>
            <b>Rating:</b>{" "}
            {"⭐".repeat(r.rating)} ({r.rating}/5)
          </p>

          {r.review && (
            <p><b>Review:</b> {r.review}</p>
          )}

          <p style={{ fontSize: "12px", color: "gray" }}>
            Rated on: {new Date(r.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
