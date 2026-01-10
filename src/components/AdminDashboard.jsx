import { Link } from "react-router-dom";
import "../styles/admin.css";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="admin-actions">
        <Link to="/admin/create-design">
          <button>Create Design</button>
        </Link>

        <Link to="/admin/designs">
          <button>View All Designs</button>
        </Link>
      </div>
    </div>
  );
}
