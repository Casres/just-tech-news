// gets the date, plural and url formats
const helpers = require("./utils/helpers");

// for the css
const path = require("path");

// for the handlebars
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });

// for the endpoints
const express = require("express");
const routes = require("./controllers/");
const sequelize = require("./config/connection");

// servers
const app = express();
const PORT = process.env.PORT || 3001;

// makes a session (a cookie) from the server (express)
const session = require("express-session");
//
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Super Secret Secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// front-end HTML
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// for the css
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turns on routes
app.use(routes);

// turns on connection to DB and Server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`SERVER ONLINE, now listening to port ${PORT}`)
  );
});
