const products = [{ id: '1', name: 'Macbook Pro', description: 'Chip M1 diseñado por Apple para un salto gigante en CPU, GPU y rendimiento de aprendizaje automático.', price: 1000, image: 'https://m.media-amazon.com/images/I/71an9eiBxpL._AC_SL1500_.jpg' }, { id: '2', name: 'Macbook Pro', description: 'Chip M1 diseñado por Apple para un salto gigante en CPU, GPU y rendimiento de aprendizaje automático.', price: 1000, image: 'https://m.media-amazon.com/images/I/71an9eiBxpL._AC_SL1500_.jpg' }];

module.exports = class ProductModel {

    constructor(name, description, price, image) {
        this.id = Math.floor(Math.random() * 100000000);
        this.name = name;
        this.description = description;
        this.price = parseInt(price, 10);
        this.image = image;
    }

    save() {
        products.push(this);
    }

    static update(id, name, description, price, image) {

        let index = products.findIndex(p => p.id === id);
        let productEdit = { ...products[index] };

        if (productEdit) {

            productEdit.id = id;
            productEdit.name = name;
            productEdit.description = description;
            productEdit.price = parseInt(price, 10);
            productEdit.image = image;

            products[index] = { ...productEdit };
        }

    }

    static findById(idProduct) {
        return products.find(p => p.id == idProduct);
    }

    static fetchAll() {
        return products;
    }

}