const router = require("express").Router();
const { Comment, Post } = require("../../models");

router.get("/", (req, res) => {
  Comment.findAll({
    attributes: ["id", "comment_text", "user_id", "post_id"],
  })
    .then((dbCommentsData) => res.json(dbCommentsData))
    .catch((err) => {
      console.log(err);
      req.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Comment.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "post_url", "title"],
      },
    ],
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

router.post("/", (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.body.user_id,
    post_id: req.body.post_id,
  })
    .then((dbCommentsData) => res.json(dbCommentsData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// USE THIS UPDATER
router.put("/:id", (req, res) => {
  Comment.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUpdateData) => {
      if (!dbUpdateData[0]) {
        res.status(404).json({ message: "No comment found with this id" });
        return;
      }
      res.json(dbUpdateData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentsData) => {
      if (!dbCommentsData) {
        res.status(400).json({
          message: "No comment found with this ID, please try again.",
        });
        return;
      }
      res.json({
        rows_affected: dbCommentsData,
        deleted_message: req.params.id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
