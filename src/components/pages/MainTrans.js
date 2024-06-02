import React, { useState, useEffect } from 'react';

import TransSubmit from "./TransSubmit";
import SameLevel from "./SameLevel";
import TranslationText from "./TranslationText";
import ExplainText1 from "./ExplainText1.js";
import HomeButton from "../../common/homeLogo/HomeLogo.js"
import SiteLogo from "../../common/siteLogo/SiteLogo.js"

import { loadSentences, getRandomSentence, getUserLevel } from '../../common/levelTrans/levelTrans.mjs';

export default function Main(){
    const [currentSentence, setCurrentSentence] = useState("");
    const [userLevel] = useState(getUserLevel());

  useEffect(() => {
    const fetchSentences = async () => {
      const sentences = await loadSentences();
      const initialSentence = getRandomSentence(userLevel, sentences);
      setCurrentSentence(initialSentence);
    };
    fetchSentences();
  }, [userLevel]);

  const handleNextSentence = async () => {
    const sentences = await loadSentences();
    const newSentence = getRandomSentence(userLevel, sentences);
    if (newSentence) {
      setCurrentSentence(newSentence);
    } else {
    //   alert("모든 문장을 사용했습니다.");
    }
  };

    const handleTextChange = (text) => {
        localStorage.setItem('translatedText', text); // 입력된 값을 localStorage에 저장
    };

    return (
        <div>
            <HomeButton />
            <SiteLogo />
            <ExplainText1 />
            <SameLevel currentSentence={currentSentence} onNextSentence={handleNextSentence} />
            <TranslationText onTextChange={handleTextChange} />
            <TransSubmit />
        </div>
    );
}