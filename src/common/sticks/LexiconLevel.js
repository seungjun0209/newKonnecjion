import "./Stick.css";
import jlptLevel from "./jlpt.json";

export default function LexiconLevel(props) {
  // 형태소 분석기 구현 필요!
  const difficultWord = (text) => {
    // level 1 and 2
    const level1And2Words = jlptLevel.filter(
      (word) => word.level === 1 || word.level === 2
    );
    let count1And2 = 0;
    level1And2Words.forEach((word) => {
      const regex = new RegExp(word.word, "g");
      const matches = text.match(regex);
      if (matches) {
        count1And2 += 1;
      }
    });
    // level 1~5
    const level1To5Words = jlptLevel.filter(
      (word) =>
        word.level === 1 ||
        word.level === 2 ||
        word.level === 3 ||
        word.level === 4 ||
        word.level === 5
    );
    let count1To5 = 0;
    level1To5Words.forEach((word) => {
      const regex = new RegExp(word.word, "g");
      const matches = text.match(regex);
      if (matches) {
        count1To5 += 1;
      }
    });
    const countResult = count1And2 / count1To5;
    return countResult.toFixed(2);
  };

  const textLexiconLevel = (text) => {
    const calculateKanji = (text) => {
      // 제외할 일본어 기호를 정의
      const excludeRegex = /[。、｢｣「」『』【】〔〕（）]/g;
      // 제외할 기호를 제거
      const cleanedText = text.replace(excludeRegex, "");

      const kanjiRegex = /[\u4E00-\u9FAF]/g;
      const kanjiMatches = cleanedText.match(kanjiRegex);

      const totalCharacters = cleanedText.length;
      const kanjiCount = kanjiMatches ? kanjiMatches.length : 0;

      const percentage = kanjiCount / totalCharacters;
      return percentage.toFixed(2);
    };

    const lexiconLevelResult = parseFloat(
      calculateKanji(text) + difficultWord(text)
    );
    return lexiconLevelResult.toFixed(2);
  };

  return (
    <div>
      <div className="sticks two-sticks">
        <div className="stick-name2">어휘 수준</div>
        <progress
          className="stick-shape"
          max={5}
          value={textLexiconLevel(props.anaylzeSentence)}
        ></progress>
        <div className="stick-num">
          {textLexiconLevel(props.anaylzeSentence)}
        </div>
      </div>
      <div className="sticks two-sticks">
        <div className="stick-name2">어려운 단어</div>
        <progress
          className="stick-shape"
          max={5}
          value={difficultWord(props.anaylzeSentence)}
        ></progress>
        <div className="stick-num">{difficultWord(props.anaylzeSentence)}</div>
      </div>
    </div>
  );
}
