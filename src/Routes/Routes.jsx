import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import MainLayout from "../Layout/MainLayout";
import Checkout from "../Pages/Order/Checkout/Checkout";
import Ordered from "../Pages/Order/Ordered/Ordered";

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/Checkout',
        element: <Checkout />
      },
      {
        path: '/Ordered',
        element: <Ordered />
      }
    ]
  }
]);
