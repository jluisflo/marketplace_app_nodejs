const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {

    MongoClient.connect('mongodb+srv://node_app:admin@cluster0.n0fny.mongodb.net/shop?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connected!');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }

    throw 'No database found'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

//connection manual

// const postgres = require('pg')

// const pool = new postgres.Pool({
//     host: 'localhost',
//     port: 5432,
//     database: 'shop',
//     user: 'postgres',
//     password: 'admin',
//     max: 20,
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
// })

// module.exports = pool;


//connect with sequelize

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('shop', 'postgres', 'admin', {
//     dialect: 'postgres',
//     host: 'localhost'
// });

// module.exports = sequelize;