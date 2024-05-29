import "./Stick.css";

// [함수1] add 평균 문장 길이
const splitedTextAnalyze = (text) => {
  if (!text) return 0; // 빈 문자열 처리

  const sentences = text.split("。").filter((sentence) => sentence.length > 0);

  // 각 문장의 길이를 합산
  const totalLength = sentences.reduce(
    (sum, sentence) => sum + sentence.length,
    0
  );

  // 평균 문장 길이 계산
  const averageLength =
    sentences.length > 0 ? totalLength / sentences.length : 0;

  return averageLength.toFixed(0); // 소수점 두 자리까지
};

//[함수2] add 한어 비율
const calculateKanji = (text) => {
  // 제외할 일본어 기호를 정의
  const excludeRegex = /[。、｢｣「」『』【】〔〕（）]/g;
  // 제외할 기호를 제거
  const cleanedText = text.replace(excludeRegex, "");

  const kanjiRegex = /[\u4E00-\u9FAF]/g;
  const kanjiMatches = cleanedText.match(kanjiRegex);

  const totalCharacters = cleanedText.length;
  const kanjiCount = kanjiMatches ? kanjiMatches.length : 0;

  const percentage =
    totalCharacters > 0 ? (kanjiCount / totalCharacters) * 100 : 0;
  return percentage.toFixed(0);
};

// [함수3] 문장 구조 점수 -- 수정 중
const calculateSentenceScore = (text) => {
  // const excludeRegex = /[。、｢｣「」『』【】〔〕（）]/g;
  // const cleanedText = text.replace(excludeRegex, "");

  // //어휘 다양성 평가(중복되지 않은 단어의 수)-- 형태소 분석기 없어서 일단 임의로
  // const regex = /([\u4E00-\u9FFF]+|[\u3040-\u309F\u30A0-\u30FF]+)/g;

  //문장 구조 점수 최종 구하기
  const lengthScore = Math.min((splitedTextAnalyze(text) / 100) * 50);
  const kanjiScore = Math.min((calculateKanji(text) / 100) * 50);
  // const diversityScore = uniqueWordRatio * 33.3;

  const totalScore = lengthScore + kanjiScore;

  return totalScore.toFixed(0);
};

export default function SentenceLevel(props) {
  return (
    <div>
      <div className="sticks">
        <div className="stick-name">평균 문장 길이</div>
        <progress
          className="stick-shape"
          max={100}
          value={splitedTextAnalyze(props.anaylzeSentence)}
        ></progress>
        <div className="stick-num">
          {splitedTextAnalyze(props.anaylzeSentence)}
        </div>
      </div>
      <div className="sticks">
        <div className="stick-name">한어 비율</div>
        <progress
          className="stick-shape"
          max={100}
          value={calculateKanji(props.anaylzeSentence)}
        ></progress>
        <div className="stick-num">{calculateKanji(props.anaylzeSentence)}</div>
      </div>
      <div className="sticks">
        <div className="stick-name">문장 구조 점수</div>
        <progress
          className="stick-shape"
          max={100}
          value={calculateSentenceScore(props.anaylzeSentence)}
        ></progress>
        <div className="stick-num">
          {calculateSentenceScore(props.anaylzeSentence)}
        </div>
      </div>
    </div>
  );
}
