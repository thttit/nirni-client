import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Grid } from "@mui/material";
//component
import { UseProducts } from "./UseProducts";
import ProductCard from "./ProductCard";
import UseProductDetail from "./UseProductDetail";

type IProduct = {
  id: number;
  attributes: {
    category: {
      data: {
        id: number;
        name: string;
        description: string;
        price: number;
        quantity: number;
        size: string;
        color: string;
      };
    };
  };
};

const Product = () => {
  const { products } = UseProducts();
  const { sortedProducts, handleSort } = UseProductDetail();

  return (
    <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
      {sortedProducts.map((product: any) => (
        <Grid item xs={2} sm={4} md={4} key={product.id}>
          <Box
            onClick={() => window.open(`/product/${product.id}`)}
            className="link_product"
          >
            <ProductCard product={product} />
          </Box>
        </Grid>
      ))}
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
