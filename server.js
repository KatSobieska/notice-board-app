const express = require("express");
const cors = require("cors");
const path = require("path");
const connectToDB = require("./db");

const app = express();

connectToDB();

const server = app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "/client/build")));

app.use("/api", require("./routes/ads.routes"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found..." });
});

module.exports = server;
