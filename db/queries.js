const prisma = require("../lib/prisma.js");

async function findAllUsers() {
    const users = await prisma.user.findMany();
    return users;
}

module.exports = {
    findAllUsers,
}