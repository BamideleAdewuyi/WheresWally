import { Link } from "react-router";
import { useEffect, useState } from "react";
import LargeCharacter from "../LargeCharacter/LargeCharacter";
import Wally from "../../assets/Wally.png";
import Odlaw from "../../assets/Odlaw.webp";
import Wanda from "../../assets/Wanda.webp";
import Whitebeard from "../../assets/Whitebeard.webp";
import Leaderboard from "../Leaderboard/Leaderboard";
import styles from "./Homepage.module.css";

function Homepage() {
    const [users, setUsers] = useState(null);

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
        async function getUsers() {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_PORT}/allUsers`, {
                method: "GET",
                headers: { "content-type": "application/json", },
                credentials: "include",
            });

            const data = await res.json();
            setUsers(data.users);
            } catch(err) {
                console.log(err);
            }
        }
        getUsers();
    }, []);

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
            <Leaderboard users={users}/>
        </div>
    )
}

export default Homepage;