const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, require: true
    },
    email: {
        type: String, require: true
    },
    cart: {
        items: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product', require: true },
                quantity: { type: Number, require: true }
            }
        ]
    },
});

module.exports = mongoose.model("User", userSchema);