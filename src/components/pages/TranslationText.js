import React, { useState } from "react";
import styles from "./TranslationText.module.css";

export default function TranslationText({ onTextChange }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onTextChange(newValue);
  };

  return (
    <textarea
      className={styles.translationText}
      placeholder="위 문장을 번역해주세요."
      value={inputValue}
      onChange={handleChange}
    ></textarea>
  );
}
