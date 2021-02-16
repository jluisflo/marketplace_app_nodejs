const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    products: {
        items: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product', require: true },
                quantity: { type: Number, require: true }
            }
        ]
    }
});

module.exports = mongoose.model('Order', orderSchema);