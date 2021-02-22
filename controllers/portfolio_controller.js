const express = require("express");
const router = express.Router();

//For future development
const portfolio = require("../models/portfolio_model");

router.get("/", (req, res) => {
    res.render("index")
});