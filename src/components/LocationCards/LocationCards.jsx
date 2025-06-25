import React from "react";
import locationsData from "../../utils/locationsData";

const LocationCards = () => {
  return (
    <div className="w-full flex flex-wrap justify-center gap-6">
      {locationsData.map(({ id, location, img, alt }) => (
        <div className="card w-96 h-80 relative" key={id}>
          <figure className="rounded-xl">
            <img className="rounded-xl w-96 h-80 object-cover hover:scale-95 duration-500" src={img} alt={alt} />
          </figure>
          <button className="btn btn-active absolute bottom-3 left-4">
            {location}
          </button>
        </div>
      ))}
    </div>
  );
};

export default LocationCards;
