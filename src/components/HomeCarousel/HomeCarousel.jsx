import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../..//assets/img1.jpg";
import img2 from "../..//assets/img2.jpg";
import img3 from "../..//assets/img3.jpg";
import img4 from "../..//assets/img4.jpg";
import Carousel from "./Carousel";

const HomeCarousel = () => {
  const settings = {
    infinite: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    arrows: true,
  };

  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
        <Carousel heading="Craving Something Delicious?" img={img1} />
        <Carousel heading="Need a Meal? Request It Now!" img={img2} />
        <Carousel heading="Add Your Favorite Dishes in Seconds" img={img3} />
        <Carousel heading="Need a Meal? Request It Now!" img={img4} />
      </Slider>
    </div>
  );
};
export default HomeCarousel;
