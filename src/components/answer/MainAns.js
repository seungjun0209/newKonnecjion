import React, { useState, useEffect } from 'react';

import BestAnswer from "./BestAnswer";
import Finish from "./Finish";
import UserTrans from "./UserTrans";
import ExplainText1 from "../pages/ExplainText1";
import HomeButton from "../../common/homeLogo/HomeLogo.js"
import SiteLogo from "../../common/siteLogo/SiteLogo.js"

import { translateText } from '../result/deepltrans.js'; 

export default function MainAns(){

    const [userText, setUserText] = useState('');
    const [deeplTrans, setDeeplTrans] = useState('');

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


    return (
        <div>
            <HomeButton />
            <SiteLogo />
            <ExplainText1 />
            <UserTrans translatedText={userText} />
            <BestAnswer deeplTrans={deeplTrans} />
            <Finish></Finish>
            {/* <Next></Next> */}
        </div>
    );
}