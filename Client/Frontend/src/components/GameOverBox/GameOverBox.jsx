import { useRef, useEffect } from "react";
import styles from "./GameOverBox.module.css"

function GameOverBox({ x, y }) {
    const dialogRef = useRef();

    useEffect(() => {
        async function getCookie() {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_PORT}/start`, {
                method: "GET",
                headers: { "content-type": "application/json", },
                credentials: "include",
            });
            } catch(err) {
                console.log(err);
            }
        }
        getCookie();
    }, []);

    useEffect(() => {
        dialogRef.current.showModal();
    }, []);

    return(
        <div className={styles.GameOverBoxWrapper}>
            <dialog style={{left: x, top: y}} ref={dialogRef} className={styles.GameOverBoxDialog}>
                <form onSubmit>
                    <h1>Well done! You found everyone in </h1>
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