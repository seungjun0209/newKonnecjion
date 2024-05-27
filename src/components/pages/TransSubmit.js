import styles from "./TransSubmit.module.css"
import { Link } from "react-router-dom";

export default function TransSubmit(){
    return (
        <div className={styles.submitbox}>
            <div className={styles.transSubmit}>
                <Link to="/answer">모범답안</Link>
            </div>
        </div>
);
}