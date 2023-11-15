import "@/scss/App.scss";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
// import Button from './components/Button'
import ArrowUp from "@/assets/img/arrow-top.svg";
import Plus from "@/assets/img/plus.svg";
import Home from '@/pages/Home'
function App() {
  return (
    <div className="app">
      <Header />
      
      <Routes><Route path="/" element={<Home />}></Route></Routes>
    </div>
  );
}

export default App;
