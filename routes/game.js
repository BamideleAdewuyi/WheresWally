const { Router } = require("express");
const gameController = require("../controllers/gameController");
const gameRouter = Router();
const jwt = require('jsonwebtoken');

gameRouter.get("/start", function (req, res, next) {
    const gameObj = {
        characters: {
            Wally: false,
            Wanda: false,
            Odlaw: false,
            Whitebeard: false,
        },
        startTime: Date.now(),
    };

    const token = jwt.sign(gameObj, process.env.JWT_SECRET);

    res.cookie("gameCookie", token, { httpOnly: true, secure: true, sameSite: 'lax' });
    return res.send("Cookie set");
});

gameRouter.get("/allUsers", gameController.allUsersGet);
gameRouter.get("/gameOver", gameController.gameOverGet);

gameRouter.post("/takeTurn", gameController.takeTurnPost);

module.exports = gameRouter;