const { request } = require('express');
const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop-controller');

router.get('/', shopController.getHome);

router.get('/home', shopController.getHome);

router.get('/products', shopController.getProducts);

router.get('/product/detail/:idProduct', shopController.getProductDetail);

router.get('/cart', shopController.getCart);

router.post('/cart/add-product', shopController.postAddProductToCart);

router.post('/cart/delete-product', shopController.postDeleteProductToCart)

module.exports = router;