const ProductModel = require('../models/product.model');

exports.formAddProduct = (request, response, next) => {

	response.render('admin/form/form-product', { add: true });
};

exports.formEditProduct = (request, response, next) => {

	ProductModel.findById(request.params.idProduct)
		.then((product) => {
			response.render('admin/form/form-product', { product: JSON.parse(JSON.stringify(product)), edit: true });
		})
		.catch(err => {
			console.log(err)
		});
};

exports.formDeleteProduct = (request, response, next) => {

	ProductModel.findById(request.params.idProduct)
		.then((product) => {
			response.render('admin/form/form-product', { product: JSON.parse(JSON.stringify(product)), delete: true });
		})
		.catch(err => {
			console.log(err)
		});
};

exports.listProducts = (request, response, next) => {
	ProductModel.find()
		.then(products => {
			response.render('admin/list/products', { products: JSON.parse(JSON.stringify(products)) });
		})
		.catch(err => console.log(err));
}

exports.postAddProduct = (request, response, next) => {

	const name = request.body.name;
	const description = request.body.description;
	const price = parseFloat(request.body.price);
	const image = request.body.image;


	const product = new ProductModel({
		name: name,
		description: description,
		price: price,
		image: image
	});

	product.save()
		.then(res => {
			console.log('product created')
		})
		.catch(err => console.log(err))


	response.redirect('/admin/products');
};

exports.postUpdateProduct = (request, response, next) => {

	const id = request.body.id
	const name = request.body.name;
	const description = request.body.description;
	const price = parseFloat(request.body.price);
	const image = request.body.image;

	ProductModel.findById(id)
		.then(product => {
			product.name = name;
			product.description = description;
			product.price = price;
			product.image = image;
			return product.save();
		})
		.then(result => {
			console.log('updated product');
			response.redirect('/admin/products');
		})
		.catch(err => console.log(err));
};

exports.postDeleteProduct = (request, response, next) => {

	const id = request.body.id;

	ProductModel.deleteOne({ _id: id })
		.then(result => {
			response.redirect('/admin/products');
		})
		.catch(err => {
			console.log(err);
		})

};