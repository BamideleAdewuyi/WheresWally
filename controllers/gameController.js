const db = require("../db/queries");
const jwt = require('jsonwebtoken');

async function allUsersGet(req, res) {
    const users = await db.findAllUsers();
    res.json({ users: users });
};

async function highScoreGet(req, res) {
    const highScore = await db.findHighScore();
    res.json({ highScore: highScore });
};

async function takeTurnPost(req, res) {
    const x = req.body.x;
    const y = req.body.y;
    const name = req.body.name;

    const character =  await db.findCharacterByCoordinates({ x, y, name });
    const token = req.cookies.gameCookie;
    const sessionData = jwt.verify(token, process.env.JWT_SECRET);
    if (character) {
        const startTime = sessionData.startTime;
        sessionData.characters[character.name] = true;
        const characters = sessionData.characters;
        const gameOver = Object.values(characters).every(character => character === true);
        const time = gameOver ? Date.now() - startTime : null;
        const gameObj = {
            characters: characters,
            startTime: startTime,
            gameOver: gameOver,
            time: time,
        };
        const newToken = jwt.sign(gameObj, process.env.JWT_SECRET);
        
        res.cookie("gameCookie", newToken, { httpOnly: true, secure: true, sameSite: 'lax' });
        res.json({
            character: character,
            sessionData: gameObj,
        });
        return;
    }

    res.json({ 
        character: character,
        sessionData: sessionData,
    });
};

async function timeGet(req, res) {
    const token = req.cookies.gameCookie;
    const sessionData = jwt.verify(token, process.env.JWT_SECRET);
    const time = sessionData.time;
    res.json({
        time: time,
    })
};

module.exports = {
    takeTurnPost,
    allUsersGet,
    highScoreGet,
    timeGet,
}