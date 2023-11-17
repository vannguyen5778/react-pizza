import "@/scss/App.scss";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import NotFound from "./pages/NotFound";
import { SearchingProvider, useSearching } from "./context/SearchingContext";
import { useEffect } from "react";

function App() {
  const { setItems, setIsLoading } = useSearching();
  useEffect(() => {
    fetch("https://65559a0b84b36e3a431dfcd7.mockapi.io/items")
      .then((res) => res.json())
      .then((arr) => {
        setTimeout(() => {
          setItems(arr);
          setIsLoading(false);
        }, 1000);
      });
  }, []);

  return (
    <SearchingProvider>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </SearchingProvider>
  );
}

export default App;
