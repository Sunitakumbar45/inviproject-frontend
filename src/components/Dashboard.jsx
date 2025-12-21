import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Dashboard() {
  const { user } = useContext(UserContext);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="page">
      <h2>Dashboard</h2>
      <p>Welcome, {user.name}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
