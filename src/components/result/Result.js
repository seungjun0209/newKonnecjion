import "./Result.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import HomeLogo from "../../common/homeLogo/HomeLogo";
import SiteLogo from "../../common/siteLogo/SiteLogo";
import ResultBox from "../../common/resultBox/ResultBox";
import { translateText } from "../result/deepltrans";

const SetUserText = ({ text }) => {
  return (
    <span className="input-text">
      {text.split("\n").map((txt, index) => (
        <span key={index}>
          {txt}
          <br />
        </span>
      ))}
    </span>
  );
};

function Result() {
  const location = useLocation();
  const userText = location.state.text;

  const [translatedText, setTranslatedText] = useState(""); // 번역된 텍스트를 상태로 관리
  const [error, setError] = useState(null);

  useEffect(() => {
    const translate = async () => {
      try {
        const result = await translateText(userText, "KO"); // 번역할 타겟 언어를 설정
        setTranslatedText(result);
      } catch (err) {
        setError(err.message);
      }
    };
    translate();
  }, [userText]);

  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  }; // navigate to home page
  const goToInput = () => {
    navigate("/Input");
  }; // navigate to input-page
  const goToTrans = () => {
    navigate("/Translation");
  };

  return (
    <div className="Result">
      <HomeLogo />
      <SiteLogo />
      <div className="input-box">
        <SetUserText text={userText} />
      </div>
      <div className="reset-box">
        <button className="reset" onClick={goToInput}>
          초기화
        </button>
      </div>
      <ResultBox translatedText={translatedText} error={error} />
      <div className="button-box">
        <button className="button-text button-home" onClick={goToHome}>
          홈으로
        </button>
        <button className="button-text button-trans" onClick={goToTrans}>
          번역 연습
        </button>
      </div>
    </div>
  );
}

export default Result;
