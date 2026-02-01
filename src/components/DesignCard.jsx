import "../styles/designCard.css";

export default function DesignCard({ design, onEdit, onDelete }) {
  return (
    <div className="design-card">
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

      
      <img src={design.image[0]} alt={design.title} />

      <h3>{design.title}</h3>
      <p>{design.editableText}</p>
      <p><b>Size:</b> {design.size}</p>
      <p><b>Status:</b> {design.status}</p>
      <p><b>₹ {design.prize}</b></p>

      <div className="actions">
        <button onClick={() => onEdit(design)}>Edit</button>
        <button className="danger" onClick={() => onDelete(design._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
