import SmallCharacter from "../SmallCharacter/SmallCharacter"
import styles from "./TargetBox.module.css";
import Wally from "../../assets/Wally.png";
import Odlaw from "../../assets/Odlaw.webp";
import Wanda from "../../assets/Wanda.webp";
import Whitebeard from "../../assets/Whitebeard.webp";
import { useState, useRef, useEffect } from "react";

function TargetBox() {
    const [open, setOpen] = useState(false);
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
            <dialog ref={dialogRef} className={styles.targetBoxDialog}>
                {characters.map((character, index) => (
                    <div key={index}>
                        <SmallCharacter src={character.src} name={character.name} />
                    </div>
                ))}
            </dialog>
        </div>
    )
}

export default TargetBox