const { Router } = require("express");
const router = Router();
const gameRouter = require("./game");

router.use("/", gameRouter);

module.exports = router;