import "./Stick.css";

export default function Test() {
  const testText = "私は学生です。4年生になりました。";

  const splitedTextAnalyze = (text) => {
    if (!text) return 0; // 빈 문자열 처리

    // 마침표로 문장 나누기
    const sentences = text.split("。").filter((sentence) => sentence); // 빈 문장 필터링
    if (sentences.length === 0) return 0; // 유효한 문장이 없는 경우 처리

    // 총 문자 수 계산
    let totalLength = 0;
    for (let sentence of sentences) {
      totalLength += sentence.length;
    }

    // const splitedAve = Math.floor(countNum / (splited.length - 1));
    const averageLength = Math.floor(totalLength / sentences.length);
    const percentage = Math.floor((averageLength / 200) * 100);
    // 평균 문장 길이를 200으로 하고 백분율

    return percentage;
  };

  return (
    <div>
      <div className="sticks">
        <div className="stick-name">어휘 다양성</div>
        <div className="stick-shape"></div>
        <div className="stick-num">{splitedTextAnalyze(testText)}</div>
      </div>
    </div>
  );
}
