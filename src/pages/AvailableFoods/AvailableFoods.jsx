import React, { useEffect, useState } from "react";
import FoodCard from "./../../components/Cards/FoodCard";
import { GiFireBowl } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import useAxios from "../../../hooks/useAxios";
import { errorAlert } from "../../utils/Alerts";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../LoadingPage/LoadingPage";

const AvailableFoods = () => {
  const [search, setSearch] = useState("");
  const [click, setClick] = useState(false);
  const [sort, setSort] = useState(false);
  const [data, setData] = useState([]);
  const { get } = useAxios();
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    get(`/available_foods`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        errorAlert(err.message);
        setLoading(false);
      });
  };

  const fetchDataSort = () => {
    setLoading(true);
    get(`/available_foods/sort`)
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
    if (sort) {
      fetchDataSort();
    }
    if (!sort) {
      fetchData();
    }
  }, [sort]);

  if (loading) {
    return <LoadingPage />;
  }

  const filteredData = data.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSortOrder = () => {
    setSort((prev) => !prev);
  };


  return (
    <div className="flex flex-col p-8 gap-12">
      <div className="flex justify-center items-center font-semibold ">
        <div className="flex flex-col  justify-center items-center gap-4">
          <div className="flex">
            <GiFireBowl className="text-secondary text-3xl" />
            <h1 className="text-3xl"> Available foods</h1>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-xs">Sort foods by Expiration Date in: </p>
            <div className="flex gap-2">
              <button
                onClick={toggleSortOrder}
                className="btn btn-primary btn-sm"
                disabled={loading}
              >
                {sort === true ? "Descending" : "Ascending"}
              </button>
            </div>
          </div>
          <div>
            <button
              className="btn btn-soft btn-sm"
              onClick={() => setClick(!click)}
            >
              Change Layout
            </button>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <label className="input">
              <IoIosSearch />
              <input
                required
                type="search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="Search by food name"
              />
            </label>
          </div>
        </div>
      </div>
      <div
        className={`grid pb-24 ${
          click ? "lg:grid-cols-2" : "lg:grid-cols-3"
        } grid-cols-1 gap-8 mx-auto`}
      >
        {filteredData.map((food) => (
          <FoodCard key={food._id} id={food._id} />
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
