import { useRef, useEffect } from "react";
import styles from "./GuessResultBox.module.css"

function GuessResultBox({ open, x, y, closeBox, character }) {
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
            <dialog style={{left: x, top: y}} ref={dialogRef} className={styles.GuessResultBoxDialog}>
                {character ? 
                    <p className={styles.GuessResultBoxResult}>{character} found!</p> :
                    <p className={styles.GuessResultBoxResult}>Wrong!</p>
                }
                <button className={styles.GuessResultBoxButton} onClick={() => closeBox()} type="button">X</button>
            </dialog>
        </div>
    )

}

export default GuessResultBox