import "./Stick.css";

export default function LexiconLevel(props) {
  return (
    <div>
      <div className="sticks two-sticks">
        <div className="stick-name">어휘 수준</div>
        <progress className="stick-shape" max={100}></progress>
        <div className="stick-num"></div>
      </div>
      <div className="sticks two-sticks">
        <div className="stick-name">어려운 단어</div>
        <progress className="stick-shape" max={100}></progress>
        <div className="stick-num"></div>
      </div>
    </div>
  );
}
