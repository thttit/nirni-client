import React from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "./Checkout.scss";
import axios from "axios";
import { useFormik } from "formik";
import { Grid, Box, Container, useTheme } from "@mui/material";
import PersonalDetail from "../../components/checkout/PersonalDetail";
import CardDetail from "../../components/checkout/CardDetail";
import ButtonStyled from "../../components/buttonStyled";
import Paypal from "src/components/checkout/Paypal";
import useMediaQuery from "@mui/material/useMediaQuery";
export interface MyFormValues {
  firstname: string;
  lastname: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  postal_code: string;
  total: string;
  code: string;
  status: string;
  orders: string[];
}

export const calcPrice = ({ cart }: any) => {
  let shippingPrice = 0;
  const subPrice = cart.reduce(
    (acc: number, item: any) =>
      acc + (item.price * item.quantity + shippingPrice),
    0
  );
  const totalPrice = Number(subPrice + shippingPrice);
  return { subPrice, totalPrice };
};
const Checkout = ({ addToOrder, cart, removeFromCart }: any) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const initialValues: MyFormValues = {
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    postal_code: "",
    total: "",
    code: "",
    status: "",
    orders: [],
  };

  const { totalPrice, subPrice } = calcPrice({ cart });

  const formik = useFormik<MyFormValues>({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      firstname: Yup.string().required("First Name is required"),
      lastname: Yup.string().required("Last Name is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      phone: Yup.string().required("Phone number is required"),
    }),

    onSubmit: async (values) => {
      try {
        await addToOrder({
          attributes: {
            ...values,
            orders: cart,
            status: "payed",
            total: `${totalPrice}`,
          },
        });
        toast.success("Create order success!", {
          position: toast.POSITION.TOP_LEFT,
          hideProgressBar: true,
        });
      } catch (error) {
        toast.error("Create order failed!", {
          position: toast.POSITION.TOP_LEFT,
          hideProgressBar: true,
        });
      }
    },
  });
  const { getFieldProps, handleSubmit, setFieldValue, errors, touched } =
    formik;

  const touchedFields = ["firstname", "lastname", "address", "city", "phone"];

  const shouldRenderPaypal = touchedFields.every(
    (field) => touched[field as keyof MyFormValues]
  );

  return (
    <Box
      className="row"
      mt={2}
      sx={{
        flexGrow: "0 1",
        borderTop: "1px solid #dedede",
      }}
    >
      {fullScreen ? (
        <>
          <CardDetail cart={cart} subPrice={subPrice} totalPrice={totalPrice} />
          <Box sx={{ pl: 3, pr: 3 }}>
            <PersonalDetail
              cart={cart}
              getFieldProps={getFieldProps}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
            />
            {shouldRenderPaypal && (
              <Paypal
                total={totalPrice}
                submit={handleSubmit}
                cart={cart}
                removeFromCart={removeFromCart}
              />
            )}
          </Box>
        </>
      ) : (
        <Grid container spacing={0} height={"100%"}>
          <Grid item xs={7} sx={{ borderRight: "1px solid #dedede" }}>
            <Box sx={{ pl: 24, pr: 4 }}>
              <PersonalDetail
                cart={cart}
                getFieldProps={getFieldProps}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
              />
              {shouldRenderPaypal && (
                <Paypal
                  total={totalPrice}
                  submit={handleSubmit}
                  cart={cart}
                  removeFromCart={removeFromCart}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={5} sx={{ background: "#F5F7F8" }}>
            <CardDetail
              cart={cart}
              subPrice={subPrice}
              totalPrice={totalPrice}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Checkout;
