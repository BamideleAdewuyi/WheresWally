const db = require("../db/queries");
const jwt = require('jsonwebtoken');

async function allUsersGet(req, res) {
    const users = await db.findAllUsers();
    res.json({ users: users });
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
        const gameObj = {
            characters: characters,
            startTime: startTime
        };
        const newToken = jwt.sign(gameObj, process.env.JWT_SECRET);
        
        res.cookie("gameCookie", newToken, { httpOnly: true, secure: true, sameSite: 'lax' });
    }

    res.json({ 
        character: character,
        sessionData: sessionData,
    });
};

module.exports = {
    takeTurnPost,
    allUsersGet,
}