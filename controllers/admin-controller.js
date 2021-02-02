const ProductModel = require('../models/product-model');

exports.formAddProduct = (request, response, next) => {
  response.status(200).render('admin/add-product');
};

exports.addProduct = (request, response, next) => {

  let product = new ProductModel(request.body.name, request.body.description, request.body.price);
  product.save();

  response.redirect('/products');
};

exports.updateProduct = (request, response, next) => {
  //logic
};

exports.deleteProduct = (request, response, next) => {
  //logic
};
