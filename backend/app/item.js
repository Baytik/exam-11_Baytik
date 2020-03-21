const express = require('express');
const router = express.Router();

const Item = require('../models/Item');
const auth = require('../middleware/auth');

router.get('/:id', async (req, res) => {
    const posts = await Item.find({_id: req.params.id}).populate('user', {displayName: 1, phoneNumber: 1});
    return res.send(posts)
});

router.delete('/:id', auth, async (req, res) => {
    const user = req.user;
    const findItem = await Item.findOne({_id: req.params.id});
    if (JSON.stringify(user._id) === JSON.stringify(findItem.user)) {
        const task = await Item.deleteOne({_id: req.params.id});
        try {
            await task.save();
            return res.send({message: 'Was deleted'})
        } catch (e) {
            return res.status(400).send(e);
        }
    } else {
        res.status(404).send({message: 'Not found'});
    }
});

module.exports = router;