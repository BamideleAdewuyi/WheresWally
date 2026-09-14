import styles from "./Game.module.css";
import { useRef, useEffect, useState } from "react";
import TargetBox from "../TargetBox/TargetBox";
import GuessResultBox from "../GuessResultBox/GuessResultBox";

function Game() {
    const gameContainerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [open, setOpen] = useState(false);
    const [boxPosition, setBoxPosition] = useState({ x: null, y: null });
    const [xGuess, setXGuess] = useState(null);
    const [yGuess, setYGuess] = useState(null);

    useEffect(() => {
        async function getCookie() {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_PORT}/start`, {
                method: "GET",
                headers: { "content-type": "application/json", },
                credentials: "include",
            });
            } catch(err) {
                console.log(err);
            }
        }
        getCookie();
    }, []);


    useEffect(() => {
        if (gameContainerRef.current) {
            const resizeObserver = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    setDimensions({
                        width: entry.contentRect.width,
                        height: entry.contentRect.height,
                    });
                }
            });
            resizeObserver.observe(gameContainerRef.current);
            return () => {
                resizeObserver.disconnect();
            }
        }
    }, []);

    function openDialog(e) {
        if (!open) {
            setOpen(true);
    
            const x = e.clientX - e.currentTarget.getBoundingClientRect().left;
            const y = e.clientY - e.currentTarget.getBoundingClientRect().top;
    
            const safeWidth = window.innerWidth - 168;
            const safeHeight = window.innerHeight - 168;
            const realBoxX = Math.min(safeWidth, e.clientX);
            const realBoxY = Math.min(safeHeight, e.clientY);
    
            const xCoord = Math.floor(x / dimensions.width * 10000)/100;
            const yCoord = Math.floor(y / dimensions.height * 10000)/100;
            setXGuess(xCoord);
            setYGuess(yCoord);
            setBoxPosition({ x: realBoxX, y: realBoxY });
        }
    }

    async function takeTurn(name) {
        const x = xGuess;
        const y = yGuess;
        const turnObj = { x, y, name };
        try {
            const res = await fetch(`${import.meta.env.VITE_API_PORT}/takeTurn`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                credentials: "include",
                body: JSON.stringify(turnObj)
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            if (data.character) {                
                console.log(`${data.character.name} found`);

            } else {
                console.log("Incorrect");
            }
            closeBox();

        } catch(err) {
            console.log(err);
        } 
    }

    function closeBox() {
        setOpen(false);
    }

    return(
        <div className={styles.screenWrapper}>
            <div onClick={(e) => openDialog(e)} ref={gameContainerRef} className={styles.gameContainer}>
                <TargetBox open={open} closeBox={closeBox} x={boxPosition.x} y={boxPosition.y} handleClick={takeTurn}/>
            </div>
        </div>
    )
}

export default Game