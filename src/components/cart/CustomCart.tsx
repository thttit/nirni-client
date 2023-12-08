import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, TextField, Typography, TableCell, useTheme } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CustomCart = ({
  id,
  name,
  price,
  colour,
  size,
  index,
  quantity,
  image,
  productId,
  quantities,
  removeFromCart,
  updateCartItem,
}: any) => {
  const quantitiesArray = Array.from(Array(Number(quantities || 0)).keys());
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <React.Fragment>
      {fullScreen ? (
        <>
          <TableCell component="th" scope="row" className="image-wrapper">
            <LazyLoadImage
              role="presentation"
              alt={name}
              effect="blur"
              src={`http://localhost:1337${image}`}
              className="image-wrapper media"
            />
            <Box ml={2} maxWidth={"64px"}>
              <Typography variant="body2" fontWeight={600}>
                {name}
              </Typography>
              <Typography sx={{ mt: 1 }} variant="body2">
                Size: {size}
              </Typography>

              <Typography
                sx={{ mt: 1, textDecoration: "underline", cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart({
                    cartItemId: id,
                    productId,
                    price,
                    colour,
                    index,
                    quantity,
                  });
                }}
                variant="body2"
              >
                Remove
              </Typography>
            </Box>
          </TableCell>
          <TableCell align="right">
            <Typography variant="body2">${price}.00</Typography>
            <Typography variant="body2">{colour}</Typography>
            <TextField
              name="quantity"
              hiddenLabel
              value={quantity}
              required
              variant="outlined"
              onChange={({
                target: { value },
              }: React.ChangeEvent<HTMLInputElement>) => {
                if (value) {
                  updateCartItem({
                    index,
                    colour,
                    size,
                    image,
                    productId,
                    cartItemId: id,
                    quantity: Number(value),
                  });
                }
              }}
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
            >
              {quantitiesArray.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </TextField>
          </TableCell>
        </>
      ) : (
        <>
          <TableCell component="th" scope="row" className="image-wrapper">
            <LazyLoadImage
              role="presentation"
              alt={name}
              effect="blur"
              src={`http://localhost:1337${image}`}
              className="image-wrapper media"
            />
            <Box ml={2}>
              <Typography variant="h6" fontWeight={600}>
                {name}
              </Typography>
              <Typography sx={{ mt: 1 }} variant="subtitle1">
                Size: {size}
              </Typography>

              <Typography
                sx={{ mt: 1, textDecoration: "underline", cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart({
                    cartItemId: id,
                    productId,
                    price,
                    colour,
                    index,
                    quantity,
                  });
                }}
                variant="subtitle2"
              >
                Remove
              </Typography>
            </Box>
          </TableCell>
          <TableCell align="right">
            <Typography variant="subtitle1">{colour}</Typography>
          </TableCell>
          <TableCell align="right">
            <TextField
              name="quantity"
              hiddenLabel
              value={quantity}
              required
              variant="outlined"
              onChange={({
                target: { value },
              }: React.ChangeEvent<HTMLInputElement>) => {
                if (value) {
                  updateCartItem({
                    index,
                    colour,
                    size,
                    image,
                    productId,
                    cartItemId: id,
                    quantity: Number(value),
                  });
                }
              }}
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
                    width: "24px",
                    textAlign: "center",
                  },
                },
              }}
            >
              {quantitiesArray.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </TextField>
          </TableCell>
          <TableCell align="right">
            <Typography variant="subtitle1">${price}.00</Typography>
          </TableCell>
        </>
      )}
    </React.Fragment>
  );
};

export default CustomCart;
