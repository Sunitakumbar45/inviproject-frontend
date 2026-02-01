import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Account() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <p style={{ color: "white" }}>Loading account...</p>;
  }

  return (
    <div className="dash-container">
      <h2>My Account</h2>
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


      <div className="card">
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {user.phone}</p>
        <p><b>Role:</b> {user.role}</p>
        <p><b>Login Count:</b> {user.loginCount}</p>
      </div>
    </div>
  );
}
