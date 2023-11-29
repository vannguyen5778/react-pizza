import "@/scss/App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import MainLayout from "./layouts/MainLayout";
import React, { Suspense } from "react";
import Loader from "./components/Loader";

const Cart = React.lazy(() => import("@/pages/Cart"));
const FullPizza = React.lazy(() => import("./pages/FullPizza"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />}></Route>
        <Route path="cart" element={<Suspense fallback={<Loader />} ><Cart /></Suspense>}></Route>
        <Route path="pizza/:id" element={<Suspense fallback={<Loader />} ><FullPizza /></Suspense>} > </Route>
        <Route path="*" element={<Suspense fallback={<Loader />} ><NotFound /></Suspense>}></Route>
        </Route>
      </Routes>
   
  );
}

export default App;


// splitting scss files done
// url parameter 
// stripe payment its back end tho
// responsive cart
// authourisation
// home done