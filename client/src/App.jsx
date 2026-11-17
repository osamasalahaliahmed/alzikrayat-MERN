import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Gallery from "./pages/Gallery.jsx";
import LoginRegister from "./pages/LoginRegister.jsx";
import AddPhoto from "./pages/AddPhoto.jsx";
import PhotoDetail from "./pages/PhotoDetail.jsx";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photos" element={<Gallery />} />
          <Route path="/photos/new" element={<AddPhoto user={user} setUser={setUser} />} />
          <Route path="/photos/:id" element={<PhotoDetail user={user} setUser={setUser} />} />
          <Route path="/login" element={<LoginRegister user={user} setUser={setUser} />} />
          <Route path="*" element={<p>Page not found. <Link to="/">Go home</Link></p>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
