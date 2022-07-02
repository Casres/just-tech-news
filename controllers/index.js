const router = require("express").Router();

const homeRoutes = require("./home-routes.js");
const apiRoutes = require("./api");
const dashboard = require('./dashboard-routes');


router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboard);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
// all this is what needs to be set in
