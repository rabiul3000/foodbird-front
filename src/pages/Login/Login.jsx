import React, { useContext, useState } from "react";
import { LuBird } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { errorAlert, successAlert } from "../../utils/Alerts";
import AuthContext from "../../../contexts/AuthContext";
import useAxios from "../../../hooks/useAxios";
import Lottie from "react-lottie";

import loginAnimation from "../../assets/login_animation.json";

const Login = () => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const { get } = useAxios();

  const location = useLocation();
  const { loginWithEmail, loginWithGoogle, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    const userInfo = Object.fromEntries(formData.entries());

    loginWithEmail(userInfo)
      .then((result) => {
        setUser(result.user);
        setEmailLoading(false);

        const token = result.user.accessToken;
        get(`/token?email=${result.user.email}`, {
          headers: { authorization: `Bearer ${token}` },
        })
          .then((res) => console.log(res))
          .catch((error) => console.log(error));

        successAlert("Login Successful");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        setEmailLoading(false);
        if (error.code === "auth/invalid-credential")
          errorAlert("Email or Password is incorrect");
        else errorAlert(error.message);
      });
    form.reset();
  };

  const handleLoginWithGoogle = () => {
    setGoogleLoading(true);
    loginWithGoogle()
      .then((result) => {
        setUser(result.user);
        setGoogleLoading(false);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        error?.code == "auth/internal-error"
          ? errorAlert("Bad Internet Condition")
          : errorAlert(error.message);
        setGoogleLoading(false);
      });
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loginAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Lottie Background */}
      <div className="absolute inset-0 z-0">
        <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
      </div>

      {/* Login Form (centered) */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
          <div className="text-center mb-4">
            <Link
              to={"/"}
              className="italic text-secondary flex gap-1 justify-center items-center text-2xl font-bold"
            >
              <LuBird size={30} />
              FoodBird
            </Link>
            <h1 className="text-4xl font-bold">Login</h1>
            <p className="text-sm text-gray-600">
              Welcome Back, please login to continue
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input w-full"
              placeholder="Email"
              required
            />
            <label className="label mt-2">Password</label>
            <input
              name="password"
              type="password"
              className="input w-full"
              placeholder="Password"
              required
              minLength="8"
            />
            <div className="mt-2">
              <Link className="link link-hover" to={"/register"}>
                Not yet Member? Register
              </Link>
            </div>

            <button
              type="submit"
              disabled={emailLoading}
              className="btn btn-secondary mt-4 w-full"
            >
              {emailLoading ? (
                <>
                  Please wait...
                  <span className="loading loading-bars loading-sm"></span>
                </>
              ) : (
                "Login With Email"
              )}
            </button>

            <p className="text-lg text-center my-2">or</p>

            <button
              onClick={handleLoginWithGoogle}
              type="button"
              className="btn bg-white text-black border-[#e5e5e5] w-full"
              disabled={googleLoading}
            >
              {googleLoading ? (
                <>
                  <FcGoogle />
                  Loading...
                  <span className="loading loading-bars loading-sm"></span>
                </>
              ) : (
                <>
                  <FcGoogle />
                  Login with Google
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
