const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Required for file operations

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Enhanced Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter for image validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and GIF images are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

exports.addProduct = [
  upload.single('image'), // This must be middleware
  async (req, res) => {
    try {
      // Debug logs (remove in production)
      console.log('Request body:', req.body);
      console.log('Request file:', req.file);

      // Validate file exists
      if (!req.file) {
        return res.status(400).json({ 
          error: 'No image file provided',
          details: 'Please upload a valid image file (JPEG, PNG, GIF)' 
        });
      }

      const { name, price, description, category } = req.body;
      
      // Validate all required fields
      if (!name || !price || !description || !category) {
        // Clean up uploaded file if validation fails
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ 
          error: 'All fields are required',
          required_fields: ['name', 'price', 'description', 'category']
        });
      }

      // Validate price is a number
      if (isNaN(price)) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ 
          error: 'Invalid price format',
          details: 'Price must be a number'
        });
      }

      // Create and save product
      const product = new Product({
        name,
        price: parseFloat(price),
        description,
        category,
        image: req.file.filename
      });

      await product.save();

      // Success response
      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        product: product
      });

    } catch (error) {
      // Clean up file if error occurs
      if (req.file) fs.unlinkSync(req.file.path);
      
      console.error('Product creation error:', error);
      
      res.status(500).json({ 
        success: false,
        error: 'Failed to create product',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
];

// Other controller methods remain the same...
exports.getProducts = async (req, res) => { /* ... */ };
exports.deleteProduct = async (req, res) => { /* ... */ };