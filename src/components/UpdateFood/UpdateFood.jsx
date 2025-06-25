import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import AuthContext from "../../../contexts/AuthContext";
import useAxios from "../../../hooks/useAxios";
import { errorAlert, successAlert } from "../../utils/Alerts";

const UpdateFood = () => {
  const [loading, setLoading] = useState(false);
  const { put } = useAxios();
  const loader = useLoaderData();
  const data = loader.data;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    const newFood = Object.fromEntries(formData.entries());

    put(`/update_food/${_id}`, newFood)
      .then((res) => {
        if (res.data.modifiedCount) {
          setLoading(false);
          successAlert("Food Updated successfully");
          navigate('/manage_my_foods')
        } else {
          setLoading(false);
          errorAlert("something went wrong! try again");
        }
      })
      .catch((err) => {
        setLoading(false);
        errorAlert(err.message);
      });
  };

  return (
    <div className="flex py-4 flex-col justify-center items-center">
      <h1 className="text-center flex flex-col text-3xl py-8 gap-1">
        <span>Update Food</span>
        <span className="text-sm font-semibold text-gray-500">
          {" "}
          Food Id: {_id}
        </span>
      </h1>
      <form
        className="grid grid-cols-2 gap-4 justify-center items-center"
        onSubmit={handleSubmit}
      >
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Food Name</legend>
          <input
            required
            defaultValue={name}
            type="text"
            name="name"
            className="input"
          />
        </fieldset>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">ImageURL</legend>
          <input
            required
            defaultValue={imageURL}
            type="text"
            name="imageURL"
            className="input"
          />
        </fieldset>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Food Quantity</legend>
          <input
            name="quantity"
            required
            defaultValue={quantity}
            type="number"
            className="input"
          />
        </fieldset>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Pickup location</legend>
          <input
            name="location"
            required
            defaultValue={location}
            type="text"
            className="input"
          />
        </fieldset>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Expired Date</legend>
          <input
            name="expiredDate"
            required
            defaultValue={expiredDate}
            type="date"
            className="input"
          />
        </fieldset>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Additional Notes</legend>
          <input
            name="additionNotes"
            required
            defaultValue={additionNotes}
            type="text"
            className="input"
          />
        </fieldset>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">
            Donor Name, ImageURL & email
          </legend>
          <input
            name="donor"
            type="text"
            className="input text-gray-400"
            readOnly
            value={`${donor.name},${donor.phtotoURL},${donor.email}`}
          />
        </fieldset>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Food Status</legend>
          <select
            name="foodStatus"
            defaultValue={foodStatus}
            className="select"
          >
            <option value={"available"}>Available</option>
            <option value={"requested"}>Requested</option>
          </select>
        </fieldset>

        <fieldset className="fieldset col-span-full">
          <button
            className="btn btn-secondary"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span>Updating food...</span>
                <span className="loading loading-spinner loading-md"></span>
              </>
            ) : (
              "Update Food"
            )}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default UpdateFood;
