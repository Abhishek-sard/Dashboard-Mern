import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Box, 
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import axios from 'axios';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: null,
  });

  const [error, setError] = useState('');

  const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.image) {
      setError('Please select an image');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('image', formData.image);

    try {
      const response = await axios.post('http://localhost:5000/api/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert(`Product "${response.data.name}" added successfully!`);
      // Reset form after successful submission
      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        image: null,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding product');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>Add New Product</Typography>
      
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <TextField
        label="Product Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Price"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        inputProps={{ step: "0.01" }}
      />

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        multiline
        rows={4}
      />

      <FormControl fullWidth margin="normal" required>
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={formData.category}
          label="Category"
          onChange={handleChange}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ mt: 2, mb: 2 }}>
        <Button variant="contained" component="label">
          Upload Image
          <input 
            type="file" 
            hidden 
            onChange={handleImageChange} 
            accept="image/*"
            required
          />
        </Button>
        {formData.image && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Selected: {formData.image.name}
          </Typography>
        )}
      </Box>

      <Button 
        type="submit" 
        variant="contained" 
        color="white"
        fullWidth
        sx={{ mt: 3 }}
      >
        Add Product
      </Button>
    </Box>
  );
};

export default AddProduct;