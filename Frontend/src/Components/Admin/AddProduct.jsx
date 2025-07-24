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
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';
import { data } from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: null,
  });

  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const Categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Other'];

  const handleCloseSnackbar = () => {
    setSnackbar({...snackbar, open: false});
  };

  // ... rest of your existing code ...

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.image) {
      setSnackbar({
        open: true,
        message: 'Please select an image',
        severity: 'error'
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/products',data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSnackbar({
        open: true,
        message: `Product "${response.data.name}" added successfully!`,
        severity: 'success'
      });

      // Reset form
      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        image: null,
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error adding product';
      setSnackbar({
        open: true,
        message: errorMsg,
        severity: 'error'
      });
      setError(errorMsg);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      {/* Your existing form JSX */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddProduct;