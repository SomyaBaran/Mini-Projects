const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./controllers/auth"); // correct path

app.use(cors());
app.use(express.json());

app.use("/", authRoutes); // mount the routes from auth.js

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
