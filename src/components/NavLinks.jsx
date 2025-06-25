import React from "react";
import { NavLink } from "react-router";

const NavLinks = () => {
  return (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/available_foods"}>Available Foods</NavLink>
      </li>
      <li>
        <NavLink to={"/add_foods"}> Add Food</NavLink>
      </li>
      <li>
        <NavLink to={"/manage_my_foods"}> Manage My Foods</NavLink>
      </li>
      <li>
        <NavLink to={"/my_food_request"}> My Food Request</NavLink>
      </li>
      <li>
        <NavLink to={"/about"}> About Us</NavLink>
      </li>
    </>
  );
};

export default NavLinks;
