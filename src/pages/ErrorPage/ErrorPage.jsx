import { Link } from "react-router";
import notfoundSvg from "../../assets/notfound.svg";
const ErrorPage = ({ error }) => {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="text-center w-screen h-screen flex justify-center items-center flex-col gap-4">
        <img src={notfoundSvg} className="w-xl" alt="error_img" />
        {error && <p className="text-sm font-bold"> {error} </p>}
        <Link to={'/'} className="btn btn-outline btn-soft btn-secondary">Go Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
