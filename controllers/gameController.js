const db = require("../db/queries");

async function characterByCoordinatesPost(req, res) {
    const x = req.body.x;
    const y = req.body.y;
    const name = req.body.name;

    const character = db.findCharacterByCoordinates({ x, y, name });

    return character;
};

module.exports = {
    characterByCoordinatesPost,
}