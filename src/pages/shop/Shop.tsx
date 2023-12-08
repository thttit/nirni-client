import React from "react";
import "./Shop.scss";
import { Grid, useTheme, Container, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
//component
import LeftBar from "../../components/shop/LeftBar";
import Product from "../../components/shop/Product";

const Shop = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
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
                <LeftBar />
              </Grid>
              <Grid item xs={10} className="right_bar">
                <Product />
              </Grid>
            </Grid>
          )}
        </Container>
      </div>
    </>
  );
};

export default Shop;
