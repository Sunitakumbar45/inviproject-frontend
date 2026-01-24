import { useEffect, useState } from "react";
import axios from "../config/axios";
import RatingBox from "./RatingBox";


export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);

  
  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders");
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

 
  const startEdit = (order) => {
    setEditId(order._id);
    setEditData({
      quantity: order.quantity,
      description: order.description,
      EventDate: order.EventDate?.substring(0, 10),
      pricePerCard: order.design?.prize || 0
    });
  };

  
  const saveEdit = async (id) => {
    try {
      await axios.put(`/api/order/${id}`, {
        quantity: editData.quantity,
        description: editData.description,
        EventDate: editData.EventDate
      });

      alert("Order updated successfully");
      setEditId(null);
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.error || "Update failed");
    }
  };

  
  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await axios.delete(`/api/order/${id}`);
      alert("Order deleted successfully");
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.error || "Delete failed");
    }
  };

  
  if (loading) return <h3>Loading...</h3>;

  if (orders.length === 0) {
    return <h3>No orders found</h3>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧾 My Orders</h2>

      {orders.map((order) => {
        const pricePerCard = order.design?.prize || 0;
        const totalPrice =
          editId === order._id
            ? editData.quantity * pricePerCard
            : order.totalPrice;

        return (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "15px",
              padding: "15px",
              borderRadius: "8px"
            }}
          >
            <h4>{order.design?.title || "Design Removed"}</h4>

            <p><b>Per Card Price:</b> ₹{pricePerCard}</p>

            {editId === order._id ? (
              <>
                <label>Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={editData.quantity}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      quantity: Number(e.target.value)
                    })
                  }
                />

                <p><b>Total Amount:</b> ₹{totalPrice}</p>

                <label>Description</label>
                <input
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      description: e.target.value
                    })
                  }
                />

                <label>Event Date</label>
                <input
                  type="date"
                  value={editData.EventDate}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      EventDate: e.target.value
                    })
                  }
                />

                <br /><br />
                <button onClick={() => saveEdit(order._id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p><b>Quantity:</b> {order.quantity}</p>
                <p><b>Total Amount:</b> ₹{order.totalPrice}</p>
                <p><b>Status:</b> {order.orderStatus}</p>

                {/* {order.orderStatus === "pending" ? (
                  <>
                    <button onClick={() => startEdit(order)}>Edit</button>
                    <button onClick={() => deleteOrder(order._id)}>
                      Delete
                    </button>
                  </>
                ) : (
                  <p style={{ color: "red" }}>
                    Editing disabled (Printing started)
                  </p>
                )} */}

                {order.orderStatus === "pending" && (
  <>
    <button onClick={() => startEdit(order)}>Edit</button>
    <button onClick={() => deleteOrder(order._id)}>Delete</button>
  </>
)}

{order.orderStatus !== "pending" &&
 order.orderStatus !== "delivered" && (
  <p style={{ color: "red" }}>
    Editing disabled (Printing started)
  </p>
)}


                {order.orderStatus === "delivered" && (
  <RatingBox
    orderId={order._id}
    designTitle={order.design?.title}
  />
)}


                


              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
