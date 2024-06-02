// Finish.js

import styles from "./Finish.module.css";
import { Link } from "react-router-dom";

export default function Finish({ onNextSentence }){
    const clearTranslatedText = () => {
        localStorage.removeItem('translatedText');
    };

    

    return (
        <div className={styles.buttons}>
            <div className={styles.finish}>
                <Link to="/" onClick={clearTranslatedText}>끝내기</Link>
            </div>
            <div className={styles.next}>
                <Link to="/Translation" onClick={() => { clearTranslatedText(); onNextSentence(); }}>다음문제</Link>
            </div>
        </div>
    );
}
