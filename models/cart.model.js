const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class ProductModel {

    static addProduct(idProduct, quantity) {

        fs.readFile(p, (err, fileContent) => {

            let cart = { products: [] }

            if (!err) cart = JSON.parse(fileContent);

            //analize if existing product
            const indexExistingProduct = cart.products.findIndex(p => p.id === idProduct);
            const existingProduct = cart.products[indexExistingProduct];
            let updatedProduct;

            if (existingProduct) {

                updatedProduct = { ...existingProduct };
                updatedProduct.quantity = updatedProduct.quantity + parseInt(quantity, 10);
                cart.products[indexExistingProduct] = updatedProduct;

            } else {

                updatedProduct = { id: idProduct, quantity: parseInt(quantity, 10) };
                cart.products = [...cart.products, updatedProduct];

            }

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });

    }

    static deleteProduct(idProduct) {

        fs.readFile(p, (err, fileContent) => {

            let cart = { products: [] }

            if (!err) { cart = JSON.parse(fileContent); }


            //analize if existing product
            const indexExistingProduct = cart.products.findIndex(p => p.id === idProduct);
            const existingProduct = cart.products[indexExistingProduct];

            if (existingProduct) {

                let deleteArray = [...cart.products];
                deleteArray.splice(indexExistingProduct, 1);

                cart.products = [...deleteArray];
            }

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

    static getDetail(cb) {
        fs.readFile(p, (err, fileContent) => {

            const cart = JSON.parse(fileContent);

            if (err) cb(null)
            else cb(cart);
        });
    }

}