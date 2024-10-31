import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import AddPost from "./components/addPost/AddPost";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header isLogged={true} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-post" element={<AddPost />} />
            {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;


