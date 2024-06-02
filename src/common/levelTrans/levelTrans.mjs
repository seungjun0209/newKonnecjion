import sentences from './sentences.json';

let userLevel = "일반"; // 여기서 레벨 값을 설정합니다.
let previousSentence = "";

export const loadSentences = async () => {
  return sentences;
};

export const getRandomSentence = (level, sentences) => {
  const availableSentences = sentences[level];
  if (availableSentences.length === 0) {
    return null;
  }

  let newSentence;
  do {
    const randomIndex = Math.floor(Math.random() * availableSentences.length);
    newSentence = availableSentences[randomIndex];
  } while (newSentence === previousSentence && availableSentences.length > 1);

  previousSentence = newSentence;
  return newSentence;
};

export const getUserLevel = () => {
  return userLevel;
};

export const setUserLevel = (level) => {
  userLevel = level;
};
