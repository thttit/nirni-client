import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  Grid,
  Card,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { countries } from "./CountrySelect";
import { CountryType } from "./CountrySelect";
import { FieldInputProps } from "formik";
import { userData } from "../navbar/auth/User";

export interface ChildComponentProps {
  getFieldProps: (
    nameOrOptions: string | FieldInputProps<any>
  ) => FieldInputProps<any>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  cart: any;
  errors: any;
  touched: any;
}

const PersonalDetail = ({
  getFieldProps,
  setFieldValue,
  cart,
  errors,
  touched,
}: ChildComponentProps) => {
  const hasError = (fieldName: any) => {
    if (errors[fieldName] && touched[fieldName]) {
      return true;
    }
    return false;
  };
  const { email } = userData();

  return (
    <>
      <Box className="delivery-detail">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" fontWeight={600} pt={1} pb={1}>
            Account
          </Typography>
        </Box>
        <Typography variant="subtitle1">{email}</Typography>
        <Divider />
        <FormControlLabel
          required
          control={<Checkbox color="default" />}
          label={
            <Typography variant="subtitle2">
              Email me with news and offers
            </Typography>
          }
        />
      </Box>

      <Box className="delivery-detail">
        <Typography variant="h4" fontWeight={600}>
          Delivery
        </Typography>
        <Grid container spacing={2} pt={2}>
          <Grid item xs={12}>
            <Autocomplete
              id="countries"
              fullWidth
              options={countries}
              autoHighlight
              getOptionLabel={(option: CountryType) => option.label}
              onChange={(e, value) =>
                setFieldValue("country", value?.label || "")
              }
              renderOption={(props, option: CountryType) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 }, fontSize: "14px" }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="20"
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    alt=""
                  />
                  {option.label} ({option.code}) +{option.phone}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Country/Region"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              fullWidth
              required
              error={hasError("firstname")}
              helperText={errors.firstname || ""}
              {...getFieldProps("firstname")}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              required
              error={hasError("lastname")}
              helperText={errors.lastname || ""}
              fullWidth
              {...getFieldProps("lastname")}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              required
              error={hasError("address")}
              helperText={errors.address || ""}
              fullWidth
              {...getFieldProps("address")}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              required
              error={hasError("city")}
              helperText={errors.city || ""}
              fullWidth
              {...getFieldProps("city")}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Postal code"
              error={hasError("postal_code")}
              helperText={errors.postal_code || ""}
              fullWidth
              {...getFieldProps("postal_code")}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              required
              error={hasError("phone")}
              helperText={errors.phone || ""}
              fullWidth
              {...getFieldProps("phone")}
            ></TextField>
          </Grid>
        </Grid>
      </Box>

      <Box className="delivery-detail">
        <Typography variant="h6" pb={1}>
          Shipping method
        </Typography>
        <Box>
          <Card variant="outlined" className="delivery-detail shipping">
            <Typography variant="subtitle1">Shipping</Typography>
            <Typography variant="subtitle1">$10.00</Typography>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default PersonalDetail;
