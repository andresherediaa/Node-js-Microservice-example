const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

app = express();

//moiddleware
app.use(bodyParser.json());
app.use(cors());

const handleEvents = (type, data) => {
  if (type == "PostCreated") {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }
  if (type == "CommentCreated") {
    const { postId } = data;
    const comments = posts[postId].comments;
    comments.push(data);
  }
  if (type == "CommentUpdated") {
    const { postId, comments } = data;
    console.log("====>", posts);
    posts[postId].comments = comments;
  }
};

const posts = {};
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvents(type, data);

  return res.send({ status: posts });
});

app.get("/posts", (req, res) => {
  return res.send(posts);
});

app.listen(4002, async () => {
  console.log("START QUERY SERVICE 4002");
  try {
    const events = await axios.get("http://localhost:4005/events");
    for (let event of events.data) {
      console.log("tyoe envet proceswed", event.type);
      handleEvents(event.type, event.data);
    }
  } catch (error) {
    console.log("ERROR INTO QUERY SERVICE 4002".error.message);
  }
});
