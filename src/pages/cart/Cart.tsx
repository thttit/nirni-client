import React from "react";
import "./Cart.scss";
import {
  Typography,
  Box,
  Container,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useNavigate, Link } from "react-router-dom";
import ButtonStyled from "../../components/buttonStyled";
import CustomCart from "../../components/cart/CustomCart";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Cart = ({ cart, removeFromCart, updateCartItem }: any) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const totalPrice = cart.reduce((acc: any, value: any) => {
    const itemPrice = Number(value.price) * Number(value.quantity);
    return acc + itemPrice;
  }, 0);

  return (
    <>
      <Container maxWidth="lg">
        {fullScreen ? (
          <>
            {cart.length ? (
              <Box component={"div"} className="cart">
                <Box
                  sx={{
                    flexGrow: 1,
                    mt: 4,
                    mb: 7,
                    overflow: "hidden",
                    textAlign: "center",
                  }}
                >
                  <Link className="link-shopping" color="inherit" to="/shop">
                    Continue shopping
                  </Link>
                  <TableContainer
                    component={Paper}
                    sx={{ boxShadow: "none !important" }}
                  >
                    <Table sx={{ minWidth: 240 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Typography variant="subtitle2">Product</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="subtitle2">Price</Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cart.map((product: any, index: any) => (
                          <TableRow
                            key={`${index}${product.productId}`}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <CustomCart
                              {...{
                                ...product,
                                index: index,
                                removeFromCart,
                                updateCartItem,
                              }}
                            />
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {cart.length ? (
                    <>
                      <Divider />
                      <Typography
                        sx={{ textAlign: "center", mt: 4 }}
                        variant="subtitle2"
                        fontWeight={600}
                      >
                        Total price: ${totalPrice}.00
                      </Typography>

                      <Box
                        mt={6}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Link to={"/checkout"}>
                          <ButtonStyled
                            sx={{ width: "240px", fontSize: "12px" }}
                            onClick={() => {}}
                          >
                            Check out
                          </ButtonStyled>
                        </Link>
                      </Box>
                    </>
                  ) : null}
                </Box>
              </Box>
            ) : null}
          </>
        ) : (
          <>
            {cart.length ? (
              <Box component={"div"} className="cart">
                <Box sx={{ flexGrow: 1, mt: 4, mb: 7, textAlign: "center" }}>
                  <Link className="link-shopping" color="inherit" to="/shop">
                    Continue shopping
                  </Link>
                  <TableContainer
                    component={Paper}
                    sx={{ boxShadow: "none !important" }}
                  >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Typography variant="subtitle1">Product</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="subtitle1">Color</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="subtitle1">
                              Quantity
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="subtitle1">Price</Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cart.map((product: any, index: any) => (
                          <TableRow
                            key={`${index}${product.productId}`}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <CustomCart
                              {...{
                                ...product,
                                index: index,
                                removeFromCart,
                                updateCartItem,
                              }}
                            />
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {cart.length ? (
                    <>
                      <Divider />
                      <Typography
                        sx={{ textAlign: "right", mt: 4 }}
                        variant="subtitle1"
                        fontWeight={600}
                      >
                        Total price: ${totalPrice}.00
                      </Typography>

                      <Box
                        mt={6}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Link to={"/checkout"}>
                          <ButtonStyled
                            sx={{ width: "520px" }}
                            onClick={() => {}}
                          >
                            Check out
                          </ButtonStyled>
                        </Link>
                      </Box>
                    </>
                  ) : null}
                </Box>
              </Box>
            ) : null}
          </>
        )}
        {!cart.length ? (
          <Box className="empty-cart">
            <Container component="main" sx={{ mt: "120px" }} maxWidth="sm">
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="h6" gutterBottom>
                  Your cart is currently empty
                </Typography>
                <ButtonStyled
                  fullWidth
                  sx={{
                    color: "whitesmoke",
                    fontSize: "12px",
                    padding: 1,
                    mt: 3,
                  }}
                  onClick={() => {
                    navigate("/shop");
                  }}
                >
                  Go Shopping
                </ButtonStyled>
              </Box>
            </Container>
          </Box>
        ) : null}
      </Container>
    </>
  );
};

export default Cart;
