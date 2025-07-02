import React from "react";
import HomeCarousel from "../../components/HomeCarousel/HomeCarousel";
import FeaturedFoods from "../../components/FeaturedFoods/FeaturedFoods";
import { Link } from "react-router";
import LocationCards from "../../components/LocationCards/LocationCards";
import CampaignPoster from "../../components/CampaignPoster/CampaignPoster";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="flex flex-col justify-center gap-8 pb-8">
      <HomeCarousel />
      <h1 className="text-center text-3xl flex w-11/12 justify-center items-center  mx-auto pt-16 pb-8">
        Featured Foods Of Food Bird
      </h1>
      <FeaturedFoods />
      <div className="flex justify-center">
        <Link className="btn btn-secondary" to="/available_foods">
          Show All Available Foods
        </Link>
      </div>
      <div className="text-center text-3xl flex w-11/12 justify-center items-center  mx-auto pt-16 pb-4">
        <h1>Our Stores are in these cities and expanding!</h1>
      </div>
      <div>
        <LocationCards />
      </div>
      <h1 className="text-center text-3xl mt-12 mb-6">
        Holiday Giving Campaign{" "}
      </h1>
      <div>
        <CampaignPoster />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
