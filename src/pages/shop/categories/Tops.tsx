import React from "react";
import { Box, Container, Grid } from "@mui/material";
import "../Shop.scss";
//component
import { UseProducts } from "src/components/shop/UseProducts";
import ProductCard from "src/components/shop/ProductCard";

export type IProduct = {
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

const Tops = () => {
  const { products } = UseProducts();

  let tops_id = 3;
  const filteredProducts = products.filter(
    (product: IProduct) => product.attributes.category.data?.id === tops_id
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
              {/* Assuming ProductCard is a component that takes product as a prop */}
              <ProductCard product={product} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Tops;
