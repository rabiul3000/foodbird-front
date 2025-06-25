import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { errorAlert, successAlert } from "../../utils/Alerts";
import { format, set } from "date-fns";
import { Link } from "react-router";

const FoodTable = ({ id, handleDeleteFood, handleUpdateFood }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { get } = useAxios();

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
                <div className="text-sm opacity-50"> {location} </div>
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
          </td>

          <td>
            <span className="badge badge-soft"> {foodStatus} </span>
          </td>
          <th>
            <Link
              className="btn btn-warning btn-xs"
              to={`/update__food/${_id}`}
            >
              Update
            </Link>
          </th>
          <th>
            <button
              className="btn btn-error btn-xs"
              onClick={() => handleDeleteFood(_id)}
            >
              Delete
            </button>
          </th>
        </tr>
      )}
    </>
  );
};

export default FoodTable;
