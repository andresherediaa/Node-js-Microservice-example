const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const axios = require("axios");
var cors = require("cors");

const app = express();
//midlewaress
app.use(cors());
app.use(bodyParser.json());
//end points
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  postId = req.params.id;
  return res.send(commentsByPostId[postId] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  postId = req.params.id;
  const { content } = req.body;
  commentId = randomBytes(4).toString("hex");

  comments = commentsByPostId[postId] || [];
  comment = {
    id: commentId,
    content,
    status: "pending",
    postId,
  };
  comments.push(comment);
  commentsByPostId[postId] = comments;
  //event bus
  try {
    await axios.post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        content,
        postId,
        status: "pending",
      },
    });
  } catch (error) {
    console.log("error comments events");
  }
  return res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type == "CommentModerated") {
    const { postId, id, status } = data;
    const comments = commentsByPostId[postId];
    comments.map((comment) => {
      if (comment.id == id) {
        comment.status = status;
      }
    });

    const CommentUpdated = {
      type: "CommentUpdated",
      data: { comments: commentsByPostId[postId], postId },
    };
    console.log("CommentUpdated===>", CommentUpdated);
    try {
      await axios.post("http://localhost:4005/events", CommentUpdated);
    } catch (error) {
      console.log("COMMENTS SERVER ERROR");
    }
  }

  return res.send({});
});

app.listen(4001, () => {
  console.log("Comments in port 4001");
});
