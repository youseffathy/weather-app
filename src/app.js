const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./geocode");
const forecast = require("./forecast");

//specify heroku port or 3000 for localhost
const port = process.env.PORT || 3000;
const app = express();
//Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

// set partials location, where partials are small parts of templates (like header , footer)
//that we want them in all pages
hbs.registerPartials(partialsPath);
// Set up static directory to serve , it is the root folder of all html and css files
app.use(express.static(publicDirPath));
/* method to do something when a request received 
from a route in first argument. 
argument: 1) routes : "/help" for app.com/help, "" for root page etc
          2) callback function executed when request 
             received with two argument : req for request
             res for response.
*/
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "MrJoe",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "MrJoe",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "MrJoe",
    text: "This is some helpful text.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "You must provide a location",
    });
  }
  var result = {};
  const { location } = req.query;
  geocode(location, (error, data) => {
    if (error) {
      result["error"] = error;
      res.send(result);
      return;
    }
    const { placeName: address } = data;
    result["Location"] = address;

    //call forecast function
    forecast(data, (error, data) => {
      if (error) {
        result["error"] = error;
        res.send(result);
        return;
      }
      result = data;
      res.send(result);
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Help article not found",
    name: "MrJoe",
  });
});

//for 404 page we must write it ((((after)))) all pages we set
app.get("*", (req, res) => {
  res.render("error", {
    title: "Error 404 page not found",
    name: "MrJoe",
  });
});

/* A method to start the server up at specific port */
app.listen(port, () => {
  console.log("Server is up at port " + port);
});
