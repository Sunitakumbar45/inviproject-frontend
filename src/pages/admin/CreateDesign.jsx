import { useState } from "react";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";

export default function CreateDesign() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    editableText: "",
    prize: "",
    status: "active"
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("editableText", formData.editableText);
    data.append("prize", formData.prize);
    data.append("status", formData.status);

    for (let img of images) {
      data.append("images", img);
    }

    try {
      await axios.post("/create/design", data, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Design created successfully");
      navigate("/admin/designs");
    } catch (err) {
      setErrors(err.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Create Design</h2>

      {errors && <p className="error">{errors}</p>}

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="editableText" placeholder="Editable Text" onChange={handleChange} />
        <input name="prize" type="number" placeholder="Price" onChange={handleChange} />

        <select name="status" onChange={handleChange}>
          <option value="active">Active</option>
          <option value="inActive">Inactive</option>
        </select>

        <input type="file" multiple onChange={handleImageChange} />

        <button disabled={loading}>
          {loading ? "Uploading..." : "Create Design"}
        </button>
      </form>

      <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
  );
}
