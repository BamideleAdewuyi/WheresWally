import SmallCharacter from "../SmallCharacter/SmallCharacter"
import styles from "./TargetBox.module.css";
import Wally from "../../assets/Wally.png";
import Odlaw from "../../assets/Odlaw.webp";
import Wanda from "../../assets/Wanda.webp";
import Whitebeard from "../../assets/Whitebeard.webp";
import { useRef, useEffect } from "react";

function TargetBox({ open, x, y, closeBox, handleClick, characters }) {
    const dialogRef = useRef();
    const characterSrc = [
            {   
                name: "Wally",
                src: Wally,
                found: characters.Wally
            }, 
            {
                name: "Odlaw",
                src: Odlaw,
                found: characters.Odlaw,
            }, 
            {
                name: "Wanda",
                src: Wanda,
                found: characters.Wanda,
            },
            {
                name: "Whitebeard",
                src: Whitebeard,
                found: characters.Whitebeard,
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
                {characterSrc.map((character, index) => (
                    <SmallCharacter key={index} src={character.src} name={character.name} handleClick={handleClick} ticked={character.found}/>
                ))}
                <button onClick={() => closeBox()} type="button">X</button>
            </dialog>
        </div>
    )
}

export default TargetBox