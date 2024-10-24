import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import MyBlogs from "./components/my-blogs/MyBlogs";
import Navbar from "./components/navbar/Navbar";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
