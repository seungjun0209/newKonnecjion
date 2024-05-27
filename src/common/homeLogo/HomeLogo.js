import imgLogo from "./homeLogo.png";
import "./HomeLogo.css";
import { useNavigate } from "react-router-dom";

export default function HomeLogo() {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  }; // navigate to home page
  return (
    <div className="logo-box">
      <img
        src={imgLogo}
        className="home-logo"
        onClick={goToHome}
        alt="사진 없음"
      />
    </div>
  );
}
