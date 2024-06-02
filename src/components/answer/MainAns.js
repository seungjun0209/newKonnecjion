import React, { useState, useEffect } from 'react';

import BestAnswer from "./BestAnswer";
import Finish from "./Finish";
import UserTrans from "./UserTrans";
import ExplainText1 from "../pages/ExplainText1";
import HomeButton from "../../common/homeLogo/HomeLogo.js"
import SiteLogo from "../../common/siteLogo/SiteLogo.js"

import { translateText } from '../result/deepltrans.js'; 

import { loadSentences, getRandomSentence, getUserLevel } from '../../common/levelTrans/levelTrans.mjs';

export default function MainAns(){

    const [userText, setUserText] = useState('');
    const [deeplTrans, setDeeplTrans] = useState('');

    const [currentSentence, setCurrentSentence] = useState("");
    const [userLevel] = useState(getUserLevel());

    const targetLang = 'JA';

    useEffect(() => {
        const text = localStorage.getItem('translatedText') || '';
        setUserText(text);
        
        if (text) {
            const fetchTranslation = async () => {
                try {
                    const result = await translateText(text, targetLang);
                    setDeeplTrans(result);
                    localStorage.setItem('translatedText', result);
                } catch (err) {
    
                }
            };
            fetchTranslation();
        }
    }, [targetLang]);

    // 초기화 함수
    const handleReset = () => {
        localStorage.removeItem('translatedText'); 
    };

    const handleNextSentence = async () => {
        const sentences = await loadSentences();
        const newSentence = getRandomSentence(userLevel, sentences);
        if (newSentence) {
            setCurrentSentence(newSentence);
        } else {
            // alert("모든 문장을 사용했습니다.");
        }
    };


    return (
        <div>
            <HomeButton />
            <SiteLogo />
            <ExplainText1 />
            <UserTrans translatedText={userText} />
            <BestAnswer deeplTrans={deeplTrans} />
            <Finish onNextSentence={handleNextSentence} onReset={handleReset} />
            {/* <Next></Next> */}
        </div>
    );
}