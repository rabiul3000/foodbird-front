import React, { useContext } from "react";
import { FaStar } from "react-icons/fa6";
import { BsDot } from "react-icons/bs";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router";
import AuthContext from "./../../../contexts/AuthContext";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";
import { errorAlert } from "../../utils/Alerts";

const FeaturedFoods = () => {
  const { get } = useAxios();

  const getData = async () => {
    const res = await get("/foods");
    return res.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["foods"],
    queryFn: getData,
  });

  if (isLoading) {
    return <LoadingPage />;
  }
  if (error) {
    errorAlert(error.message);
  }
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {data.map((card, index) => (
        <div key={index} className="card bg-base-100 w-96 shadow-sm">
          <figure>
            <img
              className="h-64 w-full object-cover"
              src={card.imageURL}
              alt="biryani"
              loading="lazy"
            />
          </figure>
          <div className="card-body">
            <div className="card-title flex justify-between">
              <div>
                <h1>{card.name}</h1>
              </div>
              <div className="flex text-xs font-normal justify-center items-start">
                <div className="badge px-5 badge-sm badge-secondary">
                  {card.quantity} Item left
                </div>
              </div>
            </div>
            <div className="flex justify-start items-center text-md text-gray-500">
              <BsDot className="text-xl" />
              {card.additionNotes}

              <Link
                to={`/food_detail/${card._id}`}
                className="btn mx-4 btn-sm btn-soft btn-secondary"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedFoods;
