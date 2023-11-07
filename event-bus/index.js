const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
//middlewares
app.use(bodyParser.json());
app.use(cors());

const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;
  events.push(event);
  try {
    await axios.post("http://localhost:4000/events", event);
    await axios.post("http://localhost:4001/events", event);
    await axios.post("http://localhost:4002/events", event);
    await axios.post("http://localhost:4003/events", event);
  } catch (error) {
    console.log("EVENT BUS SERVER ERROR");
  }
  return res.send({ status: "ok" });
});

app.get("/events", (req, res) => {
  return res.send(events);
});

app.listen(4005, () => {
  console.log("liestening in 4005 port event bus");
});
