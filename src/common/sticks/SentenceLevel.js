import "./Stick.css";

import React, { useState, useEffect } from "react";
import kuromoji from "kuromoji";

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
  if (!text) return 0; // text가 없는 경우에 대한 처리 추가

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
// Kuromoji를 사용하여 중복 단어 비율을 계산-- 어휘 다양성
const calculateDuplicateWordRatio = (text, callback) => {
  kuromoji
    .builder({ dicPath: process.env.PUBLIC_URL + "/kuromoji-dict/" })
    .build((err, tokenizer) => {
      if (err) {
        console.error(err);
        callback(0); // 오류 발생 시 0 반환
      } else {
        const tokens = tokenizer.tokenize(text);
        const wordCount = {};

        tokens.forEach((token) => {
          const word = token.basic_form;
          if (wordCount[word]) {
            wordCount[word] += 1;
          } else {
            wordCount[word] = 1;
          }
        });

        const duplicateWords = Object.values(wordCount).filter(
          (count) => count > 1
        ).length;
        const totalWords = tokens.length;
        const duplicateWordRatio =
          totalWords > 0 ? (duplicateWords / totalWords) * 100 : 0;

        callback(duplicateWordRatio.toFixed(0));
      }
    });
};

// 특정 품사가 포함되어 있는지 확인하는 함수
const hasSpecificPos = (tokens, posList) => {
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (posList.includes(token.pos)) {
      return true;
    }
  }
  return false;
};

// [함수3] 문장 구조 점수 -- 수정 중
const calculateSentenceScore = (text, setScore) => {
  const lengthScore = Math.max((splitedTextAnalyze(text) / 100) * 50);
  // const kanjiScore = Math.max((calculateKanji(text) / 100) * 50);

  calculateDuplicateWordRatio(text, (duplicateWordRatio) => {
    const diversityScore = Math.min((duplicateWordRatio / 100) * 50);

    kuromoji
      .builder({ dicPath: process.env.PUBLIC_URL + "/kuromoji-dict/" })
      .build((err, tokenizer) => {
        if (err) {
          console.error(err);
          setScore(0); // 오류 발생 시 점수를 0으로 설정
        } else {
          const tokens = tokenizer.tokenize(text);
          const containsNoun = hasSpecificPos(tokens, ["名詞"]);
          const containsVerb = hasSpecificPos(tokens, ["動詞"]);
          const containsAdjective = hasSpecificPos(tokens, ["形容詞"]);
          const containAuxiliary = hasSpecificPos(tokens, ["助動詞"]);

          // 명사, 동사, 형용사가 하나 이상 포함되어 있을 경우에만 점수를 부여
          const structureScore =
            containsNoun &&
            (containsVerb || containsAdjective) &&
            containAuxiliary
              ? 50
              : 0;

          const totalScore = lengthScore + diversityScore + structureScore;

          setScore(totalScore.toFixed(0));
        }
      });
  });
};

export default function SentenceLevel(props) {
  const [sentenceScore, setSentenceScore] = useState(0);

  useEffect(() => {
    calculateSentenceScore(props.analyzeSentence, setSentenceScore);
  }, [props.analyzeSentence]);

  return (
    <div>
      <div className="sticks">
        <div className="stick-name">평균 문장 길이</div>
        <progress
          className="stick-shape stick1-shape"
          max={100}
          value={splitedTextAnalyze(props.analyzeSentence)}
        ></progress>
        <div className="stick-num">
          {splitedTextAnalyze(props.analyzeSentence)}
        </div>
      </div>
      <div className="sticks">
        <div className="stick-name">한자 비율</div>
        <progress
          className="stick-shape stick1-shape"
          max={100}
          value={calculateKanji(props.analyzeSentence)}
        ></progress>
        <div className="stick-num">{calculateKanji(props.analyzeSentence)}</div>
      </div>
      <div className="sticks">
        <div className="stick-name">문장 구조 점수</div>
        <progress
          className="stick-shape stick1-shape"
          max={100}
          value={sentenceScore}
        ></progress>
        <div className="stick-num">{sentenceScore}</div>
      </div>
    </div>
  );
}
