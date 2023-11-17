import "@/scss/App.scss";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import NotFound from "./pages/NotFound";
import { SearchingProvider, useSearching } from "./context/SearchingContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { SORT_MAP } from "./components/Sort";

function App() {
 

  return (
    <SearchingProvider>
      <div className="app">
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          ></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </SearchingProvider>
  );
}

export default App;
