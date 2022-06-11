const router = require("express").Router();
const { User } = require("../../models");

// GETs /api/users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ['password']}
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      req.status(500).json(err);
    });
});

// GETs /api/user/1
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POSTs /api/users
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/users/1
router.put("/:id", (req, res) => {
  User.update(req.body, {
      where: {
        id: req.params.id
      },
    })
    .then((dbUpdateData) => {
      if (!dbUpdateData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUpdateData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETEs /api/users/1
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user is found with this id' });
            return;
        }
        res.json({
          deleted: dbUserData,
          message: `successfully deleted ${dbUserData} user`
        });
    })
    .catch( err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
//  hello 
// all this is what needs to be set in 
