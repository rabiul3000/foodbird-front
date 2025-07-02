import React from "react";
import { IoFastFoodSharp } from "react-icons/io5";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLeaf,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary-content text-base-content py-8 px-6">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        {/* Brand */}
        <div className="flex justify-center items-center space-x-2">
          <IoFastFoodSharp  className="text-2xl text-secondary" />
          <span className="font-bold text-lg text-secondary">FoodBird</span>
        </div>

        {/* Tagline */}
        <p className="text-sm text-base-content">
          Bringing fresh food to your doorstep with love and care.
        </p>

        {/* Navigation Links */}
        

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-5">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <FaFacebook className="text-xl" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <FaTwitter className="text-xl" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <FaInstagram className="text-xl" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-content2">
          &copy; {new Date().getFullYear()} FoodBird. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
