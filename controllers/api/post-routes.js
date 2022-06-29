const router = require("express").Router();
const { Post, User, Vote, Comment } = require("../../models");
const sequelize = require("../../config/connection");

// gets all posts
router.get("/", (req, res) => {
  console.log("==============================");
  Post.findAll({
    // order: [["created_at", "DESC"]],
    attributes: [
      "id",
      "post_url",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
    // order: [["created_at", "DESC"]],
    include: [
      {
        model: Comment,
        attributes: [
          "id", 
          "comment_text", 
          "post_id", 
          "user_id", 
          // "created_at"
        ],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// gets specific posts
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "post_url",
      "title",
      "created_at",
      // the vote count
      [
        sequelize.literal(
          "(SELECT COUNT (*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
    // the user(s) the voted
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res
          .status(404)
          .json({ message: "No post found with this ID, please try again " });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//  creates a post
router.post("/", (req, res) => {
  Post.create({
    title: req.body.title,
    post_url: req.body.post_url,
    user_id: req.body.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// upvotes on a post
router.put("/upvote", (req, res) => {
  // making sure that the session exists
  if (req.session) {
    // passes the session id along with all the destructured properties on req.body
    Post.upvote({...req.body, user_id: req.session.user_id})
      .then((updatedPostData) => res.json(updatedPostData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});
// updates post
router.put("/:id", (req, res) => {
  Post.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res
          .status(404)
          .json({ message: "No post found with this ID, please try again" });
        return;
      }
      res.json({
        changed_rows: dbPostData,
        title_changed_to: req.body.title,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// deletes a post
router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res
          .status(400)
          .json({ message: "No post found with this ID, please try again" });
        return;
      }
      res.json({
        rows_affected: dbPostData,
        deleted_message: req.params.id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
