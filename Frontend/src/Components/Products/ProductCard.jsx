import React from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button, 
  CardActions 
} from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Product Image */}
      <CardMedia
        component="img"
        height="200"
        image={`http://localhost:5000/uploads/${product.image}`}
        alt={product.name}
        sx={{ objectFit: 'contain', p: 1 }}
      />

      {/* Product Details */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description.length > 50 
            ? `${product.description.substring(0, 50)}...` 
            : product.description}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          ${product.price}
        </Typography>
      </CardContent>

      {/* Action Buttons */}
      <CardActions>
        <Button 
          size="small" 
          color="primary"
          component={Link}
          to={`/product/${product._id}`}
        >
          View Details
        </Button>
        <Button size="small" color="secondary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;