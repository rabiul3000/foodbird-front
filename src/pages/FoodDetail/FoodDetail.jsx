import React, { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { format } from "date-fns";
import AuthContext from "../../../contexts/AuthContext";
import useAxios from "../../../hooks/useAxios";
import { errorAlert, successAlert } from "../../utils/Alerts";

const FoodDetail = () => {
  const [loading, setLoading] = useState(false);
  const { data } = useLoaderData();
  const { user } = useContext(AuthContext);
  const { put } = useAxios();
  const navigate = useNavigate();

  const {
    _id,
    name,
    imageURL,
    quantity,
    location,
    expiredDate: exp,
    additionNotes,
    donor,
    foodStatus,
    createdAt,
  } = data;

  const expiredDate = format(new Date(parseInt(exp)), "dd-MMMM-yyyy");

  const handleRequestFood = () => {
    setLoading(true);

    put("/request_food", { foodId: _id, requestedBy: user.email })
      .then((res) => {
        setLoading(false);
        document.getElementById("my_modal_5").close();
        if (res.data.modifiedCount) {
          successAlert("Food requested successfully");
          navigate("/available_foods");
        } else {
          errorAlert("Food already requested");
          navigate("/available_foods");
        }
      })
      .catch((err) => {
        setLoading(false);
        document.getElementById("my_modal_5").close();
        errorAlert(err.message);
      });
  };
  return (
    <div className="flex w-full h-screen justify-center items-center ">
      <div className="card bg-base-100 w-120 shadow-sm border border-gray-300">
        <div className="p-2 flex gap-1 items-center">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <img src={donor.photoURL} alt="donor_photo" />
            </div>
          </div>
          <div className="flex flex-col text-sm font-semibold">
            <div className="capitalize"> {donor.name} </div>
            <div>{format(createdAt, "dd/MMMM/yyyy")}</div>
            <div>{donor.email}</div>
          </div>
        </div>
        <figure>
          <img className="object-cover w-full h-96" src={imageURL} alt="food" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{additionNotes}</p>
          <p className="badge badge-neutral">{quantity} Item Left</p>
          <p className="badge badge-neutral">Pick it up from- {location}</p>
          <p className="badge badge-neutral">
            The Food will be Expired in, {format(expiredDate, "dd-MMMM-yyyy")}
          </p>
          <p className="badge badge-success capitalize">
            Food Status: {foodStatus}
          </p>
          <div className="card-actions justify-end">
            {/* modal */}

            <button
              className="btn btn-secondary"
              onClick={() => {
                document.getElementById("my_modal_5").showModal();
              }}
            >
              Request this food
            </button>

            <dialog
              id="my_modal_5"
              className="modal  modal-bottom sm:modal-middle"
            >
              <div className="modal-box flex flex-col justify-center items-center">
                <div className="modal-action">
                  <form
                    method="dialog"
                    className="fieldset  bg-base-200 border-base-300 rounded-box w-xs border p-4"
                  >
                    <label className="label">Food Name</label>
                    <input
                      type="text"
                      className="input"
                      value={name}
                      readOnly
                    />

                    <label className="label">Food Image</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="my-awesome-page"
                      value={imageURL}
                      readOnly
                    />

                    <label className="label">Food Id</label>
                    <input type="text" className="input" value={_id} readOnly />

                    <label className="label">Food Donator Email</label>
                    <input
                      type="text"
                      className="input"
                      value={donor.email}
                      readOnly
                    />

                    <label className="label">Food Donator name</label>
                    <input
                      type="text"
                      className="input"
                      value={donor.name}
                      readOnly
                    />

                    <label className="label">Requested By</label>
                    <input
                      type="text"
                      className="input"
                      value={user.email}
                      readOnly
                    />

                    <label className="label">Requested Date</label>
                    <input
                      type="text"
                      className="input"
                      value={format(Date.now(), "dd-MMMM-yyyy")}
                      readOnly
                    />

                    <label className="label">Pickup Location</label>
                    <input
                      type="text"
                      className="input"
                      value={location}
                      readOnly
                    />

                    <label className="label">Food Expire Date</label>
                    <input
                      type="text"
                      className="input"
                      value={format(expiredDate, "dd-MMMM-yyyy")}
                      readOnly
                    />

                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">
                        Additional Notes
                      </legend>
                      <textarea
                        placeholder="Write your thought"
                        className="textarea textarea-primary"
                      ></textarea>
                    </fieldset>

                    {/* if there is a button in form, it will close the modal */}
                    <div className="flex w-full justify-between">
                      {loading ? (
                        <div
                          type="submit"
                          onClick={handleRequestFood}
                          className="btn btn-dash disabled"
                        >
                          Loading...
                          <span className="loading loading-bars"></span>
                        </div>
                      ) : (
                        <div
                          type="submit"
                          onClick={handleRequestFood}
                          className="btn btn-dash btn-secondary"
                        >
                          Request
                        </div>
                      )}
                      <button className="btn btn-ghost">Close</button>
                    </div>
                  </form>
                </div>
              </div>
            </dialog>

            {/* modal */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FoodDetail;
