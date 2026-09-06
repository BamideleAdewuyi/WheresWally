import styles from "./Game.module.css";
import { useRef, useEffect, useState } from "react";
import TargetBox from "../TargetBox/TargetBox";

function Game() {
    const gameContainerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [open, setOpen] = useState(false);
    const [boxPosition, setBoxPosition] = useState({ x: null, y: null });

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

    function handleClick(e) {
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
            console.log(xCoord, yCoord)
            setBoxPosition({ x: realBoxX, y: realBoxY });
        }
    }

    function closeBox() {
        setOpen(false);
    }
    return(
        <div className={styles.screenWrapper}>
            <div onClick={(e) => handleClick(e)} ref={gameContainerRef} className={styles.gameContainer}>
                <TargetBox open={open} closeBox={closeBox} x={boxPosition.x} y={boxPosition.y}/>
            </div>
        </div>
    )
}

export default Game