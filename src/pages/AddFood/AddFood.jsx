import React, { useContext, useState } from "react";
import AuthContext from "../../../contexts/AuthContext";
import useAxios from "../../../hooks/useAxios";
import { errorAlert, successAlert } from "../../utils/Alerts";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const { displayName, email, photoURL } = user;
  const { post } = useAxios();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    setLoading(true);
    const form = e.target;
    const foodStatus = form.foodStatus.value;
    const expiredDate = new Date(form.expiredDate.value).getTime();
    const formData = new FormData(form);
    formData.append("expiredDate", `${expiredDate}`);
    if (foodStatus === "requested") {
      formData.append("requestedBy", `${user.email}`);
    }
    const newFood = Object.fromEntries(formData.entries());

    post("/add_food", newFood, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
      params: {
        email: user.email,
      },
    })
      .then((res) => {
        if (res?.data?.insertedId) {
          setLoading(false);
          successAlert("Food added successfully");
          form.reset();
        }
      })
      .catch((err) => {
        setLoading(false);
        errorAlert(err.message);
      });
  };

  return (
    <div className="flex py-4 flex-col justify-center items-center">
      <h1 className="text-center text-3xl py-8">Add a Food</h1>
      <form
        className="grid lg:grid-cols-2 grid-cols-1 gap-4 justify-center items-center"
        onSubmit={handleSubmit}
      >
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Food Name</legend>
          <input required type="text" name="name" className="input" />
        </fieldset>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">ImageURL</legend>
          <input required type="text" name="imageURL" className="input" />
        </fieldset>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Food Quantity</legend>
          <input name="quantity" required type="number" className="input" />
        </fieldset>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Pickup location</legend>
          <input name="location" required type="text" className="input" />
        </fieldset>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Expired Date</legend>
          <input name="expiredDate" required type="date" className="input" />
        </fieldset>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Additional Notes</legend>
          <input name="additionNotes" required type="text" className="input" />
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
            value={`${displayName},${photoURL},${email}`}
          />
        </fieldset>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Food Status</legend>
          <select name="foodStatus" defaultValue="available" className="select">
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
                <span>Adding food...</span>
                <span className="loading loading-spinner loading-md"></span>
              </>
            ) : (
              "Add Food"
            )}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddFood;
