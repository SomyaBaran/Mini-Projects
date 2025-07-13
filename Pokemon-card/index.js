const express = require("express");
const app = express();
const pokemon = require("./pokemon.json")

app.use(express.json());

app.post("/pokemon", (req, res) => {
    const type = req.body.type;
    const limit = req.body.limit;
    
    const matches = pokemon.filter(pokemon =>
        pokemon.type.some(t => t.toLowerCase() === type.toLowerCase())
    );
    res.json(limit ? matches.slice(0, limit) : matches);
})

app.use(express.static("public"));
app.listen(3000, () => {
    console.log("The server is running on http://localhost:3000")
})

