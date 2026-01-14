// import { Link } from "react-router-dom";
// import "../styles/admin.css";

// export default function AdminDashboard() {
//   return (
//     <div className="admin-dashboard">
//       <h2>Admin Dashboard</h2>

//       <div className="admin-actions">
//         <Link to="/admin/create-design">
//           <button>Create Design</button>
//         </Link>

//         <Link to="/admin/designs">
//           <button>View All Designs</button>
//         </Link>

//         <Link to="/admin/orders"><button>View Orders</button></Link>
//         <Link to="/admin/customers"><button>View Customers</button></Link>

//       </div>
//     </div>
//   );
// }


// import { Link } from "react-router-dom";
// import { useEffect } from "react";
// import socket from "../socket";
// import "../styles/admin.css";

// export default function AdminDashboard() {

//   useEffect(() => {
//     // join admin room
//     socket.emit("join", "admin");

//     // listen for new orders
//     socket.on("new-order", (data) => {
//       alert(data.message);
//       console.log("New Order:", data);
//     });

//     return () => {
//       socket.off("new-order");
//     };
//   }, []);

//   return (
//     <div className="admin-dashboard">
//       <h2>Admin Dashboard</h2>

//       <div className="admin-actions">
//         <Link to="/admin/create-design">
//           <button>Create Design</button>
//         </Link>

//         <Link to="/admin/designs">
//           <button>View All Designs</button>
//         </Link>

//         <Link to="/admin/orders"><button>View Orders</button></Link>
//         <Link to="/admin/customers"><button>View Customers</button></Link>

//         {/* Example Reply Button */}
//         <button
//           onClick={() =>
//             socket.emit("order-reply", {
//               customerId: "PASTE_CUSTOMER_ID_HERE",
//               message: "Your order is processed, we will deliver shortly ✅"
//             })
//           }
//         >
//           Send Sample Reply
//         </button>

//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "../socket";
import "../styles/admin.css";

export default function AdminDashboard() {
  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    socket.emit("join", "admin");

    socket.on("new-order", (data) => {
      alert(data.message);
      console.log("New Order:", data);

      // ✅ Save latest order info
      setLatestOrder(data);
    });

    return () => socket.off("new-order");
  }, []);

  const sendReply = () => {
    if (!latestOrder) {
      alert("No order selected yet");
      return;
    }

    socket.emit("order-reply", {
      customerId: latestOrder.customerId,
      message: "Your order is processed, we will deliver shortly ✅"
    });

    alert("Reply sent to customer 📩");
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {latestOrder && (
        <div style={{ background: "#eee", padding: "10px", marginBottom: "10px" }}>
          <p><b>Latest Order ID:</b> {latestOrder.orderId}</p>
          <p><b>Customer ID:</b> {latestOrder.customerId}</p>
        </div>
      )}

      <div className="admin-actions">
        <Link to="/admin/create-design"><button>Create Design</button></Link>
        <Link to="/admin/designs"><button>View All Designs</button></Link>
        <Link to="/admin/orders"><button>View Orders</button></Link>
        <Link to="/admin/customers"><button>View Customers</button></Link>

        {/* ✅ Dynamic Reply Button */}
        <button onClick={sendReply}>
          Send Reply To Customer
        </button>
      </div>
    </div>
  );
}
