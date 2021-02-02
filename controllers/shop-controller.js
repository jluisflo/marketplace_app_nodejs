const ProductModel = require('../models/product-model');

exports.getHome = (request, response, next) => {
    response.status(200).render('shop/home');
};

exports.getProducts = (request, response, next) => {
    response.status(200).render('shop/products', { products: ProductModel.fetchAll });
};
