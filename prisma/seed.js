require("dotenv/config");
const prisma = require("../lib/prisma.js");

async function main() {
  const odlaw = await prisma.character.upsert({
    where: { name: "Odlaw" },
    update: {},
    create: {
      name: "Odlaw",
      minX: 31.52,
      maxX: 32.3,
      minY: 45.5,
      maxY: 48.19,
    },
  });
  const wanda = await prisma.character.upsert({
    where: { name: "Wanda" },
    update: {},
    create: {
      name: "Wanda",
      minX: 51.91,
      maxX: 52.92,
      minY: 48.52,
      maxY: 50.79,
    },
  });
  const wally = await prisma.character.upsert({
    where: { name: "Wally" },
    update: {},
    create: {
      name: "Wally",
      minX: 65.39,
      maxX: 66.09,
      minY: 43.65,
      maxY: 46.43,
    },
  });
  const whitebeard = await prisma.character.upsert({
    where: { name: "Whitebeard" },
    update: {},
    create: {
      name: "Whitebeard",
      minX: 76.83,
      maxX: 77.85,
      minY: 41.68,
      maxY: 43.7,
    },
  });

  console.log({ wally, odlaw, wanda, whitebeard });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });