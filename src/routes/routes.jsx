import { createBrowserRouter } from "react-router";
import About from "../pages/About/About";
import Home from "../pages/Home/Home";
import MainLayout from "./../Layouts/MainLayout";
import AvailableFoods from "./../pages/AvailableFoods/AvailableFoods";
import AddFood from "./../pages/AddFood/AddFood";
import ManageMyFoods from "./../pages/ManageMyFoods/ManageMyFoods";
import MyFoodRequest from "./../pages/MyFoodRequest/MyFoodRequest";
import Login from "./../pages/Login/Login";
import Register from "./../pages/Register/Register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ProtectedRoute from "../pages/ProtectedRoute/ProtectedRoute";
import FoodDetail from "../pages/FoodDetail/FoodDetail";
import axiosInstance from "../api/axiosInstance";
import LoadingPage from "../pages/LoadingPage/LoadingPage";
import UpdateFood from "../components/UpdateFood/UpdateFood";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/available_foods",
        element: <AvailableFoods />,
        errorElement: <ErrorPage error={'Check Your Internet Connection or Reload'} />,


      },
      {
        path: "/add_foods",
        element: (
          <ProtectedRoute>
            <AddFood />
          </ProtectedRoute>
        ),
      },
      {
        path: "/manage_my_foods",
        element: (
          <ProtectedRoute>
            <ManageMyFoods />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my_food_request",
        element: (
          <ProtectedRoute>
            <MyFoodRequest />
          </ProtectedRoute>
        ),
      },
      {
        path: "/food_detail/:id",
        loader: ({ params }) => axiosInstance.get(`/food_detail/${params.id}`),
        hydrateFallbackElement: <LoadingPage />,
        element: (
          <ProtectedRoute>
            <FoodDetail />
          </ProtectedRoute>
        ),
      },

      {
        path: "/update__food/:id",
        loader: ({ params }) => axiosInstance.get(`/food_detail/${params.id}`),
        hydrateFallbackElement: <LoadingPage />,
        element: (
          <ProtectedRoute>
            <UpdateFood />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default routes;
