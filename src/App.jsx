import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { AddBlog, AuthorsPage, Home } from './pages';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import NotFoundPage from "./pages/NotFoundPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header isLogged={true} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-blog" element={<AddBlog />} />
            <Route path="/authors" element={<AuthorsPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;


