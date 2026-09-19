import styles from "./SmallCharacter.module.css";
import Tick from "../../assets/Tick.png";

function SmallCharacter({ src, name, handleClick, ticked = "none" }) {
    return(
        <div onClick={() => handleClick(name)} className={styles.smallCharacterContainer}>
            <img className={styles.smallCharacter} src={src} alt={`image of ${name}`} />
            <img src={Tick} alt="tick" className={styles.tick} style={{display: ticked}}/>
            <h3 className={styles.smallCharacterName}>{name}</h3>
        </div>
    )
}

export default SmallCharacter