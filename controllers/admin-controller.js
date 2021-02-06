const ProductModel = require('../models/product.model');

exports.formAddProduct = (request, response, next) => {

  response.render('admin/form-product');
};

exports.formEditProduct = (request, response, next) => {

  response.render('admin/form-product', { product: ProductModel.findById(request.params.idProduct), edit: true });
};

exports.postAddProduct = (request, response, next) => {

  let product = new ProductModel(request.body.name, request.body.description, request.body.price, request.body.image);
  product.save();

  response.redirect('/products');
};

exports.postUpdateProduct = (request, response, next) => {

  ProductModel.update(request.body.id, request.body.name, request.body.description, request.body.price, request.body.image);
  response.redirect('/cart');

};