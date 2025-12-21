// import { useContext } from "react";
// import UserContext from "../context/UserContext";

// export default function CustomerDashboard() {
//   const { user } = useContext(UserContext);

//   return (
//     <div>
//       <h2>Customer Dashboard</h2>
//       <p>Name: {user?.name}</p>
//       <p>Email: {user?.email}</p>
//       <p>Phone: {user?.phone}</p>
//     </div>
//   );
// }


// import { useContext } from "react";
// import UserContext from "../context/UserContext";
// import "../styles/customer.css";

// export default function CustomerDashboard() {
//   const { user } = useContext(UserContext);

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div className="customer-container">
//       <h2>Customer Dashboard</h2>

//       <div className="card">
//         <p><b>Name:</b> {user.name}</p>
//         <p><b>Email:</b> {user.email}</p>
//         <p><b>Phone:</b> {user.phone}</p>
//         <p><b>Role:</b> {user.role}</p>
//       </div>
//     </div>
//   );
// }


import { useContext, useState,useEffect } from "react";
import axios from "../config/axios";
import UserContext from "../context/UserContext";
import "../styles/dashboard.css";

export default function CustomerDashboard() {
  const { user, userDispatch } = useContext(UserContext);

  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});   // 👈 ADD HERE

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  useEffect(() => {
    if (editMode && user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [editMode, user]);

  if (!user) return <p>Loading...</p>;


  const validateField = (name, value) => {
  let error = "";

  if (name === "name") {
    if (value.trim().length < 4) {
      error = "Name must be at least 4 characters";
    }
  }

  if (name === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      error = "Enter a valid email address";
    }
  }

  if (name === "phone") {
    if (!/^[0-9]{10}$/.test(value)) {
      error = "Phone must be exactly 10 digits";
    }
  }

  return error;
};


  // 🛑 CUSTOMER CAN ONLY SEE OWN DATA
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value,
  });

  // 🔥 LIVE ERROR REMOVAL
  const errorMsg = validateField(name, value);

  setErrors((prev) => {
    if (!errorMsg) {
      // eslint-disable-next-line no-unused-vars
      const { [name]: removed, ...rest } = prev; // remove error
      return rest;
    }
    return { ...prev, [name]: errorMsg };
  });
};


  // ✅ UPDATE OWN DATA
  // const handleUpdate = async () => {
  //   try {
  //     const res = await axios.put(
  //       `/update/user/${user._id}`,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("token"),
  //         },
  //       }
  //     );

  //     alert("Profile updated successfully");

  //     // update context user
  //     userDispatch({ type: "LOGIN", payload: res.data.selfupdate || res.data.updateUser });
  //     setEditMode(false);
  //   } catch (err) {
  //     alert(err.response?.data?.err || "Update failed");
  //   }
  // };


//   const handleUpdate = async () => {
//   try {
//     const res = await axios.put(
//       `/update/user/${user._id}`,
//       formData,
//       {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       }
//     );

//     userDispatch({ type: "LOGIN", payload: res.data });
//     setEditMode(false);
//     setErrors([]); // clear old errors

//     alert("Profile updated successfully");

//   } catch (err) {
//     if (Array.isArray(err.response?.data?.errors)) {
//       setErrors(err.response.data.errors);
//     } else {
//       setErrors([err.response?.data?.error || "Update failed"]);
//     }
//   }
// };


const handleUpdate = async () => {
  try {
    const res = await axios.put(
      `/update/user/${user._id}`,
      formData,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    userDispatch({ type: "LOGIN", payload: res.data });
    setEditMode(false);
    setErrors({});

    alert("Profile updated successfully");

  } catch (err) {
    if (Array.isArray(err.response?.data?.errors)) {
      const fieldErrors = {};

      err.response.data.errors.forEach((msg) => {
        if (msg.toLowerCase().includes("name")) fieldErrors.name = msg;
        if (msg.toLowerCase().includes("email")) fieldErrors.email = msg;
        if (msg.toLowerCase().includes("phone")) fieldErrors.phone = msg;
      });

      setErrors(fieldErrors);
    } else {
      setErrors({
        general: err.response?.data?.error || "Update failed"
      });
    }
  }
};


  // ❌ DELETE OWN ACCOUNT
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      await axios.delete(`/delete/user/${user._id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      alert("Account deleted");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (err) {
        console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="dash-container">
      <h2>Customer Dashboard</h2>

      {!editMode ? (
        <div className="card">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phone}</p>
          <p><b>Role:</b> {user.role}</p>

          <div className="btn-group">
            <button className="btn" onClick={() => setEditMode(true)}>Edit</button>
            <button className="btn danger" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      ) : (
        <div className="card">

          {errors.length > 0 && (
          <div className="error-box">
            {errors.map((e, i) => (
              <p key={i} className="error">{e}</p>
            ))}
          </div>
        )}

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          {errors.name && <p className="error">{errors.name}</p>}
          {/* <input
            name="email"
            value={formData.email}
            disabled
          /> */}


          <input
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Email"
/>
{errors.email && <p className="error">{errors.email}</p>}

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <div className="btn-group">
            <button className="btn" onClick={handleUpdate}>Save</button>
            <button className="btn secondary" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </div>
          
        </div>
        
      )}
      
    </div>
  );
}
