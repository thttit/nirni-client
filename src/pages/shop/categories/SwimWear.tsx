import React from "react";
import { Box, Container, Grid } from "@mui/material";
import "../Shop.scss";
//component
import { UseProducts } from "src/components/shop/UseProducts";
import ProductCard from "src/components/shop/ProductCard";
import { IProduct } from "./Tops";

const SwimWear = () => {
  const { products } = UseProducts();

  let swimwear_id = 4;
  const filteredProducts = products.filter(
    (product: IProduct) => product.attributes.category.data?.id === swimwear_id
  );
  return (
    <>
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
        {filteredProducts.map((product: any) => (
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
    </>
  );
};

export default SwimWear;
