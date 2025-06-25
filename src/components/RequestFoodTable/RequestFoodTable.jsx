import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { errorAlert, successAlert } from "../../utils/Alerts";
import { format, set } from "date-fns";
import { Link } from "react-router";

const RequestFoodTable = ({ id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { get } = useAxios();

  const {
    name,
    imageURL,
    quantity,
    location,
    expiredDate,
    requestedDate,
    donor,
    createdAt,
  } = data;

  const getData = () => {
    get(`/food_detail/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        errorAlert(err.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <>
      {loading ? (
        <span className="loading loading-bars"></span>
      ) : (
        <tr>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <img src={imageURL} alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div className="font-bold">{name}</div>
                <div className="badge badge-sm badge-neutral">
                  {quantity} item left
                </div>
              </div>
            </div>
          </td>
          <td className="font-semibold text-gray-700 flex flex-col gap-1 justify-start items-start">
            <span>
              <span className="text-gray-500">Created At:</span>{" "}
              {format(createdAt, "PPPP")}
            </span>
            <span>
              <span className="text-gray-500">Expired At:</span>{" "}
              {format(new Date(parseInt(expiredDate)), "PPPP")}
            </span>
            <span>
              <span className="text-gray-500">Pickup Location:</span> {location}
            </span>
          </td>

          <td>
            <div className="flex flex-col gap-2 text-gray-700 font-semibold">
              <p>Name: {donor.name}</p>
              <p>Email: {donor.email}</p>
            </div>
          </td>
          <td>
            <div className="flex flex-col gap-2 text-gray-700 font-semibold">
              <span>
                <span className="text-gray-500"></span>{" "}
                {requestedDate && format(requestedDate, "PPPP")}
              </span>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default RequestFoodTable;
