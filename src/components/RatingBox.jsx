// import { useState } from "react";
// import axios from "../config/axios";

// export default function RatingBox({ orderId, designTitle }) {
//   const [rating, setRating] = useState(0);
//   const [review, setReview] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");

//   const submitRating = async () => {
//     if (!rating) {
//       alert("Please select rating ⭐");
//       return;
//     }

//     try {
//       setLoading(true);

//       await axios.post(
//         "/rating/add",
//         {
//           order: orderId,
//           rating,
//           review
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       alert("✅ Thank you for your rating!");
//       setSubmitted(true);
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to submit rating");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (submitted) {
//     return <p style={{ color: "green" }}>⭐ Rating submitted successfully!</p>;
//   }

//   return (
//     <div style={boxStyle}>
//       <h4>Rate Design: {designTitle}</h4>

      
//       <div style={{ fontSize: "28px" }}>
//         {[1, 2, 3, 4, 5].map((num) => (
//           <span
//             key={num}
//             onClick={() => setRating(num)}
//             style={{
//               cursor: "pointer",
//               color: num <= rating ? "gold" : "#ccc"
//             }}
//           >
//             ★
//           </span>
//         ))}
//       </div>

      
//       <textarea
//         placeholder="Write your review (optional)"
//         value={review}
//         onChange={(e) => setReview(e.target.value)}
//         style={textareaStyle}
//       />

//       <button onClick={submitRating} disabled={loading} style={btnStyle}>
//         {loading ? "Submitting..." : "Submit Rating"}
//       </button>
//     </div>
//   );
// }

// const boxStyle = {
//   marginTop: "15px",
//   padding: "15px",
//   border: "1px solid #ddd",
//   borderRadius: "8px",
//   background: "#fafafa"
// };

// const textareaStyle = {
//   width: "100%",
//   height: "70px",
//   marginTop: "10px",
//   padding: "8px"
// };

// const btnStyle = {
//   marginTop: "10px",
//   background: "#198754",
//   color: "white",
//   padding: "8px 16px",
//   borderRadius: "5px",
//   cursor: "pointer",
//   border: "none"
// };


// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addRating, resetRating } from "../redux/rating/ratingSlice";

// export default function RatingBox({ orderId }) {
//   const dispatch = useDispatch();

//   const { loading, error, success } = useSelector(
//     (state) => state.rating
//   );

//   const [rating, setRating] = useState(0);
//   const [review, setReview] = useState("");

//   const submitRating = () => {
//     if (!rating) {
//       alert("Please select a rating ⭐");
//       return;
//     }

//     console.log("📤 Submitting rating:", {
//       order: orderId,
//       rating,
//       review
//     });

//     dispatch(
//       addRating({
//         order: orderId,
//         rating: Number(rating),
//         review
//       })
//     );
//   };

//   useEffect(() => {
//     if (success) {
//       alert("✅ Rating submitted successfully!");
//       setRating(0);
//       setReview("");
//       dispatch(resetRating());
//     }
//   }, [success, dispatch]);

//   useEffect(() => {
//     if (error) {
//       console.error("❌ Rating error:", error);
//       alert(error);
//     }
//   }, [error]);

//   return (
//     <div style={boxStyle}>
//       <h4>Rate this order</h4>

//       <select
//         value={rating}
//         onChange={(e) => setRating(e.target.value)}
//         style={selectStyle}
//       >
//         <option value="">Select rating</option>
//         {[1, 2, 3, 4, 5].map((n) => (
//           <option key={n} value={n}>
//             {n} ⭐
//           </option>
//         ))}
//       </select>

//       <textarea
//         placeholder="Write your review (optional)"
//         value={review}
//         onChange={(e) => setReview(e.target.value)}
//         style={textareaStyle}
//       />

//       <button
//         onClick={submitRating}
//         disabled={loading}
//         style={btnStyle}
//       >
//         {loading ? "Submitting..." : "Submit Rating"}
//       </button>
//     </div>
//   );
// }

// /* ================== STYLES ================== */

// const boxStyle = {
//   marginTop: "15px",
//   padding: "15px",
//   border: "1px solid #ddd",
//   borderRadius: "8px",
//   background: "#fafafa",
// };

// const selectStyle = {
//   width: "100%",
//   padding: "6px",
//   marginBottom: "10px",
// };

// const textareaStyle = {
//   width: "100%",
//   height: "70px",
//   padding: "8px",
//   marginBottom: "10px",
// };

// const btnStyle = {
//   background: "#198754",
//   color: "white",
//   padding: "8px 16px",
//   borderRadius: "5px",
//   cursor: "pointer",
//   border: "none",
// };


// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addRating } from "../redux/rating/ratingSlice";

// export default function RatingBox({ orderId }) {
//   const dispatch = useDispatch();

//   const [rating, setRating] = useState("");
//   const [review, setReview] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorShown, setErrorShown] = useState(false);

//   const submitRating = async () => {
//     if (!rating) {
//       alert("Please select rating ⭐");
//       return;
//     }

//     if (loading) return; // 🔒 stop multiple clicks

//     try {
//       setLoading(true);

//       await dispatch(
//         addRating({
//           order: orderId,
//           rating,
//           review
//         })
//       ).unwrap();

//       alert("✅ Rating submitted successfully");
//     } catch (err) {
//       if (!errorShown) {
//         alert(err || "Rating not allowed");
//         setErrorShown(true); // 🚫 show only once
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ border: "1px solid #ccc", padding: 12 }}>
//       <h4>Rate this order</h4>

//       <select
//         value={rating}
//         onChange={(e) => setRating(e.target.value)}
//         disabled={loading}
//       >
//         <option value="">Select rating</option>
//         {[1, 2, 3, 4, 5].map((n) => (
//           <option key={n} value={n}>
//             {n} ⭐
//           </option>
//         ))}
//       </select>

//       <br /><br />

//       <textarea
//         placeholder="Write review (optional)"
//         value={review}
//         onChange={(e) => setReview(e.target.value)}
//         disabled={loading}
//       />

//       <br /><br />

//       <button
//         onClick={submitRating}
//         disabled={loading}
//         style={{
//           background: loading ? "#999" : "#198754",
//           color: "white",
//           padding: "8px 16px",
//           border: "none",
//           cursor: loading ? "not-allowed" : "pointer"
//         }}
//       >
//         {loading ? "Submitting..." : "Submit Rating"}
//       </button>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "../config/axios";

export default function RatingBox({ orderId }) {
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkRating();
  }, []);

  const checkRating = async () => {
    try {
      const res = await axios.get(`/rating/check/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (res.data.rated) {
        setDisabled(true);
        setRating(res.data.rating.rating);
        setReview(res.data.rating.review || "");
        setMessage("✅ You already rated this order");
      }
    } catch (err) {
      console.log("Rating check failed");
    }
  };

  const submitRating = async () => {
    if (!rating) return alert("Select rating ⭐");

    try {
      setLoading(true);

      await axios.post(
        "/rating/add",
        { order: orderId, rating, review },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setMessage("✅ Rating submitted successfully");
      setDisabled(true);
    } catch (err) {
      setMessage(err.response?.data?.message || "Rating failed");
      setDisabled(true); // 🔥 stop repeat clicking
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: 15, borderRadius: 6 }}>
      <h4>Rate Order</h4>

      {message && <p style={{ color: "green" }}>{message}</p>}

      <select
        disabled={disabled}
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        <option value="">Select rating</option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n} ⭐
          </option>
        ))}
      </select>

      <br /><br />

      <textarea
        disabled={disabled}
        placeholder="Write review (optional)"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <br /><br />

      <button
        disabled={disabled || loading}
        onClick={submitRating}
        style={{
          background: disabled ? "#aaa" : "#198754",
          color: "#fff",
          padding: "8px 16px",
          border: "none",
          cursor: disabled ? "not-allowed" : "pointer"
        }}
      >
        {disabled ? "Rating Locked" : loading ? "Submitting..." : "Submit Rating"}
      </button>
    </div>
  );
}
