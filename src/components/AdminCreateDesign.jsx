import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../config/axios";
import "../styles/admin.css";

const CARD_SIZES = ["5 x 7 inch", "6 x 8 inch", "8 x 10 inch","A3","A4"];

export default function AdminCreateDesign() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    editableText: "",
    size: "",
    prize: "",
    status: "active"
  });

  const [images, setImages] = useState([]);

   useEffect(() => {
    if (isEdit) {
      axios
        .get(`/getdesign/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then((res) => {
          const d = res.data;
          setForm({
            title: d.title,
            editableText: d.editableText,
            size: d.size,
            prize: d.prize,
            status: d.status
          });
        });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const data = new FormData();

    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    images.forEach((img) => data.append("images", img));

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    };

    if (isEdit) {
      await axios.put(`/update/design/${id}`, data, { headers });
      alert("Design updated successfully");
    } else {
      await axios.post("/create/design", data, { headers });
      alert("Design created successfully");
    }

   navigate("/admin/designs");
  };

  return (
    <div className="form-box">
      <h2>{isEdit ? "Edit Design" : "Create Design"}</h2>

      <input
        name="title"
        placeholder="Design Title"
        value={form.title}
        onChange={handleChange}
      />

      <input
        name="editableText"
        placeholder="Editable Text"
        value={form.editableText}
        onChange={handleChange}
      />

      
      <select name="size" value={form.size} onChange={handleChange}>
        <option value="">Select Card Size</option>
        {CARD_SIZES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      
      <input
        type="number"
        name="prize"
        placeholder="Enter Price"
        value={form.prize}
        onChange={handleChange}
      />

     
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="active">Active</option>
        <option value="inActive">Inactive</option>
      </select>

      {!isEdit && (
        <input
          type="file"
          multiple
          onChange={(e) => setImages([...e.target.files])}
        />
      )}

      <button onClick={handleSubmit}>
        {isEdit ? "Update Design" : "Create Design"}
      </button>
    </div>
  );
}
