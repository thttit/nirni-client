import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const CardDetail = ({ subPrice, totalPrice, cart }: any) => {
  const shippingPrice = 0;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {fullScreen ? (
        <>
          <Box className="card-wrapper">
            {cart.map((product: any, index: any) => (
              <Card
                sx={{ width: 280 }}
                className="card-product-checkout"
                key={`${index}${product.productId}`}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box className="media">
                    <LazyLoadImage
                      className="image"
                      src={`http://localhost:1337${product.image}`}
                      alt={product.name}
                    />
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="body2">
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        component="div"
                      >
                        Size: {product.size} / {product.colour}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        component="div"
                      >
                        Qty: {product.quantity}
                      </Typography>
                    </CardContent>
                  </Box>
                </Box>
                <Typography variant="subtitle2" component="div">
                  ${product.price * product.quantity}.00
                </Typography>
              </Card>
            ))}
            {cart.length ? (
              <Box sx={{ width: 280, pt: 1 }}>
                <Box className="price-shopping sub-price">
                  <Typography sx={{ textAlign: "right" }} variant="subtitle1">
                    Subtotal
                  </Typography>
                  <Typography
                    sx={{ textAlign: "right" }}
                    variant="subtitle1"
                    fontWeight={600}
                  >
                    ${subPrice}.00
                  </Typography>
                </Box>
                <Box className="price-shopping shipping-price">
                  <Typography sx={{ textAlign: "right" }} variant="subtitle1">
                    Shipping
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={600}>
                    ${shippingPrice}.00
                  </Typography>
                </Box>
                <Box className="price-shopping total-price">
                  <Typography
                    sx={{ textAlign: "right" }}
                    fontWeight={600}
                    variant="subtitle1"
                  >
                    Total
                  </Typography>
                  <Typography
                    component={"strong"}
                    variant="subtitle1"
                    fontWeight={600}
                  >
                    ${totalPrice}.00
                  </Typography>
                </Box>
              </Box>
            ) : null}
          </Box>
        </>
      ) : (
        <Box className="card-wrapper">
          {cart.map((product: any, index: any) => (
            <Card
              sx={{ width: 450 }}
              className="card-product-checkout"
              key={`${index}${product.productId}`}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box className="media">
                  <LazyLoadImage
                    className="image"
                    src={`http://localhost:1337${product.image}`}
                    alt={product.name}
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h6">
                      {product.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Size: {product.size} / {product.colour}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Qty: {product.quantity}
                    </Typography>
                  </CardContent>
                </Box>
              </Box>
              <Typography variant="h6" component="div">
                ${product.price * product.quantity}.00
              </Typography>
            </Card>
          ))}
          {cart.length ? (
            <Box sx={{ width: 450, pt: 1 }}>
              <Box className="price-shopping sub-price">
                <Typography sx={{ textAlign: "right" }} variant="h6">
                  Subtotal
                </Typography>
                <Typography
                  sx={{ textAlign: "right" }}
                  variant="h6"
                  fontWeight={600}
                >
                  ${subPrice}.00
                </Typography>
              </Box>
              <Box className="price-shopping shipping-price">
                <Typography sx={{ textAlign: "right" }} variant="h6">
                  Shipping
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  ${shippingPrice}.00
                </Typography>
              </Box>
              <Box className="price-shopping total-price">
                <Typography
                  sx={{ textAlign: "right" }}
                  fontWeight={600}
                  variant="h6"
                >
                  Total
                </Typography>
                <Typography component={"strong"} variant="h6" fontWeight={600}>
                  ${totalPrice}.00
                </Typography>
              </Box>
            </Box>
          ) : null}
        </Box>
      )}
    </>
  );
};
export default CardDetail;
