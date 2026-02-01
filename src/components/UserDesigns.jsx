import { useEffect, useReducer } from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import "../styles/designCard.css";

const initialState = {
  designs: [],
  loading: true,
  error: ""
};

function reducer(state, action) {
  switch (action.type) {
    case "SUCCESS":
      return { designs: action.payload, loading: false, error: "" };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function UserDesigns() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/getalldesigns")
      .then(res => {
        const active = res.data.filter(d => d.status === "active");
        dispatch({ type: "SUCCESS", payload: active });
      })
      .catch(() => {
        dispatch({ type: "ERROR", payload: "Failed to load designs" });
      });
  }, []);

  if (state.loading) return <p>Loading...</p>;
  if (state.error) return <p>{state.error}</p>;

  return (
    <div className="design-grid">
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

      {state.designs.map(d => (
        <div key={d._id} className="design-card">
          <img src={d.image[0]} alt={d.title} />
          <h3>{d.title}</h3>
          <p>₹ {d.prize}</p>
          <button className="btn" onClick={() => navigate(`/design/${d._id}`)}>
            Order Now
          </button>
        </div>
      ))}
    </div>
  );
}
