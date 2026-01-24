import { useState } from "react";
import axios from "../config/axios";

export default function RatingBox({ orderId, designTitle }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const submitRating = async () => {
    if (!rating) {
      alert("Please select rating ⭐");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "/rating/add",
        {
          order: orderId,
          rating,
          review
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("✅ Thank you for your rating!");
      setSubmitted(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit rating");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <p style={{ color: "green" }}>⭐ Rating submitted successfully!</p>;
  }

  return (
    <div style={boxStyle}>
      <h4>Rate Design: {designTitle}</h4>

      {/* ⭐ Stars */}
      <div style={{ fontSize: "28px" }}>
        {[1, 2, 3, 4, 5].map((num) => (
          <span
            key={num}
            onClick={() => setRating(num)}
            style={{
              cursor: "pointer",
              color: num <= rating ? "gold" : "#ccc"
            }}
          >
            ★
          </span>
        ))}
      </div>

      {/* 📝 Review */}
      <textarea
        placeholder="Write your review (optional)"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        style={textareaStyle}
      />

      <button onClick={submitRating} disabled={loading} style={btnStyle}>
        {loading ? "Submitting..." : "Submit Rating"}
      </button>
    </div>
  );
}

const boxStyle = {
  marginTop: "15px",
  padding: "15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  background: "#fafafa"
};

const textareaStyle = {
  width: "100%",
  height: "70px",
  marginTop: "10px",
  padding: "8px"
};

const btnStyle = {
  marginTop: "10px",
  background: "#198754",
  color: "white",
  padding: "8px 16px",
  borderRadius: "5px",
  cursor: "pointer",
  border: "none"
};
