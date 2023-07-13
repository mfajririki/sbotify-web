const express = require("express");
const path = require("path");

// Harus install dulu
// const cors = require('cors');

// app.use(cors({
//   origin: "*",
//   methods: "*"
// }));

const app = express();

let users = [
  {
    id: 1,
    name: "John",
    age: 21,
  },
  {
    id: 2,
    name: "Doe",
    age: 18,
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_req, res) => {
  res.render("index", { title: "Express" });
});

app.get("/about", (req, res) => {
  res.send("simple rest API");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const age = req.query.age;
  res.set("Custom-Header", "this is a custom header");
  if (!!name) {
    res.send(users.filter((user) => user.name === name && user.age === age));
    return;
  }
  res.send(users);
});

app.post("/users", (req, res) => {
  const newUsers = [
    ...users,
    {
      id: new Date().valueOf(),
      name: req.body.name,
      age: req.body.age,
    },
  ];
  users = newUsers;
  res.status(201);
  res.send(newUsers);
});

app.get("/users/:id", (req, res) => {
  res.send(users.find((user) => user.id === parseInt(req.params.id)));
});

app.put("/users/:id", (req, res) => {
  const userIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );
  users[userIndex] = { ...req.body, id: users[userIndex].id };
  res.send(users[userIndex]);
});

app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );
  // console.log(userIndex, users.splice(userIndex, 1));
  res.send(users.splice(userIndex, 1)[0]);
});

const listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
