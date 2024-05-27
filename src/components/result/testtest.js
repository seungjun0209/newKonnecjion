// TranslateComponent.js
import React, { useState } from 'react';
import { translateText } from './deepltrans';

function TranslateComponent() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState(null);

  const handleTranslate = async () => {
    setError(null);
    try {
      const result = await translateText(inputText, 'KO'); // 번역할 타겟 언어를 설정 
      setTranslatedText(result); // 번역된 결과 값을 상태 변수에 저장
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>DeepL Translator</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate"
      ></textarea>
      <button onClick={handleTranslate}>Translate</button>
      {error && <div>Error: {error}</div>}
      {translatedText && (
        <div>
          <h2>Translated Text:</h2>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
}

export default TranslateComponent;
