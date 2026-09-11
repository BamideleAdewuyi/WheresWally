import styles from "./SmallCharacter.module.css";

function SmallCharacter({ src, name, handleClick }) {
    return(
        <div onClick={() => handleClick(name)} className={styles.smallCharacterContainer}>
            <img className={styles.smallCharacter} src={src} alt={`image of ${name}`} />
            <h3 className={styles.smallCharacterName}>{name}</h3>
        </div>
    )
}

export default SmallCharacter