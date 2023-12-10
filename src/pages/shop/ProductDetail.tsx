import "./ProductDetail.scss";
import React, { useState, useMemo } from "react";
import { UseProductDetail } from "../../components/shop/UseProductDetail";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
//carousel
import Carousel from "nuka-carousel";
import {
  renderCenterLeftControls,
  renderCenterRightControls,
} from "../../components/carouselCard";
import ButtonStyled from "../../components/buttonStyled";
import useMediaQuery from "@mui/material/useMediaQuery";
const ProductDetail = ({ addToCart }: any) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const carouselParams = useMemo(() => {
    if (typeof window === "undefined") return {};
    const searchParams = new URLSearchParams(window.location.search);
    let paramsString = searchParams.get("params");
    if (paramsString)
      paramsString = paramsString.substr(1, paramsString.length - 2);
    else return {};
    return JSON.parse(paramsString);
  }, []);
  const {
    product,
    getImage,
    selectedSize,
    selectedQuantity,
    setSelectedSize,
    handleQuantityChange,
  } = UseProductDetail();

  if (!product || !product.attributes) {
    return null;
  }

  const { attributes } = product;
  const image = attributes.images.data;

  const descrip = String(attributes.description);
  const splited = descrip.split("/");

  const quantity = Array.from(Array(Number(attributes.quantity)).keys());

  return (
    <>
      <div className="row">
        <section id="product-template" className="product_section">
          <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1, mt: 3, mb: 9 }}>
              {fullScreen ? (
                <Box className="mob">
                  <Carousel
                    slideIndex={1}
                    cellAlign="center"
                    autoplay={true}
                    wrapAround={true}
                    autoplayInterval={4000}
                    renderCenterLeftControls={renderCenterLeftControls}
                    renderCenterRightControls={renderCenterRightControls}
                    renderBottomCenterControls={null}
                    {...carouselParams}
                  >
                    {image.length &&
                      image.map((event: any) => (
                        <Box className="mob_wrapper" key={event.id}>
                          <LazyLoadImage
                            role="presentation"
                            alt=""
                            effect="blur"
                            src={`${event.attributes.url}`}
                            className="mob_media"
                          />
                        </Box>
                      ))}
                  </Carousel>
                  <Box className="content_wrapper">
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      fontWeight={600}
                      className="product_name"
                    >
                      {attributes.name}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      className="product_price"
                    >
                      ${attributes.price}.00
                    </Typography>
                    <Typography
                      gutterBottom
                      fontWeight={600}
                      variant="subtitle1"
                      pt={2}
                    >
                      Color: {attributes.colour}
                    </Typography>
                    <TextField
                      name="quantity"
                      hiddenLabel
                      className="quantity_input"
                      value={selectedQuantity}
                      variant="outlined"
                      required
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleQuantityChange(event)
                      }
                      InputProps={{
                        sx: {
                          borderRadius: "2px",
                          height: "32px",
                          "&:hover": {
                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              border: "1px solid black",
                            },
                          },
                        },
                        inputProps: {
                          sx: {
                            width: "16px",
                            textAlign: "center",
                          },
                        },
                      }}
                      sx={{ display: "none" }}
                    >
                      {quantity.map((number) => (
                        <option key={number}>{number}</option>
                      ))}
                    </TextField>

                    <form className="form">
                      <Box className="size_wrapper">
                        <Box className="sizes">
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                            fontWeight={600}
                            className="product_size"
                          >
                            Size:
                          </Typography>

                          {Object(attributes.sizes).map((size: any) => (
                            <Button className="icon_size" key={size.name}>
                              <Typography
                                component={"span"}
                                variant="subtitle1"
                                onClick={() => setSelectedSize(size.name)}
                                className={`${
                                  selectedSize === size.name ? "active" : ""
                                }`}
                              >
                                {size.name}
                              </Typography>
                            </Button>
                          ))}
                        </Box>
                        <Link variant="subtitle2" color="inherit" href="/shop">
                          SIZE GUIDE
                        </Link>
                      </Box>

                      <ButtonStyled
                        onClick={() =>
                          addToCart({
                            ...product,
                            size: selectedSize,
                            image: getImage(),
                            quantity: selectedQuantity,
                          })
                        }
                        className="btn_add"
                        fullWidth
                      >
                        Add to cart
                      </ButtonStyled>
                    </form>

                    <Box className="description">
                      {splited.map((line, index) => (
                        <Typography
                          key={line}
                          variant="subtitle2"
                          className="product_description"
                          lineHeight={2}
                        >
                          {line}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Grid container spacing={0} className="grid product-single">
                  <Grid xs={6} className="media product-single_media-group">
                    <Box className="desk">
                      {image.length &&
                        image.map((event: any) => (
                          <Box className="desk_wrapper" key={event.id}>
                            <LazyLoadImage
                              role="presentation"
                              alt=""
                              effect="blur"
                              src={`${event.attributes.url}`}
                              className="desk_media"
                            />
                          </Box>
                        ))}
                    </Box>
                  </Grid>

                  <Grid xs={6} className="content product-single_media-group">
                    <Box className="content_wrapper">
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        fontWeight={600}
                        className="product_name"
                      >
                        {attributes.name}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        className="product_price"
                      >
                        ${attributes.price}.00
                      </Typography>
                      <Typography
                        gutterBottom
                        fontWeight={600}
                        variant="subtitle1"
                      >
                        Color: {attributes.colour}
                      </Typography>
                      <TextField
                        name="quantity"
                        hiddenLabel
                        className="quantity_input"
                        value={selectedQuantity}
                        variant="outlined"
                        required
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleQuantityChange(event)}
                        InputProps={{
                          sx: {
                            borderRadius: "2px",
                            height: "32px",
                            "&:hover": {
                              ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                border: "1px solid black",
                              },
                            },
                          },
                          inputProps: {
                            sx: {
                              width: "16px",
                              textAlign: "center",
                            },
                          },
                        }}
                        sx={{ display: "none" }}
                      >
                        {quantity.map((number) => (
                          <option key={number}>{number}</option>
                        ))}
                      </TextField>

                      <form className="form">
                        <Box className="size_wrapper">
                          <Box className="sizes">
                            <Typography
                              gutterBottom
                              variant="subtitle1"
                              fontWeight={600}
                              className="product_size"
                            >
                              Size:
                            </Typography>

                            {Object(attributes.sizes).map((size: any) => (
                              <Button className="icon_size" key={size.name}>
                                <Typography
                                  component={"span"}
                                  variant="subtitle1"
                                  onClick={() => setSelectedSize(size.name)}
                                  className={`${
                                    selectedSize === size.name ? "active" : ""
                                  }`}
                                >
                                  {size.name}
                                </Typography>
                              </Button>
                            ))}
                          </Box>
                          <Link
                            variant="subtitle2"
                            color="inherit"
                            href="/shop"
                          >
                            SIZE GUIDE
                          </Link>
                        </Box>

                        <ButtonStyled
                          onClick={() =>
                            addToCart({
                              ...product,
                              size: selectedSize,
                              image: getImage(),
                              quantity: selectedQuantity,
                            })
                          }
                          className="btn_add"
                          fullWidth
                        >
                          Add to cart
                        </ButtonStyled>
                      </form>

                      <Box className="description">
                        {splited.map((line, index) => (
                          <Typography
                            key={line}
                            variant="subtitle2"
                            className="product_description"
                            lineHeight={2}
                          >
                            {line}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Container>
        </section>
      </div>
    </>
  );
};

export default ProductDetail;
