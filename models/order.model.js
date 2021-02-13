const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Order {

    constructor(user, cart) {
        this.user = user;
        this.cart = cart;
    }

    save() {
        let db = getDb();

        return db.collection('orders').insertOne(this)
            .then(result => {
                return result;
            })
            .catch(err => console.log(err))
    }

    static fetchAll(username) {
        let db = getDb();
        return db.collection('orders').find({ 'user.username': username }).toArray()
            .then(result => {
                return result;
            })
            .catch(err => console.log(err))
    }
}

module.exports = Order;