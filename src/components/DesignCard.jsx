import { useNavigate } from "react-router-dom";
import "./designCard.css";

export default function DesignCard({ design }) {
  const navigate = useNavigate();

  return (
    <div className="design-card">
      <div className="image-slider">
        {design.image.map((img, i) => (
          <img key={i} src={img} alt="design" />
        ))}
      </div>

      <h3>{design.title}</h3>
      <p>₹ {design.prize}</p>

      <button onClick={() => navigate(`/design/${design._id}`)}>
        View Design
      </button>
    </div>
  );
}
