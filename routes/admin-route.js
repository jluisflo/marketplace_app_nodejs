const express = require('express');

const app = express();

const router = express.Router();

const adminController = require('../controllers/admin-controller');

router.get('/add-product', adminController.formAddProduct);

router.post('/add-product', adminController.addProduct);

router.patch('/update-product', adminController.updateProduct);

router.delete('/delete-product', adminController.deleteProduct);

module.exports = router;