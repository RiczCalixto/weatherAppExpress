const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve!
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ricardo Calixto"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Ricardo Calixto"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Ricardo Calixto"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("Please provide an address");
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, placeName } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          placeName,
          forecastData: forecastData,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    errorMsg: "Can't find this article"
  });
});
// * = match everything except what im telling (help, weather, about)
app.get("*", (req, res) => {
  res.render("error", {
    errorMsg: "Error 404. Unavailable page."
  });
});

app.listen(port, () => {
  console.log("Servidor está ativo");
});
