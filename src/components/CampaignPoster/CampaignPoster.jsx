import React from "react";
import { ImQrcode } from "react-icons/im";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { IoLogoApple } from "react-icons/io5";
import { SiAppgallery } from "react-icons/si";
import { motion } from "motion/react";
const CampaignPoster = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="text-white w-11/12  flex flex-col gap-6 p-16 mx-auto  bg-rose-800 relative"
    >
      <div>
        <h1 className="text-xl lg:text-left text-center">
          Join our campaign and help the humanity
        </h1>
      </div>
      <div className="flex lg:flex-row  flex-col justify-center items-center lg:w-4/12 w-full gap-8">
        <div>
          <ImQrcode className="p-2  text-8xl rounded-lg border" />
        </div>
        <div className="lg:text-left text-center">
          FoodBird has introduced a special food bank called Food For All,
          ensuring that the poor and helpless can enjoy a wholesome meal free of
          charge.So download our mobile apps and join the campaign now!
        </div>
      </div>
      <div className="lg:flex hidden gap-2">
        <div className="flex items-center gap-2 btn btn-neutral p-6">
          <div>
            <SiAppgallery size={32} />
          </div>
          <div>
            <p className="text-xs text-left">Get it on</p>
            <h1 className="text-left">AppGallery</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 btn btn-neutral p-6">
          <div>
            <IoLogoGooglePlaystore size={32} />
          </div>
          <div>
            <p className="text-xs text-left">Download from</p>
            <h1 className="text-left">Play Store</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 btn btn-neutral p-6">
          <div>
            <IoLogoApple size={32} />
          </div>
          <div>
            <p className="text-xs text-left">Explore now</p>
            <h1 className="text-left">App Store</h1>
          </div>
        </div>
      </div>

      <div className="absolute hidden lg:block md:block  -top-20 right-0">
        <img
          src="https://i.ibb.co/FLcNCnYJ/home-foodpanda-apps-Photoroom.png"
          alt="poster"
        />
      </div>
    </motion.div>
  );
};
export default CampaignPoster;
