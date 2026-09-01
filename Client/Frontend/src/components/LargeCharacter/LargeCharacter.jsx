import styles from "./LargeCharacter.module.css";

function LargeCharacter({ src, name }) {
    return(
        <>
            <img className={styles.largeCharacter} src={src} alt={`image of ${name}`} />
            <h3 className={styles.largeCharacterName}>{name}</h3>
        </>
    )
}

export default LargeCharacter