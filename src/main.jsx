import { createRoot } from "react-dom/client";
import "./index.css";
import "./main.css";
import routes from "./routes/routes.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "../Providers/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </AuthProvider>
);
