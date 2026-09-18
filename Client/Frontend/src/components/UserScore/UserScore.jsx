import styles from "./UserScore.module.css";

function UserScore({ name, time }) {
    return(
        <div className={styles.userScoreContainer}>
            <p>{name}</p>
            <p>{time}</p>
        </div>
    )
}

export default UserScore;