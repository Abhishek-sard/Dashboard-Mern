const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Image upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

exports.addProduct = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const { name, price, description, category } = req.body;
    
    // Validate required fields
    if (!name || !price || !description || !category) {
      // Clean up uploaded file if validation fails
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'All fields are required' });
    }

    const product = new Product({
      name,
      price,
      description,
      category,
      image: req.file.filename
    });

    await product.save();
    res.status(201).json(product);

  } catch (error) {
    // Clean up file if error occurs
    if (req.file) fs.unlinkSync(req.file.path);
    console.error('Product creation error:', error);
    res.status(500).json({ 
      error: 'Failed to create product',
      details: error.message 
    });
  }
};