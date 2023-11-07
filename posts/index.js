const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Routes POSTS
const posts = {};

app.get("/posts", (req, res) => {
  return res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };

  try {
    await axios.post("http://localhost:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    });
  } catch (error) {
    console.log("POST SERVER ERROR")
  }
  

  return res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("event recieved", req.body.type);
  return res.send({});
});

app.listen(4000, () => {
  console.log("Posts server in Port 4000");
});
