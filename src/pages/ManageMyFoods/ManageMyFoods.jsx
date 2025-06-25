import React, { useContext, useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import AuthContext from "../../../contexts/AuthContext";
import { confirmAlert, errorAlert, successAlert } from "../../utils/Alerts";
import { GiFireBowl } from "react-icons/gi";
import FoodTable from "../../components/FoodTable/FoodTable";

const ManageMyFoods = () => {
  const { get, del } = useAxios();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [myFoods, setMyFoods] = useState([]);

  useEffect(() => {
    setLoading(true);
    get(`/my_foods/${user.email}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
      params: {
        email: user.email,
      },
    })
      .then(({ data }) => {
        setLoading(false);
        setMyFoods(data);
      })
      .catch((err) => {
        setLoading(false);
        errorAlert(err.message);
      });
  }, []);

  const handleDeleteFood = (id) => {
    confirmAlert().then(({ isConfirmed }) => {
      if (isConfirmed) {
        del(`/delete_food/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              setMyFoods((prev) => {
                return prev.filter((food) => food._id !== id);
              });
              successAlert("Food has been deleted ");
            } else {
              errorAlert("Something went wrong");
            }
          })
          .catch((err) => {
            errorAlert(err.message);
          });
      } else {
        return;
      }
    });
  };

  return (
    <div className="flex flex-col p-8 gap-12">
      <div className="flex justify-center items-center font-semibold ">
        <div className="flex pb-3">
          <GiFireBowl className="text-secondary text-3xl" />
          <div>
            <h1 className="text-3xl"> Food Added By Me</h1>
          </div>
        </div>
      </div>
      <div className=" flex flex-wrap justify-center gap-8">
        <div className="overflow-x-auto w-11/12  border border-gray-200 rounded-lg">
          <table className="table w-full  justify-center items-center">
            {/* head */}
            <thead>
              <tr>
                <th>Food</th>
                <th>About</th>
                <th>Food Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            {/* row 1 */}
            <tbody>
              {loading ? (
                <span className="loading text-secondary loading-ring loading-sm">
                  {" "}
                </span>
              ) : (
                myFoods.map((food) => (
                  <FoodTable
                    key={food._id}
                    id={food._id}
                    handleDeleteFood={handleDeleteFood}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageMyFoods;
