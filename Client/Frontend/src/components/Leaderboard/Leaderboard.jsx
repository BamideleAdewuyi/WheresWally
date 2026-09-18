import styles from "./Leaderboard.module.css";
import UserScore from "../UserScore/UserScore";

function Leaderboard({ users }) {
    return(
        <div className={styles.leaderboardContainer}>
            <h3>Name</h3>
            <h3>Time</h3>
            {users.length > 0 && 
                <>
                    {users.map((user, index) => (
                        <UserScore key={index} name={user.name} time={user.time}/>
                    ))}
                </>
            }
        </div>
    )
}

export default Leaderboard;