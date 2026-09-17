const prisma = require("../lib/prisma.js");

async function findAllUsers() {
    const users = await prisma.user.findMany();
    return users;
};

async function findHighScore() {
    const highScorer = await prisma.user.aggregate({
        _min: {
            time: true,
        },
    });

    const highScore = highScorer.time;
    return highScore;
};

async function findCharacterByCoordinates({ x, y, name }) {
    const character = await prisma.character.findFirst({
        where: { 
            name: name,
            minX: { lte: x },
            maxX: { gte: x },
            minY: { lte: y },
            maxY: { gte: y },
         },
    });

    return character;
};

module.exports = {
    findAllUsers,
    findHighScore,
    findCharacterByCoordinates,
}