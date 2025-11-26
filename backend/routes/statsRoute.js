const express = require("express");
const router = express.Router();

const { getSystemStats } = require("../controllers/statsController");

router.get("/", getSystemStats);

module.exports = router;
