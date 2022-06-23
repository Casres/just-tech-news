// for the css
const path = require('path');

// for the handlebars 
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

// for the endpoints
const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');

// servers
const app = express();
const PORT = process.env.PORT || 3001;

// front-end HTML
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// for the css
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turns on routes
app.use(routes);

// turns on connection to DB and Server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`SERVER ONLINE, now listening to port ${PORT}` ));
}); 