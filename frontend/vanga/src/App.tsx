import { MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorGeneric from "./pages/error/ErrorGeneric";
import Home from "./pages/home/Home";
import ViewTest from "./pages/viewTest/ViewTest";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorGeneric />,
  },

  {
    path: "/search_results",
    element: <ViewTest />,
    errorElement: <ErrorGeneric />,
  },
]);

export default function App() {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
