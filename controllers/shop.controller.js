const ProductModel = require('../models/product.model');
const UserModel = require('../models/user.model');
const OrderModel = require('../models/order.model');

exports.getHome = (request, response, next) => response.render('shop/home');

exports.getLogin = (request, response, next) => response.render('login');

exports.getProducts = (request, response, next) => {

    ProductModel.find()
        .then(products => {

            response.render('shop/products', { products: JSON.parse(JSON.stringify(products)) });
        })
        .catch(err => console.log(err));
}

exports.findProduct = (request, response, next) => {
    ProductModel.findById(request.params.idProduct)
        .then(product => {
            response.render('shop/detail', { product: JSON.parse(JSON.stringify(product)) });
        })
        .catch(err => console.log(err));
}

exports.postAddProductToCart = (request, response, next) => {

    UserModel.findById(request.user)
        .then(user => {

            let cartProductIndex = -1;
            let quantity = 1;
            const productId = request.body.productId;

            if (user.cart) {
                //searching if exist product in cart
                cartProductIndex = user.cart.items.findIndex(item => item.productId.toString() === productId);
            } else {
                user.cart = { items: [] }
            }

            const updatedCartItems = [...user.cart.items];

            if (cartProductIndex >= 0) { //exist product
                quantity = user.cart.items[cartProductIndex].quantity + 1;
                updatedCartItems[cartProductIndex].quantity = quantity;
            } else {
                updatedCartItems.push({
                    productId: productId,
                    quantity: quantity,
                });
            }
            user.cart.items = updatedCartItems;

            return user.save();
        })
        .then(() => {
            console.log('added to cart')
            response.redirect('/cart');
        })
        .catch(err => console.log(err));
}


exports.getCart = (request, response, next) => {

    UserModel.findById(request.user).populate('cart.items.productId')
        .then(user => {

            let items = JSON.parse(JSON.stringify(user.cart.items));
            items.map(item => {
                item.subtotal = item.quantity * item.productId.price;
                return item;
            });

            let total = 0;
            items.forEach(item => {
                total += item.subtotal;
            });

            response.render('shop/cart', { items: items, total: total })
        })
        .catch(err => console.log(err));
};


exports.postDeleteProductToCart = (request, response, next) => {

    let productId = request.body.productId;
    let userId = request.user;

    UserModel.findById(userId) //get update data
        .then(user => {

            let updateItems = [...user.cart.items];
            let findProductIndex = updateItems.findIndex(proItem => proItem.productId.toString() === productId);
            updateItems.splice(findProductIndex, 1);

            user.cart.items = updateItems;

            return user.save();
        })
        .then(() => response.redirect('/cart'))
        .catch(err => console.log(err));
}

exports.postAddOrder = (request, response, next) => {


    UserModel.findById(request.user)
        .then(user => {

            let cartItems = [...user.cart.items];

            const order = new OrderModel({
                user: user._id,
                products: { items: cartItems }
            });

            return order.save()
                .then(() => {

                    user.cart = { items: [] };

                    return user.save()
                        .then(response.redirect('/orders'))
                        .catch(err => console.log(err));

                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

exports.getOrders = (request, response, next) => {

    OrderModel.find({ user: request.user })
        .populate('products.items.productId')
        .then(result => {

            let orders = [...JSON.parse(JSON.stringify(result))];

            orders = orders.map(order => {

                let total = 0;
                let items = [...order.products.items];

                order.products.items = items.map(item => {
                    item.subtotal = item.quantity * item.productId.price;
                    total += item.subtotal;
                    return item
                })

                order.total = total;
                order.products.items = items;
                return order;
            });

            response.render('shop/order', { orders: JSON.parse(JSON.stringify(orders)) })
        })
        .catch(err => console.log(err));
}