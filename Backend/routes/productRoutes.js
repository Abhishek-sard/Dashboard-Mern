const express = require('express');
const router = express.Router();
const { addProduct } = require('../controllers/productController');
const upload = require('../middleware/multer');

router.post('/', upload.single('image'), addProduct);

module.exports = router;