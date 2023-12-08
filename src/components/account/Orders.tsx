import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import "./Account.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const getDateTime = (string: string) => {
  const fullDate = new Date(string);
  const date = fullDate.toLocaleDateString();
  const time = fullDate.toLocaleTimeString();
  return `${date} - ${time}`;
};
const Orders = ({ token, orders }: any) => {
  console.log(orders);

  return (
    <Box className="orders">
      <Container component="main" sx={{ mt: 4, mb: 2 }} maxWidth="lg">
        {orders.length ? (
          <Grid
            sx={{ flexGrow: 1, pl: 1, pr: 1 }}
            container
            spacing={2}
            className="orders-wrapper"
          >
            {orders.map((order: any) => (
              <Box key={order.id}>
                <Typography variant="subtitle1" pb={1}>
                  Order date: {getDateTime(order.attributes.createdAt)}
                </Typography>
                <Divider />
                <Grid
                  container
                  spacing={2}
                  pt={2}
                  pb={2}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {order.attributes.orders.map((product: any) => (
                    <Grid item xs={2} sm={4} md={4} key={product.id}>
                      <Card
                        className="card_list"
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <LazyLoadImage
                          className="card_media"
                          effect="blur"
                          src={`http://localhost:1337${product.image}`}
                          alt={product.name}
                        />
                        <CardContent
                          className="card_content"
                          sx={{ flexGrow: 1 }}
                        >
                          <Typography variant="subtitle2">
                            Name: {product.name}
                          </Typography>
                          <Typography variant="subtitle2">
                            Price: ${product.price}.00
                          </Typography>
                          <Typography variant="subtitle2">
                            Quantity: {product.quantity}
                          </Typography>
                          <Typography variant="subtitle2">
                            Size: {product.size}
                          </Typography>
                          <Typography variant="subtitle2">
                            Color: {product.colour}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
          </Grid>
        ) : null}
      </Container>
    </Box>
  );
};
export default Orders;
