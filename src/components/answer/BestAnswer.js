import styles from "./BestAnswer.module.css"

export default function BestAnswer({ deeplTrans }){
    return (
        <div className={styles.best}>
            <p className="place"></p>
            <p className={styles.deelptext}>{deeplTrans.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
            ))}</p>
      </div>
);
}