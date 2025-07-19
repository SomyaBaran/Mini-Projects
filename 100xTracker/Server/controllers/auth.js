const express = require("express");
const router = express.Router();

const users = [];

router.post("/signup", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: "Username or password is missing" });
    }

    users.push({ username, password });
    res.status(201).send({ message: "User registered successfully" });
});

module.exports = router;
