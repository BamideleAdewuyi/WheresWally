const db = require("../db/queries");
const jwt = require('jsonwebtoken');
const { validationResult, matchedData } = require("express-validator");
const validateUser = require("../validators/userValidator");

function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

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
    if (!character) {
      return res.json({ 
          character: null, 
          sessionData: null
      });
    }
    try {
      const token = req.cookies.gameCookie;
      const sessionData = jwt.verify(token, process.env.JWT_SECRET);
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

      res.cookie("gameCookie", newToken, { httpOnly: true, secure: true, sameSite: 'none' });
      res.json({
          character: character,
          sessionData: gameObj,
      });

    } catch(err) {
      return res.status(401).json({ error: "Invalid or expired session token"})
    }
};

async function timeGet(req, res) {
  const token = req.cookies.gameCookie;
  const sessionData = jwt.verify(token, process.env.JWT_SECRET);
  const time = sessionData.time;
  res.json({
      time: time,
  })
};

async function charactersGet(req, res) {
  const token = req.cookies.gameCookie;
    const sessionData = jwt.verify(token, process.env.JWT_SECRET);
    const characters = sessionData.characters;
    res.json({
        characters: characters,
    })
};

const newUserPost = [
  validateUser,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }

    const token = req.cookies.gameCookie;
    const sessionData = jwt.verify(token, process.env.JWT_SECRET);
    const time = sessionData.time;
    
    const { name } = matchedData(req);

    
    await db.createNewUser({ name , time});
    return res.status(201).json({
      msg: "User created successfully"
    })
  })
];

module.exports = {
    takeTurnPost,
    allUsersGet,
    highScoreGet,
    timeGet,
    charactersGet,
    newUserPost,
}