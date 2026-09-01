import styles from "./LargeCharacter.module.css";

function LargeCharacter({ src, name }) {
    return(
        <img className={styles.largeCharacter} src={src} alt={`image of ${name}`} />
    )
}

export default LargeCharacter