import SmallCharacter from "../SmallCharacter/SmallCharacter"
import styles from "./TargetBox.module.css";
import Wally from "../../assets/Wally.png";
import Odlaw from "../../assets/Odlaw.webp";
import Wanda from "../../assets/Wanda.webp";
import Whitebeard from "../../assets/Whitebeard.webp";
import { useState, useRef, useEffect } from "react";

function TargetBox({ open, x, y, closeBox }) {
    const dialogRef = useRef();
    const characters = [
            {   
                name: "Wally",
                src: Wally,
            }, 
            {
                name: "Odlaw",
                src: Odlaw,
            }, 
            {
                name: "Wanda",
                src: Wanda,
            },
            {
                name: "Whitebeard",
                src: Whitebeard,
            }];
    
    useEffect(() => {
        if (dialogRef.current) {
            if (open) {
                dialogRef.current.showModal();
            } else {
                dialogRef.current.close();
            }
        }
    }, [open])
    return(
        <div className={styles.targetBoxWrapper}>
            <dialog style={{left: x, top: y}} ref={dialogRef} className={styles.targetBoxDialog}>
                {characters.map((character, index) => (
                    <SmallCharacter key={index} src={character.src} name={character.name} />
                ))}
                <button onClick={() => closeBox()} type="button">X</button>
            </dialog>
        </div>
    )
}

export default TargetBox