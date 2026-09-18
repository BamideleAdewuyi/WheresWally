import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./GameOverBox.module.css"
import Error from "../Error/Error";

function GameOverBox({ x, y, time }) {
    const dialogRef = useRef();
    const [name, setName] = useState('');
    const [errors, setErrors] = ([]);
    const navigate = useNavigate();

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

    async function addUser(e) {
        e.preventDefault();
        const userObj = { name };
        try {
            const res = await fetch(`${import.meta.env.VITE_API_PORT}/newUser`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify(userObj)
        });
        if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (data.msg) {
            console.log(data.msg);
            navigate('/');
        } else {
            setErrors(data.errors.map((error) => error.msg));
        }    
        } catch(err) {
            console.log(err);
        }
    }

    return(
        <div className={styles.GameOverBoxWrapper}>
            <dialog style={{left: x, top: y}} ref={dialogRef} className={styles.GameOverBoxDialog}>
                <form onSubmit={addUser}>
                    <h1>Well done! You found everyone in {formattedTime}</h1>
                    <h2>Add your name to the leaderboard:</h2>
                    <label htmlFor="name">Name</label>
                    <input value={name} type="text" id="name" name="name" onChange={e => setName(e.target.value)}/>
                    <button type="submit">Save score</button>
                    <button type="button">Go home without saving</button>
                </form>
            </dialog>
        </div>
    )
}

export default GameOverBox