import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { AddBlog, Home } from './pages';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header isLogged={true} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-post" element={<AddBlog />} />
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


