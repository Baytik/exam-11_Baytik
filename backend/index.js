const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const users = require('./app/users');
/*const posts = require('./app/posts');
const comments = require('./app/comments');*/

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect('mongodb://localhost/posts', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    app.use('/users', users);
/*    app.use('/posts', posts);
    app.use('/comments', comments);*/
    app.listen(port)
};

run().catch(e => {
    console.error(e)
});