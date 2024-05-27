import styles from "./Finish.module.css"
import { Link } from "react-router-dom";

export default function Finish(){
    return (
        <div className={styles.buttons}>
            <div className={styles.finish}>
                <Link to="/">끝내기</Link>
            </div>
            <div className={styles.next}>
            <Link to="/Translation">다음문제</Link>
            </div>
        </div>
);
}