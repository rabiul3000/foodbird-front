import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-60">
      <p>Loading please wait...</p>
      <div>
        <span className="loading text-secondary loading-bars loading-sm"></span>
        <span className="loading text-secondary loading-bars loading-md"></span>
        <span className="loading text-secondary loading-bars loading-lg"></span>
        <span className="loading text-secondary loading-bars loading-md"></span>
        <span className="loading text-secondary loading-bars loading-sm"></span>
      </div>
    </div>
  );
};

export default LoadingPage;
