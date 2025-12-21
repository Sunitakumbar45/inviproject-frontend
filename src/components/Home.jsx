// export default function Home(){
//     return(
//         <div>
//             <h2>welcome Home</h2>
            
//         </div>
//     )
// }


import { useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Create Account",
      desc: "Join us and explore amazing features",
      color: "card-one",
    },
    {
      title: "Fast & Secure",
      desc: "Your data is safe with us",
      color: "card-two",
    },
    {
      title: "Easy Dashboard",
      desc: "Manage your profile easily",
      color: "card-three",
    },
    {
      title: "24/7 Support",
      desc: "We are always here to help",
      color: "card-four",
    },
  ];

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Our Platform</h1>
      <p className="home-subtitle">Swipe & click any card to register</p>

      <div className="carousel">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`carousel-card ${card.color}`}
            onClick={() => navigate("/register")}
          >
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
            <button>Get Started</button>
          </div>
        ))}
      </div>
    </div>
  );
}
