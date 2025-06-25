// import React, { useEffect, useState } from "react";
// import useAxios from "../../../hooks/useAxios";
// import { errorAlert } from "../../utils/Alerts";
// import { Link } from "react-router";
// import { format } from "date-fns";

// const FoodCard = ({ id }) => {
//   const [data, setData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const { get } = useAxios();

//   useEffect(() => {
//     get(`/food_detail/${id}`)
//       .then((res) => {
//         setData(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         errorAlert(err.message);
//         setLoading(false);
//       });
//   }, []);

//   const {
//     _id,
//     name,
//     imageURL,
//     quantity,
//     location,
//     expiredDate,
//     additionNotes,
//     foodStatus,
//     donor,
//   } = data;

//   return (
//       ) : (
//
//       )}
//     </div>
//   );
// };

// export default FoodCard;

import React from "react";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";
import { errorAlert } from "../../utils/Alerts";
import { format } from "date-fns";
import { Link } from "react-router";

const FoodCard = ({ id }) => {
  const { get } = useAxios();

  const fetchData = async () => {
    const res = await get(`/food_detail/${id}`);
    return res.data;
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["food_detail", id],
    queryFn: fetchData,
  });

  if (isLoading) {
    return (
      <div className="flex w-96 flex-col gap-4">
        <div className="skeleton h-96 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  }

  if (isError) {
    return errorAlert("Something went wrong");
  }

  const {
    _id,
    name,
    imageURL,
    quantity,
    location,
    expiredDate,
    additionNotes,
    foodStatus,
    donor,
  } = data;

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="card bg-base-200 transition-all hover:scale-105 duration-400 hover:bg-primary-content w-96 shadow-sm">
        <figure className="w-96 h-80">
          <img
            className="h-full w-full  object-cover"
            src={imageURL}
            alt={name}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title capitalize">
            {name}
            <div className="badge badge-info"> {location} </div>
          </h2>
          <p>{additionNotes || " "}</p>
          <p>
            Expired in{" "}
            <span className="font-semibold">
              {" "}
              {format(new Date(parseInt(expiredDate)), "dd-MMMM-yyyy")}
            </span>
          </p>
          <p>
            Quantity:
            <span className="badge badge-sm badge-ghost"> {quantity} </span>
          </p>
          <p>
            Food Status:{" "}
            <span className="badge badge-sm badge-outline"> {foodStatus} </span>
          </p>
          <p className="text-xs text-gray-400">Added By: {donor.email}</p>
          <div className="card-actions justify-end">
            <Link to={`/food_detail/${_id}`} className="btn btn-outline">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FoodCard;
