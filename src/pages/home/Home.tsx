import { useMemo } from "react";
import "./Home.scss";
import Assets from "../../assets";
import Carousel from "nuka-carousel";
import {
  renderCenterLeftControls,
  renderCenterRightControls,
} from "src/components/carouselCard";
import { Box } from "@mui/material";
const Home = () => {
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
      <Box className="home">
        <Box className="desk">
          <Carousel
            slideIndex={1}
            cellAlign="center"
            autoplay={true}
            wrapAround={true}
            autoplayInterval={4000}
            renderCenterLeftControls={false}
            renderCenterRightControls={false}
            renderBottomCenterControls={null}
            {...carouselParams}
          >
            <img className="home_media" src={Assets.HeaderHome3} alt="Home" />
            <img className="home_media" src={Assets.HeaderHome1} alt="Home" />
            <img className="home_media" src={Assets.HeaderHome4} alt="Home" />
          </Carousel>
        </Box>
      </Box>
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
          <img className="mob-media" src={Assets.HeaderHomeMob} alt="Home" />
          <img className="mob-media" src={Assets.HeaderHomeMob2} alt="Home" />
          <img className="mob-media" src={Assets.HeaderHomeMob3} alt="Home" />
          <img className="mob-media" src={Assets.HeaderHomeMob4} alt="Home" />
        </Carousel>
      </Box>
    </>
  );
};
export default Home;
