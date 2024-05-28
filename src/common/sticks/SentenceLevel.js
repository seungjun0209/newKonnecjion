import "./Stick.css";

export default function SentenceLevel() {
  return (
    <div>
      <div className="sticks">
        <div className="stick-name">평균 문장 길이</div>
        <div className="stick-shape"></div>
        <div className="stick-num"></div>
      </div>
      <div className="sticks">
        <div className="stick-name">한어 비율</div>
        <div className="stick-shape"></div>
        <div className="stick-num"></div>
      </div>
      <div className="sticks">
        <div className="stick-name">문장 구조 점수</div>
        <div className="stick-shape"></div>
        <div className="stick-num"></div>
      </div>
    </div>
  );
}
