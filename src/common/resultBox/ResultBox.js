import "./ResultBox.css";
import ToolTip from "./toolTip/ToolTip";
import ToolTip2 from "./toolTip/ToolTip2";
import SentenceLevel from "../sticks/SentenceLevel";
import LexiconLevel from "../sticks/LexiconLevel";
import AnalyzeKuromoji from "../../components/result/analyze/AnalyzeKuromoji";

export default function ResultBox({ analyzeSentence, translatedText }) {
  return (
    <div>
      <div className="line">
        <div className="result-box box-light box1">
          <div className="result-title">종합 평가</div>
          <AnalyzeKuromoji analyzeSentence={analyzeSentence} />
        </div>
        <div className="result-box box-dark box2">
          <div className="result-title">문장 수준</div>
          <span className="lexical-level">
            숫자가 높을 수록 문장의 난이도가 높습니다
          </span>
          <SentenceLevel analyzeSentence={analyzeSentence} />
        </div>
      </div>
      <div className="line">
        <div className="result-box box-light box3">
          <div className="result-title add-mark">번역</div>
          <ToolTip />
          {translatedText && (
            <div className="deeplTrans">
              {translatedText.split("\n").map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="line">
        <div className="result-box box-light box4">
          <div className="result-title add-mark">어휘 수준</div>
          <span className="lexical-level">
            JLPT 난이도를 바탕으로 한 분석 결과입니다.
          </span>
          <LexiconLevel analyzeSentence={analyzeSentence} />
        </div>
        <div className="result-box box-dark box5">
          <div className="result-title add-mark">다빈도 어휘</div>
          <ToolTip2 />
        </div>
      </div>
    </div>
  );
}
