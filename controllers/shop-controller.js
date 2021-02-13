const ProductModel = require('../models/product.model');
const UserModel = require('../models/user.model');
const OrderModel = require('../models/order.model');

exports.getHome = (request, response, next) => {

    response.render('shop/home');
};

exports.getProducts = (request, response, next) => {

    ProductModel.fetchAll()
        .then(products => {
            response.render('shop/products', { products: products });
        })
        .catch(err => console.log(err));
}

exports.findProduct = (request, response, next) => {
    ProductModel.find(request.params.idProduct)
        .then(product => {
            response.render('shop/detail', { product: product });
        })
        .catch(err => console.log(err));
}

exports.postAddProductToCart = (request, response, next) => {

    ProductModel.find(request.body.idProduct)
        .then(pro => {
            request.user.addProductToCart(pro)
            response.redirect('/cart');
        });

}

exports.getCart = (request, response, next) => {

    UserModel.find(request.user.username) //get update data
        .then(user => {

            if (user.cart) {

                let carItems = user.cart.items;
                const productIdInCart = carItems.map(i => { return i.productId })

                ProductModel.findIn(productIdInCart).then(pro => {

                    let productsInCart = [...pro];
                    let total = 0;
                    productsInCart = productsInCart.map(product => {
                        let carItem = carItems.find(item => item.productId.toString() === product._id.toString());
                        product.quantity = carItem.quantity;
                        product.subtotal = carItem.quantity * product.price;
                        total += product.subtotal;
                        return product;
                    });

                    response.render('shop/cart', { items: productsInCart, total: total });

                }).catch(err => console.log(err));
            } else {
                response.render('shop/cart', { items: [] });
            }

        })
        .catch(err => console.log(err));
};


exports.postDeleteProductToCart = (request, response, next) => {

    let id = request.body.productId;

    UserModel.find(request.user.username) //get update data
        .then(result => {

            let user = new User(result.username, result.email, result.cart, result._id)

            let updateItems = [...user.cart.items];
            let findProductIndex = updateItems.findIndex(proItem => proItem.productId.toString() === id);
            updateItems.splice(findProductIndex, 1);

            user.cart.items = updateItems;

            user.update();
            response.redirect('/cart');
        })
        .catch(err => console.log(err));
}

exports.postAddOrder = (request, response, next) => {

    UserModel.find(request.user.username) //get update data
        .then(user => {

            let carItems = user.cart.items;
            const productIdInCart = carItems.map(i => { return i.productId })

            ProductModel.findIn(productIdInCart).then(pro => {

                let productsInCart = [...pro];
                let total = 0;
                productsInCart = productsInCart.map(product => {
                    let carItem = carItems.find(item => item.productId.toString() === product._id.toString());
                    product.quantity = carItem.quantity;
                    product.subtotal = carItem.quantity * product.price;
                    total += product.subtotal;
                    return product;
                });

                let order = new OrderModel({ _id: user._id, username: user.username }, { total: total, items: productsInCart });

                //order save and clean cart

                order.save().then(result => {
                    return UserModel.cleanCart(user.username)
                        .then(() => {
                            response.redirect('/orders')
                        })
                        .catch(err => console.log(err));
                })

            }).catch(err => console.log(err));

        })
        .catch(err => console.log(err));
}

exports.getOrders = (request, response, next) => {
    OrderModel.fetchAll(request.user.username).then(result => {

        response.render('shop/order', { orders: result });
    }).catch();
}