import React from "react";
import {
  Link,
  Box,
  Typography,
  useTheme,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import Fade from "@mui/material/Fade";
import useMediaQuery from "@mui/material/useMediaQuery";
import { UseProducts } from "./UseProducts";

const LeftBar = () => {
  // const { sortProducts } = UseProducts();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const sorts = ["best selling", "price: low to high", "price: high to low"];
  const categories = [
    "all",
    "new in",
    "tops",
    "bottoms",
    "dresses",
    "swimwear",
  ];
  const [anchorElSort, setAnchorElSort] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElCategory, setAnchorElCategory] =
    React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorElSort);
  const openCategory = Boolean(anchorElCategory);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElSort(event.currentTarget);
  };
  const handleClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElCategory(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElSort(null);
    setAnchorElCategory(null);
  };

  return (
    <Box className="left_bar_wrapper">
      {fullScreen ? (
        <>
          <Box className="search_product">
            <Button
              className="filter_title"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Typography fontWeight={"bold"} variant="body1" color="inherit">
                Sort By
              </Typography>
            </Button>
            <Menu
              id="basic-menu"
              className="filter_categories"
              TransitionComponent={Fade}
              sx={{ flexDirection: "column" }}
              anchorEl={anchorElSort}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {sorts.map((item: any) => (
                <MenuItem key={item} onClick={handleClose}>
                  <Link
                    underline="hover"
                    variant="body1"
                    color="inherit"
                    href="/shop"
                  >
                    {item}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box className="search_product">
            <Button
              className="filter_title"
              id="basic-button-2"
              aria-controls={openCategory ? "basic-menu-2" : undefined}
              aria-haspopup="true"
              aria-expanded={openCategory ? "true" : undefined}
              onClick={handleClickCategory}
            >
              <Typography fontWeight={"bold"} variant="body1" color="inherit">
                Categories
              </Typography>
            </Button>
            <Menu
              id="basic-menu-2"
              className="filter_categories"
              sx={{ flexDirection: "column" }}
              TransitionComponent={Fade}
              anchorEl={anchorElCategory}
              open={openCategory}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button-2",
              }}
            >
              {categories.map((item: any) => (
                <MenuItem key={item} onClick={handleClose}>
                  <Link
                    underline="hover"
                    variant="body1"
                    color="inherit"
                    href="/shop"
                  >
                    {item}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </>
      ) : (
        <>
          <Box className="search_product">
            <Box className="filter_title" boxShadow={1}>
              <Typography fontWeight={"bold"} variant="body1" color="inherit">
                Sort By
              </Typography>
            </Box>
            <Box
              className="filter_categories"
              sx={{ flexDirection: "column", gap: "2px" }}
            >
              {sorts.map((variant: any) => (
                <Box key={variant}>
                  <Link
                    underline="hover"
                    variant="body1"
                    color="inherit"
                    href="/shop"
                  >
                    {variant}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
          <Box className="search_product" mt={4}>
            <Box className="filter_title" boxShadow={1}>
              <Typography fontWeight={"bold"} variant="body1" color="inherit">
                Categories
              </Typography>
            </Box>
            <Box
              className="filter_categories"
              sx={{ flexDirection: "column", gap: "2px" }}
            >
              {categories.map((temp: any) => (
                <Box key={temp}>
                  <Link
                    underline="hover"
                    variant="body1"
                    color="inherit"
                    href="/shop"
                  >
                    {temp}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default LeftBar;
