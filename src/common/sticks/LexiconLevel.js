import "./Stick.css";

import React, { useState, useEffect } from "react";
import kuromoji from "kuromoji";
import jlpt from "./jlpt.json";

export default function LexiconLevel(props) {
  const [duplicateRatio, setDuplicateRatio] = useState(0);
  const [difficultRatio, setDifficultRatio] = useState(0);

  useEffect(() => {
    const calculateDuplicateRatio = (tokens) => {
      if (tokens.length === 0) return 0;

      const wordSet = new Set();
      let duplicateCount = 0;

      tokens.forEach((token) => {
        if (wordSet.has(token.basic_form)) {
          duplicateCount++;
        } else {
          wordSet.add(token.basic_form);
        }
      });

      const ratio = (duplicateCount / tokens.length) * 100;
      setDuplicateRatio(ratio.toFixed(0));
    };

    const calculateDifficultRatio = (tokens) => {
      if (tokens.length === 0) return 0;

      // JLPT 레벨 1 및 2에 해당하는 단어의 개수 구하기
      const level12Words = jlpt.filter(
        (item) => item.level === 1 || item.level === 2
      );
      const level12WordSet = new Set(level12Words.map((item) => item.word));
      let difficultCount = 0;

      tokens.forEach((token) => {
        if (level12WordSet.has(token.basic_form)) {
          difficultCount++;
        }
      });

      // JLPT 레벨 1부터 5까지에 해당하는 단어의 개수 구하기
      const level12345Words = jlpt.filter((item) => item.level <= 5);
      const level12345WordSet = new Set(
        level12345Words.map((item) => item.word)
      );
      let totalCount = 0;

      tokens.forEach((token) => {
        if (level12345WordSet.has(token.basic_form)) {
          totalCount++;
        }
      });

      const difficultRatio = (difficultCount / totalCount) * 100;
      setDifficultRatio(difficultRatio.toFixed(0));
    };

    const analyzeTokens = (text) => {
      kuromoji
        .builder({ dicPath: process.env.PUBLIC_URL + "/kuromoji-dict/" })
        .build((err, tokenizer) => {
          if (err) {
            console.error(err);
          } else {
            const tokens = tokenizer.tokenize(text);
            calculateDuplicateRatio(tokens);
            calculateDifficultRatio(tokens);
          }
        });
    };

    if (props.analyzeSentence) {
      analyzeTokens(props.analyzeSentence);
    }
  }, [props.analyzeSentence]);
  return (
    <div>
      <div className="sticks two-sticks">
        <div className="stick-name2">중복 단어 비율</div>
        <progress
          className="stick-shape stick2-shape"
          max={100}
          value={duplicateRatio}
        ></progress>
        <div className="stick-num">{duplicateRatio}</div>
      </div>
      <div className="sticks two-sticks">
        <div className="stick-name2">어려운 단어</div>
        <progress
          className="stick-shape stick2-shape"
          max={100}
          value={difficultRatio}
        ></progress>
        <div className="stick-num">{difficultRatio}</div>
      </div>
    </div>
  );
}
