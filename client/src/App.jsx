import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Gallery from "./pages/Gallery.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photos" element={<Gallery />} />
          <Route path="*" element={<p>Page not found. <Link to="/">Go home</Link></p>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
