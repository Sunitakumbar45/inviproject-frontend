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
