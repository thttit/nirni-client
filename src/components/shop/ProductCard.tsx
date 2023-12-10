import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ProductCard = ({ product }: any) => {
  const image = product.attributes.images.data[0].attributes;

  return (
    <>
      <Card
        className="card_list"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
      >
        <LazyLoadImage
          className="card_media"
          effect="blur"
          src={`${image.url}`}
          alt={image.name}
        />
        <CardContent className="card_content" sx={{ flexGrow: 1 }}>
          <Typography className="card_content title" variant="subtitle2">
            {product.attributes.name}
          </Typography>
          <Typography className="card_content price" variant="subtitle2">
            ${product.attributes.price}.00
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
