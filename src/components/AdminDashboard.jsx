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

// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import socket from "../socket";
// import "../styles/admin.css";

// export default function AdminDashboard() {
//   const [latestOrder, setLatestOrder] = useState(null);

//   useEffect(() => {
//     socket.emit("join", "admin");

//     socket.on("new-order", (data) => {
      
//       alert(data.message);
//       console.log("New Order:", data);

//       // ✅ Save latest order info
//       setLatestOrder(data);
//     });

//     return () => socket.off("new-order");
//   }, []);

//   const sendReply = () => {
//     if (!latestOrder) {
//       alert("No order selected yet");
//       return;
//     }

//     socket.emit("order-reply", {
//       customerId: latestOrder.customerId,
//       message: "Your order is processed, we will deliver shortly ✅"
//     });

//     alert("Reply sent to customer 📩");
//   };

//   return (
//     <div className="admin-dashboard">
//       <h2>Admin Dashboard</h2>

//       {latestOrder && (
//         <div style={{ background: "#eee", padding: "10px", marginBottom: "10px" }}>
//           <p><b>Latest Order ID:</b> {latestOrder.orderId}</p>
//           <p><b>Customer ID:</b> {latestOrder.customerId}</p>
//         </div>
//       )}

//       <div className="admin-actions">
//         <Link to="/admin/create-design"><button>Create Design</button></Link>
//         <Link to="/admin/designs"><button>View All Designs</button></Link>
//         <Link to="/admin/orders"><button>View Orders</button></Link>
//         <Link to="/admin/customers"><button>View Customers</button></Link>

//         {/* ✅ Dynamic Reply Button */}
//         <button onClick={sendReply}>
//           Send Reply To Customer
//         </button>
//       </div>
//     </div>
//   );
// }



// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import socket from "../socket";
// import "../styles/admin.css";

// export default function AdminDashboard() {
//   const [latestOrder, setLatestOrder] = useState(null);
//   const [reply, setReply] = useState("");

//   useEffect(() => {
//     // ✅ Join admin room
//     socket.emit("join-admin");
//     console.log("👑 Admin joined socket room");

//     // ✅ Receive new order notification
//     socket.on("new-order", (data) => {
//       console.log("📦 New order received:", data);
//       alert(data.message);
//       setLatestOrder(data.order);   // save order object
//     });

//     return () => {
//       socket.off("new-order");
//     };
//   }, []);

  
//   return (
//     <div className="admin-dashboard">
//       <h2>Admin Dashboard</h2>

//       {latestOrder && (
//         <div style={{ background: "#eee", padding: 10, marginBottom: 10 }}>
//           <p><b>Order ID:</b> {latestOrder._id}</p>
//           <p><b>Customer ID:</b> {latestOrder.user}</p>
//         </div>
//       )}

//       <input
//         placeholder="Type reply..."
//         value={reply}
//         onChange={(e) => setReply(e.target.value)}
//       />

      

//       <div className="admin-actions">
//         <Link to="/admin/create-design"><button>Create Design</button></Link>
//         <Link to="/admin/designs"><button>View All Designs</button></Link>
//         <Link to="/admin/orders"><button>View Orders</button></Link>
//         <Link to="/admin/customers"><button>View Customers</button></Link>
//          <button onClick={setReply}>Send Reply To Customer</button>
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
  const [reply, setReply] = useState("");

  useEffect(() => {
    // ✅ Join admin room
    socket.emit("join-admin");
    console.log("👑 Admin joined socket room");

    // ✅ Receive new order notification
    socket.on("new-order", (data) => {
      console.log("📦 New order received:", data);
      alert(data.message);
      setLatestOrder(data.order);
    });

    return () => {
      socket.off("new-order");
    };
  }, []);

  // ✅ SEND REPLY FUNCTION
  const sendReply = () => {
    if (!latestOrder) {
      alert("❌ No order selected");
      return;
    }

    if (!reply.trim()) {
      alert("❌ Please type a reply");
      return;
    }

    socket.emit("order-reply", {
      customerId: latestOrder.user,
      message: reply,
    });

    alert("✅ Reply sent to customer");
    setReply("");
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* ✅ Latest Order Info */}
      {latestOrder && (
        <div style={{ background: "#eee", padding: 10, marginBottom: 10 }}>
          <p><b>Order ID:</b> {latestOrder._id}</p>
          <p><b>Customer ID:</b> {latestOrder.user}</p>
        </div>
      )}

      {/* ✅ Reply Input */}
      <input
        placeholder="Type reply..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />

      <div className="admin-actions">
        <Link to="/admin/create-design"><button>Create Design</button></Link>
        <Link to="/admin/designs"><button>View All Designs</button></Link>
        <Link to="/admin/orders"><button>View Orders</button></Link>
        <Link to="/admin/customers"><button>View Customers</button></Link>

        {/* ✅ FIXED BUTTON */}
        <button onClick={sendReply}>
          Send Reply To Customer
        </button>
      </div>
    </div>
  );
}
