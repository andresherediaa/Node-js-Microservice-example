const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type == "CommentCreated") {
    data.status = data.content.includes("orange") ? "rejected" : "approved";
    try {
      console.log('moderted result', data)
      await axios.post("http://localhost:4005/events", {
        type: "CommentModerated",
        data,
      });
    } catch (error) {
      console.log("MODERATION SERVER ERROR");
    }
  }

  return res.send({});
});

app.listen(4003, () => {
  console.log("Moderation service 4003");
});
