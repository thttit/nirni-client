import React, { useState } from "react";
import "./Shop.scss";
import { Grid, useTheme, Container, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
//component
import LeftBar from "../../components/shop/LeftBar";
import Product from "../../components/shop/Product";
import Tops from "./categories/Tops";
import Bottoms from "./categories/Bottoms";
import Dresses from "./categories/Dresses";
import SwimWear from "./categories/SwimWear";

const Shop = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <>
      <div id="shop" className="row">
        <Container component="main" maxWidth="xl">
          {fullScreen ? (
            <Box className="shop_mob">
              <LeftBar />
              <Product />
            </Box>
          ) : (
            <Grid container spacing={0}>
              <Grid item xs={2} className="left_bar">
                <LeftBar onSelectCategory={handleSelectCategory} />
              </Grid>
              <Grid item xs={10} className="right_bar">
                <Product category={selectedCategory} />
              </Grid>
            </Grid>
          )}
        </Container>
      </div>
    </>
  );
};

export default Shop;
