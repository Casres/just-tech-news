const router = require('express').Router();
const { Comments } = require('../../models');

router.get('/', (req, res) => {
    Comments.findAll({
        attributes: [
            'id',
            'comment_text',
            'user_id',
            'post_id'
        ]
    })
    .then((dbCommentsData) => res.json(dbCommentsData))
    .catch((err) => {
        console.log(err);
        req.status(500).json(err)
    });
});

router.post('/', (req, res) => {
    Comments.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(dbCommentsData => res.json(dbCommentsData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Comments.destroy({
        where: {
            id: req.params.id
        }
    })
    .then((dbCommentsData) => {
        if(!dbCommentsData) {
            res.status(400).json({ message: "No comment found with this ID, please try again." });
            return;
        }
        res.json({
            rows_affected: dbCommentsData,
            deleted_message: req.params.id
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;