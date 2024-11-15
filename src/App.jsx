import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { AddBlog, Home } from './pages';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import AuthorsPage from "./pages/authors/AuthorsPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header isLogged={true} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/new-blog" element={<AddBlog />} />
            <Route exact path="/authors" element={<AuthorsPage />} />

          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;


