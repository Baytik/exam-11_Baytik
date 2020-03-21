const express = require('express');
const router = express.Router();

const Post = require('../models/Item');
const auth = require('../middleware/auth');

router.get('/:id', async (req, res) => {
    const posts = await Post.find({_id: req.params.id});
    return res.send(posts)
});

module.exports = router;