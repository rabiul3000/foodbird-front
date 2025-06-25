import React, { useContext, useState } from "react";
import { LuBird } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { IoEyeSharp } from "react-icons/io5";
import verifyPassword from "../../utils/verifyPassword";
import { PiEyeSlashFill } from "react-icons/pi";
import { errorAlert, successAlert } from "../../utils/Alerts";
import AuthContext from "../../../contexts/AuthContext";

const Register = () => {
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordType, setPasswordType] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    registerWithEmail,
    updateUserWithNameAndPhoto,
    setUser,
    registerWithGoogle,
  } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    const isVerified = verifyPassword(formData.get("password"));
    setPasswordError(isVerified);
    if (isVerified) {
      setEmailLoading(false);
      return;
    }
    const userInfo = Object.fromEntries(formData.entries());

    registerWithEmail(userInfo)
      .then((userCredential) => {
        updateUserWithNameAndPhoto(userInfo)
          .then(() => {
            setUser(userCredential.user);
            setEmailLoading(false);
            successAlert("Registration Successful");
            navigate("/");
            form.reset();
          })
          .catch((error) => {
            setEmailLoading(false);
            errorAlert(error.message);
          });
      })
      .catch((error) => {
        setEmailLoading(false);
        errorAlert(error.message);
      });
  };

  const handleRegisterWithGoogle = () => {
    setGoogleLoading(true);
    registerWithGoogle()
      .then((result) => {
        console.log(result);
        setUser(result.user);
        setGoogleLoading(false);
        navigate("/");
      })
      .catch((error) => {
        error?.code == "auth/internal-error"
          ? errorAlert("Bad Internet Condition")
          : errorAlert(error.message);
        setGoogleLoading(false);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-[90vh]">
      <div className="hero-content flex-col w-full">
        <div className="text-center lg:text-left">
          <div className="flex flex-col gap-2 justify-center items-center">
            <Link
              to={"/"}
              className="italic text-secondary flex gap-0 text-2xl font-bold"
            >
              <LuBird size={30} />
              FoodBird
            </Link>
            <h1 className="text-4xl font-bold">Register</h1>
            <p className="text-sm text-gray-600">
              Star Your Journey from here.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form className="fieldset" onSubmit={handleSubmit}>
              <label className="label">Name</label>
              <input
                name="name"
                type="text"
                className="input"
                placeholder="Name"
                required
              />

              <label className="label">Photo URL</label>
              <input
                name="photoURL"
                type="text"
                className="input text-xs"
                placeholder="photo URL"
                required
              />

              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
                required
              />
              <label className="label">Password</label>
              <div className="input">
                <input
                  name="password"
                  type={passwordType ? "password" : "text"}
                  placeholder="Password"
                  required
                  onChange={() => setPasswordError("")}
                />
                {passwordType ? (
                  <IoEyeSharp
                    onClick={() => setPasswordType(!passwordType)}
                    className="cursor-pointer text-gray-700 text-2xl"
                  />
                ) : (
                  <PiEyeSlashFill
                    onClick={() => setPasswordType(!passwordType)}
                    className="cursor-pointer text-gray-700 text-2xl"
                  />
                )}
              </div>
              <div>
                <p className="text-red-500">{passwordError}</p>
                <Link className="link link-hover" to={"/login"}>
                  Already Member? Login
                </Link>
              </div>
              <button
                disabled={emailLoading}
                type="submit"
                className="btn btn-secondary mt-4"
              >
                {emailLoading ? (
                  <span className="loading loading-bars loading-sm"></span>
                ) : (
                  "Register With Email"
                )}
              </button>
              <p className="text-lg text-center">or</p>
              <button
                onClick={handleRegisterWithGoogle}
                type="button"
                className="btn bg-white text-black border-[#e5e5e5]"
                disabled={googleLoading}
              >
                {googleLoading ? (
                  <>
                    <FcGoogle />
                    loading...
                    <span className="loading loading-bars loading-sm"></span>
                  </>
                ) : (
                  <>
                    <FcGoogle />
                    Register with Google
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
