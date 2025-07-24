import React from 'react';
import { Box, Typography } from '@mui/material';
import AddProduct from '../Components/Admin/AddProduct';
import ProductList from '../Components/Admin/ProductList';

// const AdminDashboard = () => {
//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
//       <AddProduct />
//       <ProductList />
//     </Box>
//   );
// };

// export default AdminDashboard;

const AdminDashboard = () =>{
    return(
      <Box>
        <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
         <AddProduct/>
    <ProductList/>

      </Box>
   
  );

}



export default AdminDashboard;