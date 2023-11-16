import "@/scss/App.scss";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </div>
  );
}

export default App;
