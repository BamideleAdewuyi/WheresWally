import styles from "./SmallCharacter.module.css";

function SmallCharacter({ src, name }) {
    return(
        <>
            <img className={styles.smallCharacter} src={src} alt={`image of ${name}`} />
            <h3 className={styles.smallCharacterName}>{name}</h3>
        </>
    )
}

export default SmallCharacter