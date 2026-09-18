import { Link } from "react-router";
import LargeCharacter from "../LargeCharacter/LargeCharacter";
import Wally from "../../assets/Wally.png";
import Odlaw from "../../assets/Odlaw.webp";
import Wanda from "../../assets/Wanda.webp";
import Whitebeard from "../../assets/Whitebeard.webp";
import Leaderboard from "../Leaderboard/Leaderboard";
import styles from "./Homepage.module.css";

function Homepage() {
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
        <div className={styles.homepageContainer}>
            <h1>Where's Wally?</h1>
            <h2>Find all these characters, as fast as you can</h2>
            <div className={styles.largeCharactersContainer}>
                {characters.map((character, index) => (
                    <div key={index}>
                        <LargeCharacter src={character.src} name={character.name} />
                    </div>
                ))}
            </div>
            <Link to="/play">Start Game</Link>
        </div>
    )
}

export default Homepage;