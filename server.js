const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turns on routes
app.use(routes);

// turns on connection to DB and Server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`SERVER ONLINE, now listening to port ${PORT}` ));
});