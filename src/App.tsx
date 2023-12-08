import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton } from "@mui/material";
import Temp from "./routes";

function App() {
  const { Router } = Temp();
  return (
    <div className="App">
      <Suspense fallback={<Skeleton variant="text" />}>
        <RouterProvider router={Router} />
        <ToastContainer />;
      </Suspense>
    </div>
  );
}

export default App;
