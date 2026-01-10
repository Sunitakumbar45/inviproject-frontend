import { useNavigate } from "react-router-dom";

export default function UserDesignCard({ design }) {
  const navigate = useNavigate();

  return (
    <div className="design-card">
      <img src={design.image[0]} alt={design.title} />

      <h3>{design.title}</h3>
      <p><b>₹ {design.prize}</b></p>

      <button
        onClick={() => navigate(`/design/${design._id}`)}
        className="btn"
      >
        Order Now
      </button>
    </div>
  );
}
