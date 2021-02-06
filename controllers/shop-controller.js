const ProductModel = require('../models/product.model');
const CartModel = require('../models/cart.model');

exports.getHome = (request, response, next) => {

    response.render('shop/home');
};

exports.getProducts = (request, response, next) => {

    response.render('shop/products', { products: ProductModel.fetchAll });
};

exports.getProductDetail = (request, response, next) => {

    const product = ProductModel.findById(request.params.idProduct);

    if (product) response.render('shop/detail', { product: product });
    else response.redirect('/');
};

exports.getCart = (request, response, next) => {

    CartModel.getDetail(car => {

        let products = []

        if (car) {
            car.products.forEach(p => {
                let product = ProductModel.findById(p.id);
                product.quantity = p.quantity;
                products.push(product);
            });
        }
        response.render('shop/cart', { products: products });
    })


};

exports.postAddProductToCart = (request, response, next) => {

    CartModel.addProduct(request.body.idProduct, request.body.quantity);
    response.redirect('/cart');
}

exports.postDeleteProductToCart = (request, response, next) => {

    CartModel.deleteProduct(request.body.idProduct)
    response.redirect('/cart');
}