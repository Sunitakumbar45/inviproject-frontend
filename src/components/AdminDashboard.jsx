
import { Link } from "react-router-dom";

import "../styles/admin.css";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  
  const navigate=useNavigate();

  

 

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      
      

      

      

      <div className="admin-actions">
        <Link to="/admin/create-design"><button>Create Design</button></Link>
        <Link to="/admin/designs"><button>View All Designs</button></Link>
        <Link to="/admin/orders"><button>View Orders</button></Link>
        <Link to="/admin/customers"><button>View Customers</button></Link>
        <button onClick={() => navigate("/admin/payments")}>
  💰 View Payments
</button>
<button onClick={() => navigate("/admin/ratings")}>
  ⭐ View Ratings
</button>



        
      </div>
    </div>
  );
}
