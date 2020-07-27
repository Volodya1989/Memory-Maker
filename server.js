const express = require("express");
const exphbs = require("express-handlebars");
var compression = require('compression')
const PORT = process.env.PORT || 3000;
const app = express();
const db = require("./models");
const cookieParser = require('cookie-parser');
const ViewsController = require("./controllers/viewsController");
const APIController = require("./controllers/apiController");
const UsersController = require("./controllers/usersController");
const EventsController = require("./controllers/eventsController");
const MemoriesController = require("./controllers/memoriesController")


// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// Handlebars setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use(express.static("public"));

// Routes
app.use(ViewsController);
app.use(APIController);
app.use("/users", UsersController);
app.use("/api/newMemory", EventsController);
app.use("/memories", MemoriesController);

db.sequelize
    .sync()
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server listening on: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database.");
    console.log(err);
  });