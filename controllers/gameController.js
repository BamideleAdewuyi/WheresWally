const db = require("../db/queries");

async function allUsersGet(req, res) {
    const users = await db.findAllUsers();
    res.json({ users: users });
};

async function characterByCoordinatesPost(req, res) {
    const x = req.body.x;
    const y = req.body.y;
    const name = req.body.name;

    const character = db.findCharacterByCoordinates({ x, y, name });

    res.json({ character: character });
};

module.exports = {
    characterByCoordinatesPost,
    allUsersGet,
}