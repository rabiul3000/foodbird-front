import React from "react";

const ErrorPage = ({ error }) => {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404 | Not Found</h1>
        {error && <p className="text-sm font-bold"> {error} </p>}
      </div>
    </div>
  );
};

export default ErrorPage;
