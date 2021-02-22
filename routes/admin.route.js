const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin.controller');

//get form
router.get('/add-product', adminController.formAddProduct);

router.get('/edit-product/:idProduct', adminController.formEditProduct);

router.get('/delete-product/:idProduct', adminController.formDeleteProduct);

//get list
router.get('/products', adminController.listProducts);


//action for form
router.post('/add-product', adminController.postAddProduct);

router.post('/edit-product', adminController.postUpdateProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;