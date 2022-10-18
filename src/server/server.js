const express = require("express");
const users = require("./db.json");
const app = express();
app.use(express.json());

// GET: all users
app.get("/users", (req, res) => {
  res.status(200).json({
    error: false,
    message: "data fetch successfully",
    data: users,
  });
});

// GET: single user by id
app.get("/users/:id", (req, res) => {
  // get the id from the route parameters
  let id = req.params.id;
  // find the user from the array
  let userIndex = users.findIndex((user) => user.supervisorId == id);
  let userResult = users[userIndex];

  if (userResult == undefined) {
    return res.status(404).json({
      error: true,
      message: `No user found from id ${id}`,
    });
  }

  res.status(200).json({
    error: false,
    message: "Record fetched successfully",
    data: userResult,
  });
});

// GET: single supervisee by id
app.get("/users/supervisee/:id", (req, res) => {
  // get the id from the route parameters
  let superviseDetail;
  let id = req.params.id;
  users.map((data) => {
    let index = data.supervisee.findIndex((e) => e.id == id);

    if (index != -1) {
      data.supervisee.forEach((e) => {
        if (e.id == id) {
          superviseDetail = e;
        }
      });
    }
  });

  let userResult = superviseDetail;

  if (userResult == undefined) {
    return res.status(404).json({
      error: true,
      message: `No user found from id ${id}`,
    });
  }

  res.status(200).json({
    error: false,
    message: "Record fetched successfully",
    data: superviseDetail,
  });
});

// POST: create new user
app.post("/users", (req, res) => {
  let newUser = req.body;
  users.push(newUser);
  res.status(201).json({
    error: false,
    message: "New Supervisor added successfully",
    data: newUser,
  });
});

// POST: create new supervise
app.post("/users/supervise", (req, res) => {
  let newUser = req.body;
  let userIndex = users.findIndex(
    (user) => user.supervisorId == newUser.supervisorId
  );
  users[userIndex].supervisee.push(newUser);
  res.status(201).json({
    error: false,
    message: "New Supervisee added successfully",
    data: newUser,
  });
});

// PUT: update existing user
app.put("/users/:id", (req, res) => {
  let id = req.params.id;
  let userIndex = users.findIndex((user) => user.supervisorId == id);
  users[userIndex] = req.body;
  res.status(201).json({
    error: false,
    message: "Supervisor updated successfully",
  });
});

// DELETE: delete user by Id
app.delete("/users/:id", (req, res) => {
  let id = req.params.id;
  let userIndex = users.findIndex((user) => user.id == id);
  users.splice(userIndex, 1);
  res.status(202).json({
    error: false,
    message: "Supervisor deleted successfully",
  });
});

// DELETE: delete supervisee by Id
app.delete("/users/delete/supervisee", (req, res) => {
  let delUser = req.body;
  let supervisor_position = users.findIndex(
    (user) => user.supervisorId == delUser.supervisorId
  );
  let supervise_position = users[supervisor_position].supervisee.findIndex(
    (supervise) => supervise.id == delUser.id
  );
  users[supervisor_position].supervisee.splice(supervise_position, 1);
  res.status(202).json({
    error: false,
    message: "Supervisee deleted successfully",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`);
});
