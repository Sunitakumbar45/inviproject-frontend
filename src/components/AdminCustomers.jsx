import { useEffect, useReducer } from "react";
import axios from "../config/axios";

const initialState = {
  customers: [],
  loading: true,
  error: ""
};

function reducer(state, action) {
  switch (action.type) {
    case "SUCCESS":
      return { customers: action.payload, loading: false, error: "" };
    case "DELETE":
      return {
        ...state,
        customers: state.customers.filter(c => c._id !== action.payload)
      };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function AdminCustomers() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get("/admin/customers")
      .then(res => dispatch({ type: "SUCCESS", payload: res.data }))
      .catch(() => dispatch({ type: "ERROR", payload: "Failed to load customers" }));
  }, []);

  const deleteCustomer = (id) => {
    if (!window.confirm("Delete this customer?")) return;

    axios.delete(`/delete/user/${id}`)
      .then(() => dispatch({ type: "DELETE", payload: id }))
      .catch(() => alert("Cannot delete customer"));
  };

  if (state.loading) return <p>Loading...</p>;
  if (state.error) return <p>{state.error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>👥 Customers</h2>

      {state.customers.map(c => (
        <div
          key={c._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px"
          }}
        >
          <p><b>Name:</b> {c.name}</p>
          <p><b>Email:</b> {c.email}</p>
          <button
            onClick={() => deleteCustomer(c._id)}
            style={{ background: "red", color: "#fff", border: "none", padding: "8px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
