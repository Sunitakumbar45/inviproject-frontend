import { useEffect, useReducer } from "react";
import axios from "../config/axios";

const initialState = {
  orders: [],
  loading: true,
  error: ""
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { orders: action.payload, loading: false, error: "" };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function AdminOrders() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get("/api/orders")
      .then(res => {
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      })
      .catch(() => {
        dispatch({ type: "ERROR", payload: "Failed to load orders" });
      });
  }, []);

  if (state.loading) return <p>Loading orders...</p>;
  if (state.error) return <p>{state.error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 All Orders</h2>

      {state.orders.map(order => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px"
          }}
        >
          <p>
            <b>Customer:</b>{" "}
            {order.user
              ? `${order.user.name} (${order.user.email})`
              : "User Deleted"}
          </p>

          <p>
            <b>Design:</b>{" "}
            {order.design ? order.design.title : "Design Deleted"}
          </p>

          <p><b>Quantity:</b> {order.quantity}</p>
          <p><b>Total Price:</b> ₹ {order.totalPrice}</p>
          <p><b>Status:</b> {order.orderStatus}</p>
          <p><b>Event:</b> {order.eventType}</p>
        </div>
      ))}
    </div>
  );
}
