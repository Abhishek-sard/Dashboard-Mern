const express = require('express');
const router = express.Router();
const {
  addProduct,
  getProducts,
  deleteProduct,
} = require('../controllers/productController');

router.post('/products', addProduct);
router.get('/products', getProducts);
router.delete('/products/:id', deleteProduct);

module.exports = router;