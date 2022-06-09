const router = require('express').Router();
const { Post, User } = require('../../models');

router.get('/', (req, res) => {
    console.log('==============================');
    Post.findAll({
        attributes: ['id', 'post_url', 'title', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
});