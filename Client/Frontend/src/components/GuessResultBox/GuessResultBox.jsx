import { useRef, useEffect } from "react";
import styles from "./GuessResultBox.module.css"

function GuessResultBox({ open, closeBox, character }) {
    const dialogRef = useRef();

    useEffect(() => {
        if (dialogRef.current) {
            if (open) {
                dialogRef.current.showModal();
            } else {
                dialogRef.current.close();
            }
        }
    }, [open]);

    return(
        <div className={styles.GuessResultBoxWrapper}>
            <dialog ref={dialogRef} className={styles.GuessResultBoxDialog}>
                {character ? 
                    <p>{character} found!</p> :
                    <p>Wrong!</p>
                }
                <button onClick={() => closeBox()} type="button">X</button>
            </dialog>
        </div>
    )

}

export default GuessResultBox