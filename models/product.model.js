const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
    constructor(name, description, price, image, id) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this._id = id;
    }

    save() {

        const db = getDb();
        let operation;

        if (this.id) {
            operation = db.collection('products').updateOne({ _id: mongodb.ObjectId(this.id) }, { $set: this })
        } else {
            operation = db.collection('products').insertOne(this);
        }

        return operation
            .then(result => {
                return result;
            })
            .catch(err => {
                console.log(err)
            });
    }

    static fetchAll() {
        const db = getDb();

        return db.collection('products').find().toArray()
            .then(result => {
                return result;
            })
            .catch(err => console.log(err));
    }

    static find(productId) {
        const db = getDb();

        return db.collection('products').find({ _id: mongodb.ObjectId(productId) }).next()
            .then(result => {
                return result;
            })
            .catch(err => console.log(err));
    }

    static findIn(ids) {
        const db = getDb();

        return db.collection('products').find({ _id: { $in: ids } }).toArray()
            .then(result => {
                return result;
            })
            .catch(err => console.log(err));
    }

    static delete(productId) {
        const db = getDb();

        return db.collection('products').deleteOne({ _id: mongodb.ObjectId(productId) })
            .then(result => {
                console.log('deleted')
            })
            .catch(err => console.log(err));
    }

}

module.exports = Product;