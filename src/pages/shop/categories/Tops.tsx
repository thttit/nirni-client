import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Grid } from "@mui/material";
//component
import { UseProducts } from "src/components/shop/UseProducts";
import { Category } from "@mui/icons-material";
import ProductCard from "src/components/shop/ProductCard";

// import UseProductDetail from "./UseProductDetail";
type Category = {
  id: number;
};
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

const Tops = () => {
  const { categories, products } = UseProducts();
  const filter = categories.map((category: Category) => {
    let check_id = (category.id = 3);
    const hasProducts = products.filter(
      (product: IProduct) => product.attributes.category.data.id === check_id
    );
    return hasProducts;
  });

  return (
    <>
      {filter ? (
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
      ) : null}
    </>
  );
};

export default Tops;
