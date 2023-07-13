const express = require("express");
const app = express();
const port = 3069;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

let songList = [
  {
    title: "Heavy Rotation",
    artist: ["JKT48"],
    url: "https://open.spotify.com/track/3dqeB38vVaC5pmf8SsvhoK?si=7fa6de58823348a7",
  },
  {
    title: "Bury The Light",
    artist: ["Casey Edward", "Victor Borba"],
    url: "https://open.spotify.com/track/6tUcFEXos6TGhESFlkAyCm?si=79661ad3dfad4330",
  },
];

app.get("/", (req, res) => {
  res.render("index", { songList });
});

app.get("/songlist/new", (req, res) => {
  res.render("new.ejs");
});

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
