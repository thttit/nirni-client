import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Grid } from "@mui/material";
//component
import { UseProducts } from "./UseProducts";
import ProductCard from "./ProductCard";

const Product = ({ category }: any) => {
  const { products } = UseProducts();

  return (
    <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
      {products.map((product: any, index: any) => (
        <Grid item xs={2} sm={4} md={4} key={product.id}>
          <Box
            onClick={() => window.open(`/product/${product.id}`)}
            className="link_product"
          >
            <ProductCard product={product} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Product;
