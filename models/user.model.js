const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {

    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        let db = getDb();

        return db.collection('users').insertOne(this)
            .then(result => {
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    }

    update() {
        let db = getDb();

        return db.collection('users').updateOne({ username: this.username }, { $set: this })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        let db = getDb();

        return db.collection('users').find().toArray()
            .then(result => {
                return result;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static find(username) {
        let db = getDb();

        return db.collection('users').find({ username: username }).next()
            .then(result => {
                return result;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static delete(username) {
        let db = getDb();

        return db.collection('users').deleteOne({ username: username })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    }

    //cart data

    addProductToCart(product) {

        const db = getDb();

        let cartProductIndex = -1;
        let quantity = 1;

        if (this.cart) {
            //searching if exist product in cart
            cartProductIndex = this.cart.items.findIndex(item => item.productId.toString() === product._id.toString());
        } else {
            this.cart = { items: [] }
        }

        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) { //exist product

            quantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = quantity;
        } else {

            updatedCartItems.push({
                productId: mongodb.ObjectId(product._id),
                quantity: quantity,
            });
        }

        return db.collection('users').updateOne(
            { _id: new mongodb.ObjectId(this._id) },
            {
                $set: {
                    cart: {
                        items: updatedCartItems
                    }
                }
            }
        ).catch(err => console.log(err));
    }

    deleteProductInCart(productId) {

        if (this.cart) {

            let updateItems = [... this.cart.items];

            let findProductIndex = updateItems.findIndex(proItem => proItem.productId.toString() === productId.toString());

            console.log(findProductIndex);
            updateItems.splice(findProductIndex, 1);

            this.cart.items = updateItems;

            this.save();
        }
    }

    static cleanCart(username) {
        let db = getDb();

        return db.collection('users').updateOne({ username: username }, { $set: { cart: { items: [] } } })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    }

}

module.exports = User;