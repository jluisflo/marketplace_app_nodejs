const express = require('express');

const app = express();

const router = express.Router();

const adminController = require('../controllers/admin-controller');

//get form
router.get('/add-product', adminController.formAddProduct);

router.get('/edit-product/:idProduct', adminController.formEditProduct);


//action for form
router.post('/add-product', adminController.postAddProduct);

router.post('/edit-product', adminController.postUpdateProduct);

module.exports = router;