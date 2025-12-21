import { useEffect, useState } from "react";
import axios from "../../config/axios";
import DesignCard from "../../components/DesignCard";
import { useNavigate } from "react-router-dom";

export default function Designs() {
  const [designs, setDesigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/getalldesigns", {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(res => setDesigns(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <div className="design-page">
      <h2>Available Designs</h2>

      <div className="grid">
        {designs.map(d => (
          <DesignCard key={d._id} design={d} />
        ))}
      </div>

      <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
  );
}
