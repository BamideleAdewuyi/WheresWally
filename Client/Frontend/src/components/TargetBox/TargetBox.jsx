import SmallCharacter from "../SmallCharacter/SmallCharacter"
import styles from "./TargetBox.module.css";
import Wally from "../../assets/Wally.png";
import Odlaw from "../../assets/Odlaw.webp";
import Wanda from "../../assets/Wanda.webp";
import Whitebeard from "../../assets/Whitebeard.webp";

function TargetBox() {
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
    return(
        <div className={styles.targetBoxWrapper}>
            <dialog className={styles.targetBoxDialog}>
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