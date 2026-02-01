import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { useNavigate, useLocation } from "react-router-dom";
import DesignCard from "../../components/DesignCard";
import "../../styles/admin.css";

export default function AdminDesigns() {
  const [designs, setDesigns] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); 

  const fetchDesigns = async () => {
    const res = await axios.get("/getalldesigns", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    setDesigns(res.data);
  };

  
  useEffect(() => {
    fetchDesigns();
  }, [location.pathname]); 

  const handleEdit = (design) => {
    navigate(`/admin/edit-design/${design._id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete design?")) return;

    await axios.delete(`/delete/design/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    fetchDesigns(); 
  };

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

      {designs.map((d) => (
        <DesignCard
          key={d._id}
          design={d}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
