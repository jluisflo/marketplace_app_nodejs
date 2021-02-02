const products = [];

module.exports = class ProductModel {

    constructor(name, description, price) {
        this.name = name;
        this.description = description;
        this.price = price;
    }

    save() {
        products.push(this);
    }

    static fetchAll() {
        return products;
    }

}