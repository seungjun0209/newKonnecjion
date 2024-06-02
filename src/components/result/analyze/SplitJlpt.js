import jlpt from "./jlpt.json";
import { useEffect, useState } from "react";

export default function SplitJlpt({ onWordsSplit }) {
  const [level1Words, setLevel1Words] = useState([]);
  const [level2Words, setLevel2Words] = useState([]);
  const [level3Words, setLevel3Words] = useState([]);
  const [level4Words, setLevel4Words] = useState([]);
  const [level5Words, setLevel5Words] = useState([]);

  // JLPT 단어 필터링
  useEffect(() => {
    if (jlpt) {
      // JLPT 레벨별로 필터링하여 상태에 저장
      setLevel1Words(
        jlpt
          .filter((item) => item.level === 1)
          .map((item) => ({ word: item.word, level: item.level }))
      );
      setLevel2Words(
        jlpt
          .filter((item) => item.level === 2)
          .map((item) => ({ word: item.word, level: item.level }))
      );
      setLevel3Words(
        jlpt
          .filter((item) => item.level === 3)
          .map((item) => ({ word: item.word, level: item.level }))
      );
      setLevel4Words(
        jlpt
          .filter((item) => item.level === 4)
          .map((item) => ({ word: item.word, level: item.level }))
      );
      setLevel5Words(
        jlpt
          .filter((item) => item.level === 5)
          .map((item) => ({ word: item.word, level: item.level }))
      );
    }
  }, []);

  // 필요한 단어를 반환
  useEffect(() => {
    // 필요한 작업을 수행하세요.
    const requiredWords = {
      level1: level1Words,
      level2: level2Words,
      level3: level3Words,
      level4: level4Words,
      level5: level5Words,
    };
    // 필요한 작업이 끝나면 상위 컴포넌트로 필요한 단어를 전달합니다.
    onWordsSplit(requiredWords);
  }, [
    level1Words,
    level2Words,
    level3Words,
    level4Words,
    level5Words,
    onWordsSplit,
  ]);

  return null; // 필요하지 않은 경우, 아무것도 렌더링하지 않습니다.
}
