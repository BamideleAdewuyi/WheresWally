import { useRef, useEffect, useState } from "react";
import styles from "./GameOverBox.module.css"

function GameOverBox({ x, y, time }) {
    const dialogRef = useRef();

    function msToTime(duration) {
        let milliseconds = Math.floor((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        if (duration < 60000) {
            return `${seconds}.${milliseconds} seconds!`
        } else if (duration < 3600000 && duration < 120000) {
            return `${minutes} minute and ${seconds}.${milliseconds} seconds!`
        } else if (duration < 3600000) {
            return `${minutes} minutes and ${seconds}.${milliseconds} seconds!`
        } else {
            return `${hours} hours, ${minutes} minutes and ${seconds}.${milliseconds} seconds!`
        }
    };

    const formattedTime = msToTime(Number(time));

    useEffect(() => {
        dialogRef.current.showModal();
    }, []);

    return(
        <div className={styles.GameOverBoxWrapper}>
            <dialog style={{left: x, top: y}} ref={dialogRef} className={styles.GameOverBoxDialog}>
                <form onSubmit>
                    <h1>Well done! You found everyone in {formattedTime}</h1>
                    <h2>Add your name to the leaderboard:</h2>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name"/>
                    <button type="submit">Save score</button>
                    <button type="button">Go home without saving</button>
                </form>
            </dialog>
        </div>
    )
}

export default GameOverBox