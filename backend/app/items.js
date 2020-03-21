const express = require('express');
const router = express.Router();
const config = require('../config');
const path = require('path');
const nanoid = require('nanoid');
const multer = require('multer');

const Item = require('../models/Item');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});
const upload = multer({storage});

router.get('/:id', async (req, res) => {
    const post = await Item.find({category: req.params.id});
    res.send(post)
});

router.get('/', async (req, res) => {
    const posts = await Item.find();
    return res.send(posts)
});

router.post('/', upload.single('image'), auth, async (req, res) => {
    if (req.file) {
        req.body.image = req.file.filename;
    }

    const user = req.user;
    const object = {
        user: user._id,
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        price: req.body.price
    };

    const post = new Item(object);

    try {
        await post.save();
        return res.send(post);
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;