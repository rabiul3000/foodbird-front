import React, { useContext, useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import AuthContext from "../../../contexts/AuthContext";
import { errorAlert } from "../../utils/Alerts";
import { GiFireBowl } from "react-icons/gi";
import RequestFoodTable from "../../components/RequestFoodTable/RequestFoodTable";

const MyFoodRequest = () => {
  const { get } = useAxios();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [myFoods, setMyFoods] = useState([]);

  useEffect(() => {
    setLoading(true);
    get(`/my_foods_request/${user.email}`, {
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

  return (
    <div className="flex flex-col p-8 gap-12">
      <div className="flex justify-center items-center font-semibold ">
        <div className="flex pb-3">
          <GiFireBowl className="text-secondary text-3xl" />
          <div>
            <h1 className="text-3xl"> All Food Requests made by Me </h1>
          </div>
        </div>
      </div>
      <div className=" flex flex-wrap justify-center gap-8">
        <div className="overflow-x-auto  border border-gray-200 rounded-lg">
          <table className="table w-full flex justify-center items-center">
            {/* head */}
            <thead>
              <tr>
                <th>Food</th>
                <th>About</th>
                <th>Donor</th>
                <th>Request Date</th>
              </tr>
            </thead>
            {/* row 1 */}
            <tbody>
              {loading ? (
                <span className="text-center loading loading-bars text-secondary"></span>
              ) : (
                myFoods.map((food) => (
                  <RequestFoodTable key={food._id} id={food._id} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyFoodRequest;
