import { useContext, useState } from "react";
import axios from "../config/axios";
import UserContext from "../context/UserContext";
import "../styles/dashboard.css";
import { Link } from "react-router-dom";



export default function CustomerDashboard() {
  const { user, userDispatch } = useContext(UserContext);

  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

   if (!user) return <p>Loading...</p>;

  const validateField = (name, value) => {
    let error = "";

    if (name === "name" && value.trim().length < 4) {
      error = "Name must be at least 4 characters";
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Enter a valid email address";
      }
    }

    if (name === "phone" && !/^[0-9]{10}$/.test(value)) {
      error = "Phone must be exactly 10 digits";
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    const errorMsg = validateField(name, value);

    setErrors((prev) => {
      if (!errorMsg) {
        const {  ...rest } = prev;
        return rest;
      }
      return { ...prev, [name]: errorMsg };
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`/update/user/${user._id}`, formData, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      userDispatch({ type: "LOGIN", payload: res.data });
      setEditMode(false);
      setErrors({});
      alert("Profile updated successfully");
    } catch (err) {
      console.log(err);
      setErrors({ general: "Update failed" });
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;

    await axios.delete(`/delete/user/${user._id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });

    localStorage.removeItem("token");
    window.location.href = "/";
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

          
          <button
            className="btn"
            onClick={() => (window.location.href = "/user/designs")}
          >
            View Designs
          </button>

          
          <Link to="/customer/orders">
            <button className="btn secondary">My Orders</button>
          </Link>

          <div className="btn-group">
            <button className="btn" onClick={() => setEditMode(true)}>
              Edit
            </button>
            <button className="btn danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="card">
          {errors.general && <p className="error">{errors.general}</p>}

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          {errors.name && <p className="error">{errors.name}</p>}

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
