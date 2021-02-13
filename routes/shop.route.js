const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop-controller');

router.get('/', shopController.getHome);

router.get('/home', shopController.getHome);

router.get('/products', shopController.getProducts);

router.get('/product/detail/:idProduct', shopController.findProduct);

router.get('/cart', shopController.getCart);

router.post('/cart/add-product', shopController.postAddProductToCart);

router.post('/cart/delete-product', shopController.postDeleteProductToCart)

router.post('/cart/add-order', shopController.postAddOrder)

router.get('/orders', shopController.getOrders)

module.exports = router;