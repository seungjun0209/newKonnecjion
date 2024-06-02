import React from 'react';
import styles from "./SameLevel.module.css";

const SameLevel = ({ currentSentence}) => {
  return (
    <div className={styles.sameLevel}>
      <p>{currentSentence ? currentSentence : "문장을 불러오는 중..."}</p>
    </div>
  );
}
export default SameLevel;
