const express = require("express");
const app = express();
const axios = require("axios");
const Ticker = require("./models/tickerModel");

// use express.json() to parse JSON bodies into JS objects
app.use(express.json());

app.get("/api/ticker", (req, res) => {
  Ticker.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

const fetchTopTenCrypto = async () => {
  const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
  const data = response.data;
  const topTen = Object.values(data)
    .sort((a, b) => b.last - a.last)
    .slice(0, 10);

  Ticker.deleteMany({}).then(() => {
    console.log("Data successfully deleted!");
    Ticker.insertMany(topTen)
      .then(() => {
        console.log("Data successfully loaded!");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return topTen;
};

app.get("/api/fetch", (req, res) => {
  try {
    fetchTopTenCrypto().then((data) => {
      res.status(200).send(data);
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = app;
// xOEKveIFDK8fLpdX;
