import { useEffect, useState } from "react";
import axios from "../../config/axios";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

 
  const fetchPayments = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get("/api/admin/payments", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("✅ Payments API response:", res.data);

    
    setPayments(res.data || []);
    setLoading(false);     

  } catch (err) {
    console.error("❌ Failed to load payments", err);
    setPayments([]);
    setLoading(false);     
  }
};


if (loading) {
  return <h2 style={{ textAlign: "center" }}>Loading payments...</h2>;
}


  
  return (
    <div style={{ padding: "20px" }}>
      <h2>💰 Admin Payments Dashboard</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Design</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Payment ID</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
  {payments.length === 0 ? (
    <tr>
      <td colSpan="6" style={{ textAlign: "center" }}>
        No payments found
      </td>
    </tr>
  ) : (
    payments.map((p) => (
      <tr key={p._id}>
        <td>{p.order?._id || "N/A"}</td>
        <td>{p.order?.design?.title || "N/A"}</td>
        <td>₹ {p.amountPaid}</td>
        <td>{p.paymentStatus}</td>
        <td>{p.razorpayPaymentId || "-"}</td>
        <td>{new Date(p.createdAt).toLocaleString()}</td>
      </tr>
    ))
  )}
</tbody>

      </table>
    </div>
  );
}
