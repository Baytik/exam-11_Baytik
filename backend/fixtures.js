const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Item = require('./models/Item');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(collections);

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [test1, test2] = await User.create({
        username: 'test@mail.ru',
        password: '123',
        displayName: 'John Doe',
        phoneNumber: '+123456789',
        token: 'asdh6274btyergxvtf'
    }, {
        username: 'test@gmail.com',
        password: '123',
        displayName: 'Jack Mi',
        phoneNumber: '+987654321',
        token: 'asda34234asdas'
    });

    const item = await Item.create({
        title: 'Acer Nitro Five',
        description: 'Power gaming notebook',
        image: 'notebook.jpeg',
        category: 'computers',
        price: 1100,
        user: test1
    }, {
        title: 'Ferrari F8 Turbito',
        description: 'Very fast car',
        image: 'ferrari.jpeg',
        category: 'cars',
        price: 100000,
        user: test2
    }, {
        title: 'Big TV',
        description: 'HD 2k TV',
        image: 'TV.jpeg',
        category: 'other',
        price: 1500,
        user: test1
    }, {
        title: 'Game computer',
        description: 'Very Power Computer',
        image: 'computer.jpeg',
        category: 'computers',
        price: 1200,
        user: test2
    });

    mongoose.connection.close();
};

run().catch(e => {
    mongoose.connection.close();
    throw e;
});