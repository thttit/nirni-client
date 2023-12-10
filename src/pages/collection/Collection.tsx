import { useMemo } from "react";
import "./Collection.scss";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Assets from "src/assets";
//carousel
import Carousel from "nuka-carousel";
import {
  renderCenterLeftControls,
  renderCenterRightControls,
} from "../../components/carouselCard";

const Collection = () => {
  const carouselParams = useMemo(() => {
    if (typeof window === "undefined") return {};
    const searchParams = new URLSearchParams(window.location.search);
    let paramsString = searchParams.get("params");
    if (paramsString)
      paramsString = paramsString.substr(1, paramsString.length - 2);
    else return {};
    return JSON.parse(paramsString);
  }, []);
  return (
    <>
      <Box className="collection">
        <Container maxWidth="xl">
          <Box className="desk">
            {/* <Carousel
              slideIndex={1}
              cellAlign="center"
              autoplay={true}
              wrapAround={true}
              autoplayInterval={4000}
              renderCenterLeftControls={renderCenterLeftControls}
              renderCenterRightControls={renderCenterRightControls}
              renderBottomCenterControls={null}
              {...carouselParams}
            > */}
            <Link to={"/shop"}>
              <img
                className="collection_media"
                src={Assets.HeaderHome1}
                alt="Collection"
              />
              <img
                className="collection_media"
                src={Assets.HeaderHome4}
                alt="Collection"
              />
              <img
                className="collection_media"
                src={Assets.HeaderHome3}
                alt="Collection"
              />
            </Link>
            {/* </Carousel> */}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Collection;
