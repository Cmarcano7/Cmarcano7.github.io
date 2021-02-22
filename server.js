//Setting main dependencies used
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");

//Creating t=routes necessary for users
const routes = require("./controllers/users_controllers.js")

//Using local or enviroment port
const PORT = process.env.PORT || 3306;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// To serve static files such as CSS files and JavaScript files.
app.use(express.static('public'));

// Setting our default view for our webpage
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Actual use of routes set in controller
app.use(routes);

// Validating correct server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});