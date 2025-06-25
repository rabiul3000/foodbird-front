import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { LuBird } from "react-icons/lu";
import { CiMenuFries } from "react-icons/ci";
import NavLinks from "./NavLinks";
import AuthContext from "../../contexts/AuthContext";
import { errorAlert } from "../utils/Alerts";
import LoadingPage from "./../pages/LoadingPage/LoadingPage";

const Navbar = () => {
  const { user, authLoading, logoutUser } = use(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoading(true);
    logoutUser()
      .then(() => {
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        errorAlert(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="text-xl text-primary btn btn-ghost lg:hidden"
          >
            <CiMenuFries />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <NavLinks />
          </ul>
        </div>
        <Link className="btn italic font btn-soft btn-secondary flex gap-0 text-2xl font-bold">
          <LuBird size={30} />
          FoodBird
        </Link>
      </div>

      <div className="navbar-end flex gap-4">
        <div className="navbar-center hidden lg:block">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
        {loading && <LoadingPage />}
        {user ? (
          <div className="dropdown dropdown-end dropdown-hover flex gap-2 bg-amber-50 border rounded-l-full pr-2 border-gray-300 items-center">
            <div className="avatar">
              <div className="rounded-full w-12">
                <img src={user?.photoURL} alt="user_img" loading="lazy" />
              </div>
            </div>
            <div role="button" tabIndex={0}>
              <button className="btn btn-ghost" onClick={handleLogout}>
                Logout
              </button>
              <ul
                tabIndex={0}
                className="text-xs dropdown-content menu bg-base-100 mt-1 rounded-box z-1 shadow-sm py-8"
              >
                <li>
                  <a className="font-semibold"> {user.displayName}</a>
                </li>
                <li>
                  <a className="font-semibold">{user.email}</a>
                </li>
              </ul>
            </div>
          </div>
        ) : authLoading ? (
          <Link className="btn btn-soft btn-outline btn-secondary">
            Loading
            <span className="loading loading-bars text-secondary loading-sm"></span>
          </Link>
        ) : (
          <Link to={"/login"} className="btn btn-soft btn-outline btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
