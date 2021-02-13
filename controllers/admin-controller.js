const ProductModel = require('../models/product.model');

exports.formAddProduct = (request, response, next) => {

	response.render('admin/form/form-product', { add: true });
};

exports.formEditProduct = (request, response, next) => {

	ProductModel.find(request.params.idProduct)
		.then((product) => {
			response.render('admin/form/form-product', { product: product, edit: true });
		})
		.catch(err => {
			console.log(err)
		});
};

exports.formDeleteProduct = (request, response, next) => {

	ProductModel.find(request.params.idProduct)
		.then((product) => {
			response.render('admin/form/form-product', { product: product, delete: true });
		})
		.catch(err => {
			console.log(err)
		});
};

exports.listProducts = (request, response, next) => {
	ProductModel.fetchAll()
		.then(products => {
			response.render('admin/list/products', { products: products });
		})
		.catch(err => console.log(err));
}

exports.postAddProduct = (request, response, next) => {

	const name = request.body.name;
	const description = request.body.description;
	const price = parseFloat(request.body.price);
	const image = request.body.image;

	let product = new ProductModel(name, description, price, image)
	product.save();

	response.redirect('/admin/products');
};

exports.postUpdateProduct = (request, response, next) => {

	const id = request.body.id
	const name = request.body.name;
	const description = request.body.description;
	const price = parseFloat(request.body.price);
	const image = request.body.image;

	let product = new ProductModel(name, description, price, image, id)
	product.save();

	response.redirect('/admin/products');
};

exports.postDeleteProduct = (request, response, next) => {

	const id = request.body.id;

	ProductModel.delete(id)
		.then(result => {

			response.redirect('/admin/products');
		})
		.catch(err => {
			console.log(err);
		})

};