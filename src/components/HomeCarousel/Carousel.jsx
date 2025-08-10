import React from "react";
import { motion } from "motion/react";
import { IoMdLogIn } from "react-icons/io";

const Carousel = ({ heading, img }) => {
  return (
    <div
      className="h-[70vh] p-12 w-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="p-12 flex flex-col gap-4 bg-gray-200 border border-gray-200 rounded-lg shadow-lg"
      >
        <div>
          <h1 className="text-2xl font-bold text-secondary">{heading}</h1>
        </div>
        <motion.div
          initial={{ x: 0 }}
          whileInView={{ x: 100 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <button className="btn btn-secondary">
            Login to Start
            <IoMdLogIn size={32} />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Carousel;
