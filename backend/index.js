const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const users = require('./app/users');
const items = require('./app/items');
const item = require('./app/item');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect('mongodb://localhost/items', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    app.use('/users', users);
    app.use('/items', items);
    app.use('/item', item);
    app.listen(port)
};

run().catch(e => {
    console.error(e)
});