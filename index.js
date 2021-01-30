const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/new-message", function (req, res) {
  const { message } = req.body;
  const bot_token = process.env.BOT_TOKEN;

  if (!message || message.text.toLowerCase().indexOf("marvin") < 0) {
    return res.end();
  }

  axios
    .post(`https://api.telegram.org/bot777845702:${bot_token}/sendMessage`, {
      chat_id: message.chat.id,
      text: "Leave me alone",
    })
    .then((response) => {
      console.log("Message posted");
      res.end("ok");
    })
    .catch((err) => {
      console.warn("Error: ", err);
      res.end("Error: ", err);
    });
});

app.listen(8080, function () {
  console.log("Telegram app listening on port 8080!");
});
