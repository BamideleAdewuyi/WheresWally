import { Link } from "react-router";
import LargeCharacter from "../LargeCharacter/LargeCharacter";
import Wally from "../../assets/Wally.png";
import Odlaw from "../../assets/Odlaw.webp";
import Wanda from "../../assets/Wanda.webp";
import Whitebeard from "../../assets/Whitebeard.webp"

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
        <>
            <h1>Where's Wally?</h1>
            <h2>Find all these characters, as fast as you can</h2>
            <div>
                {characters.map((character, index) => (
                    <div>
                        <LargeCharacter key={index} src={character.src} name={character.name} />
                        <h3>{character.name}</h3>
                    </div>
                ))}
            </div>
            <Link>Start Game</Link>
        </>
    )
}

export default Homepage;