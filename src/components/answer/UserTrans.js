import styles from "./UserTrans.module.css"

export default function UserTrans({translatedText}){
    return (
        <div className={styles.usertrans}>
            <p>{translatedText.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
            ))}</p>
      </div>
);
}